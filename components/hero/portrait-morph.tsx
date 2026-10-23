"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Texture } from "ogl";

export type PortraitMorphProps = {
  srcA: string;
  srcB: string;
  alt: string;
  className?: string;
};

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uProgress;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageSizeA;
uniform vec2 uImageSizeB;
uniform vec2 uOrigin;
uniform vec2 uDirection;

varying vec2 vUv;

// Crop each image independently to fill the container without distortion.
vec2 coverUv(vec2 uv, vec2 imageSize) {
  float containerAspect = uResolution.x / uResolution.y;
  float imageAspect = imageSize.x / imageSize.y;

  vec2 ratio = vec2(
    min(containerAspect / imageAspect, 1.0),
    min(imageAspect / containerAspect, 1.0)
  );

  return uv * ratio + (1.0 - ratio) * 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;

  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }

  return v;
}

void main() {
  vec2 uv = vUv;

  float p = uProgress;
  float bell = 4.0 * p * (1.0 - p);

  vec2 dir = normalize(uDirection + vec2(0.0001));
  float along = dot(uv - uOrigin, dir);
  float distGradient = (along + 1.4) / 2.8;

  float warpLow = fbm(uv * 1.8 + uTime * 0.05) - 0.5;
  float warpHi = fbm(uv * 5.5 - uTime * 0.04 + 13.0) - 0.5;
  float warp = warpLow * 0.55 + warpHi * 0.18;

  float field = distGradient + warp;

  float remapped = mix(-0.25, 1.25, p);
  float edgeWidth = 0.07;

  float mask = smoothstep(
    remapped - edgeWidth,
    remapped + edgeWidth,
    field
  );

  mask = 1.0 - mask;

  vec2 perp = vec2(-dir.y, dir.x);

  float ripplePhase = (field - remapped) * 14.0;
  float ripple = sin(ripplePhase) * 0.5 + 0.5;

  float edgeBand = 1.0 - smoothstep(
    0.0,
    edgeWidth * 1.6,
    abs(field - remapped)
  );

  float pushAmount = ripple * edgeBand * 0.025 * bell;
  vec2 pushUv = uv + perp * pushAmount;

  vec2 baseUvA = coverUv(pushUv, uImageSizeA);
  vec2 baseUvB = coverUv(pushUv, uImageSizeB);

  vec4 texA = texture2D(uTexA, baseUvA);
  vec4 texB = texture2D(uTexB, baseUvB);

  vec4 color = mix(texA, texB, mask);

  float darken = edgeBand * 0.35 * bell;
  color.rgb *= 1.0 - darken;

  gl_FragColor = color;
}
`;

export function PortraitMorph({
  srcA,
  srcB,
  alt,
  className,
}: PortraitMorphProps): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const hoverRef = useRef(false);
  const progressRef = useRef(0);

  const originRef = useRef<[number, number]>([0.5, 0.5]);
  const directionRef = useRef<[number, number]>([1, 0]);

  const lastPointerRef = useRef<{
    x: number;
    y: number;
    t: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let running = true;
    let raf = 0;

    setReady(false);

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;

    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    container.appendChild(canvas);

    const scene = new Transform();

    const texA = new Texture(gl, {
      generateMipmaps: false,
    });

    const texB = new Texture(gl, {
      generateMipmaps: false,
    });

    const imageSizeA: [number, number] = [1, 1];
    const imageSizeB: [number, number] = [1, 1];

    const loadImage = (
      src: string,
      target: Texture,
      size: [number, number]
    ): Promise<void> =>
      new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          if (!running) {
            resolve();
            return;
          }

          target.image = img;

          size[0] = img.naturalWidth;
          size[1] = img.naturalHeight;

          resolve();
        };

        img.onerror = () => {
          reject(new Error(`Failed to load portrait image: ${src}`));
        };

        img.src = src;
      });

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTexA: { value: texA },
        uTexB: { value: texB },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: [1, 1] as [number, number] },
        uImageSizeA: { value: imageSizeA },
        uImageSizeB: { value: imageSizeB },
        uOrigin: { value: [0.5, 0.5] as [number, number] },
        uDirection: { value: [1, 0] as [number, number] },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      if (w === 0 || h === 0) return;

      renderer.setSize(w, h);

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      program.uniforms.uResolution.value = [
        w * renderer.dpr,
        h * renderer.dpr,
      ];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    resize();

    let last = performance.now();
    let time = 0;

    const tick = () => {
      if (!running) return;

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);

      last = now;
      time += dt;

      const target = hoverRef.current ? 1 : 0;
      const stiffness = hoverRef.current ? 2.4 : 2.0;

      const k = 1 - Math.exp(-stiffness * dt);

      progressRef.current +=
        (target - progressRef.current) * k;

      program.uniforms.uTime.value = time;
      program.uniforms.uProgress.value = progressRef.current;
      program.uniforms.uOrigin.value = originRef.current;
      program.uniforms.uDirection.value = directionRef.current;

      program.uniforms.uImageSizeA.value = imageSizeA;
      program.uniforms.uImageSizeB.value = imageSizeB;

      renderer.render({ scene });

      raf = requestAnimationFrame(tick);
    };

    Promise.all([
      loadImage(srcA, texA, imageSizeA),
      loadImage(srcB, texB, imageSizeB),
    ])
      .then(() => {
        if (!running) return;

        resize();

        setReady(true);

        last = performance.now();
        tick();
      })
      .catch((error: unknown) => {
        if (!running) return;

        console.error("PortraitMorph image loading error:", error);
        setReady(false);
      });

    const computeEdgeDirection = (
      x: number,
      y: number
    ): [number, number] => {
      const dxLeft = x;
      const dxRight = 1 - x;
      const dyBottom = y;
      const dyTop = 1 - y;

      const minDist = Math.min(
        dxLeft,
        dxRight,
        dyBottom,
        dyTop
      );

      if (minDist === dxLeft) return [1, 0];
      if (minDist === dxRight) return [-1, 0];
      if (minDist === dyBottom) return [0, 1];

      return [0, -1];
    };

    const getPointerPosition = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return { x: 0.5, y: 0.5 };
      }

      return {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };

    const onPointerEnter = (e: PointerEvent) => {
      const { x, y } = getPointerPosition(e);

      originRef.current = [x, y];
      directionRef.current = computeEdgeDirection(x, y);

      lastPointerRef.current = {
        x,
        y,
        t: performance.now(),
      };

      hoverRef.current = true;
    };

    const onPointerLeave = (e: PointerEvent) => {
      const { x, y } = getPointerPosition(e);

      originRef.current = [x, y];

      directionRef.current = computeEdgeDirection(x, y).map(
        (v) => -v
      ) as [number, number];

      hoverRef.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = getPointerPosition(e);
      const previous = lastPointerRef.current;

      if (
        previous &&
        performance.now() - previous.t < 80 &&
        progressRef.current < 0.15
      ) {
        const vx = x - previous.x;
        const vy = y - previous.y;
        const magnitude = Math.hypot(vx, vy);

        if (magnitude > 0.01) {
          directionRef.current = [
            vx / magnitude,
            vy / magnitude,
          ];
        }
      }

      lastPointerRef.current = {
        x,
        y,
        t: performance.now(),
      };
    };

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);

    return () => {
      running = false;

      cancelAnimationFrame(raf);
      resizeObserver.disconnect();

      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }

      const extension = gl.getExtension("WEBGL_lose_context");
      extension?.loseContext();
    };
  }, [srcA, srcB]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`relative h-full w-full overflow-hidden ${className ?? ""}`}
    >
      {!ready && (
        <img
          src={srcA}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      )}
    </div>
  );
}