# Shwet Kshirsagar — Personal Portfolio

<p align="center">
  <img src="https://github.com/user-attachments/assets/d52a2e30-0571-45a9-a630-4f6c9994b1a2" alt="Portfolio homepage" width="100%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b90f1183-80d5-4f85-8004-129e0233bc93" alt="Portfolio screenshot 2" width="49%" />
  <img src="https://github.com/user-attachments/assets/40a25637-c002-4747-96ba-171e4406cefd" alt="Portfolio screenshot 3" width="49%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d65aa1b5-cf64-4de3-999f-4d05019d5f45" alt="Portfolio screenshot 4" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/shwetchan20/portfolio"><strong>GitHub Repository</strong></a>
  &nbsp; • &nbsp;
  <a href="https://portfolio-delta-ten-rbvz3zzgdu.vercel.app/"><strong>Live Website</strong></a>
</p>

---

## About the Project

This is my personal portfolio website, built to showcase my background, technical skills, projects, and experience through a responsive interface with interactive components, animations, and visual effects.

The project also demonstrates practical DevOps concepts, including Git-based version control, automated validation with Ansible, production-build verification, and deployment preparation.

### Objectives

* Build a responsive, multi-page personal portfolio.
* Present projects, skills, education, and experience.
* Use Git and GitHub to manage source code and development history.
* Automate project validation and production builds with Ansible.
* Prepare and deploy the application using Vercel.

## DevOps Integration — Ansible

Ansible is used to automate validation of the portfolio project and verify that it can be built for production.

### What the playbook does

The playbook, `ansible/validate-portfolio.yml`, performs the following tasks:

1. Checks Node.js and npm availability.
2. Displays the installed versions.
3. Verifies that `package.json` exists.
4. Verifies that `package-lock.json` exists.
5. Executes the Next.js production build.
6. Displays the build output.
7. Reports success when validation completes.

### Project files

```text
ansible/
├── inventory.ini
└── validate-portfolio.yml
```

* **`inventory.ini`** — Configures localhost as the Ansible target.
* **`validate-portfolio.yml`** — Defines the validation and build tasks.

### Run Ansible validation

Install Ansible in a supported Linux environment, such as Ubuntu on WSL, then navigate to the project root and execute:

```bash
ansible-playbook -i ansible/inventory.ini ansible/validate-portfolio.yml
```

To check the playbook syntax without running the tasks:

```bash
ansible-playbook -i ansible/inventory.ini ansible/validate-portfolio.yml --syntax-check
```

### Validation result

The playbook completed successfully, with the following results:

| Check                    | Result |
| ------------------------ | ------ |
| Node.js and npm checks   | Passed |
| Project file validation  | Passed |
| Next.js production build | Passed |
| Successful tasks         | 10     |
| Failed tasks             | 0      |
| Unreachable hosts        | 0      |

The production build compiled the application, completed TypeScript checks, generated static pages, and finalized route optimization.

**Deployment responsibility:** Ansible automates local validation and build verification. Vercel handles hosting and deployment; the current Ansible playbook does not directly deploy the website.

### Ansible execution evidence

Add a genuine screenshot of the successful terminal output here:

![Ansible playbook execution](docs/screenshots/ansible-success.png)

## Getting Started

### Prerequisites

* Node.js
* npm
* Git
* Ansible (only required to run the DevOps validation playbook)

### 1. Clone the repository

```bash
git clone https://github.com/shwetchan20/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Build for production

```bash
npm run build
```

### 5. Run the production server

After successfully building the application:

```bash
npm run start
```

## Technology Stack

| Technology     | Purpose                                     |
| -------------- | ------------------------------------------- |
| Next.js 16     | Application framework and routing           |
| React 19       | Component-based UI                          |
| TypeScript     | Type safety                                 |
| Tailwind CSS 4 | Styling and responsive layouts              |
| Motion         | Animations and transitions                  |
| OGL / WebGL    | Shader effects                              |
| Lenis          | Smooth scrolling                            |
| Matter.js      | Physics-based interactions                  |
| Git and GitHub | Version control and source-code hosting     |
| Ansible        | Automated validation and build verification |
| Vercel         | Hosting and deployment                      |

## Features

* Animated homepage and hero section.
* About page featuring education, experience, skills, and technology stack.
* Projects page showcasing selected work.
* Responsive navigation and theme support.
* Interactive visual elements and animation effects.
* Smooth scrolling and WebGL shader effects.
* Contact and social links.
* SEO metadata, sitemap, and robots configuration.

## Project Structure

```text
portfolio/
├── ansible/
│   ├── inventory.ini
│   └── validate-portfolio.yml
├── app/
│   ├── about/
│   ├── projects/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── layout/
│   ├── projects/
│   ├── shaders/
│   └── ui/
├── lib/
├── public/
├── package.json
├── package-lock.json
└── README.md
```

## Git and GitHub Workflow

Git and GitHub are used to track development changes and maintain the source-code history.

The workflow is:

1. Modify the website or its components.
2. Review changes using `git status` and `git diff`.
3. Stage the intended files.
4. Commit changes with meaningful messages.
5. Push commits to GitHub.
6. Validate the production build.
7. Deploy through Vercel.

Example:

```bash
git status
git add <files>
git commit -m "Describe the change"
git push origin main
```

## Deployment

The portfolio can be deployed through Vercel by importing the GitHub repository.

1. Import `shwetchan20/portfolio` into Vercel.
2. Confirm that Next.js is detected as the framework.
3. Keep the default build settings unless changes are necessary.
4. Deploy the project.
5. Verify the homepage, About page, and Projects page.

**Live URL:** Replace `YOUR_VERCEL_URL` near the top of this README with your actual deployment URL. Remove this placeholder only after confirming the site is deployed.

## Project Changes and Assignment Evidence

Use this section to document actual, meaningful changes and corresponding Git commits. Update the table based on your real commit history.

| No. | Change                          | Evidence             |
| --- | ------------------------------- | -------------------- |
| 1   | Initial portfolio setup         | Git history          |
| 2   | Application structure and pages | Git history          |
| 3   | Hero section improvements       | Git history          |
| 4   | Additional website improvements | Corresponding commit |
| 5   | Ansible validation integration  | Corresponding commit |




---

**Author:** Shwet Kshirsagar
**Repository:** [shwetchan20/portfolio](https://github.com/shwetchan20/portfolio)
