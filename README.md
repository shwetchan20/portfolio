# Shwet Kshirsagar — Personal Portfolio

<img width="1892" height="907" alt="Screenshot 2026-10-24 031424" src="https://github.com/user-attachments/assets/b90f1183-80d5-4f85-8004-129e0233bc93" />


A personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. It showcases my background, skills, projects, and contact information through a responsive interface with interactive components and motion effects.

**Repository:** [shwetchan20/portfolio](https://github.com/shwetchan20/portfolio)

**Live Demo:** Add your deployed Vercel URL after confirming deployment.

---

## 1. Project Objective

The objective of this project is to develop and deploy a personal portfolio website while applying DevOps practices, including version control, automated validation, production builds, and deployment preparation.

The project demonstrates:

* Development of a responsive, multi-page website.
* Source-code management using Git and GitHub.
* Automated project validation using Ansible.
* Production-build verification using Next.js.
* Deployment preparation for Vercel.

## 2. Technology Stack

| Technology     | Purpose                                                      |
| -------------- | ------------------------------------------------------------ |
| Next.js 16     | React framework and application routing                      |
| React 19       | Component-based user interface                               |
| TypeScript     | Type safety                                                  |
| Tailwind CSS 4 | Styling and responsive layouts                               |
| Motion         | Interface animations                                         |
| OGL / WebGL    | Animated shader effects                                      |
| Lenis          | Smooth scrolling                                             |
| Matter.js      | Physics-based interactive elements                           |
| Git and GitHub | Version control and source-code hosting                      |
| Ansible        | Automated environment checks and production-build validation |
| Vercel         | Website hosting and deployment                               |

## 3. Website Features

* Home page with an animated hero section.
* About page featuring education, experience, skills, and technology stack.
* Projects page presenting selected projects.
* Responsive navigation and theme support.
* Interactive portrait and animated interface components.
* WebGL shader effects and smooth scrolling.
* Contact and social links.
* SEO metadata, sitemap, and robots configuration.
* Accessibility features, including keyboard navigation support and reduced-motion considerations.

## 4. Project Structure

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
├── ansible/
├── package.json
├── package-lock.json
└── README.md
```

## 5. Installation and Execution

### Prerequisites

* Node.js
* npm
* Git

### Clone the repository

```bash
git clone https://github.com/shwetchan20/portfolio.git
cd portfolio
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
```

### Other available commands

| Command                | Purpose                      |
| ---------------------- | ---------------------------- |
| `npm run lint`         | Check code with ESLint       |
| `npm run typecheck`    | Run TypeScript type checking |
| `npm run start`        | Start the production server  |
| `npm run format:check` | Check formatting             |

## 6. Git and GitHub Workflow

Git and GitHub are used to track changes, maintain project history, and host the source code.

The workflow followed is:

1. Create and modify website components and pages.
2. Review changes locally.
3. Stage the intended files.
4. Commit changes with descriptive messages.
5. Push commits to the GitHub repository.
6. Validate the production build.
7. Deploy the application through Vercel.

Example commands:

```bash
git status
git add <files>
git commit -m "Describe the change"
git push origin main
```

Each commit should represent a meaningful change. The repository's actual Git history provides evidence of the development process.

## 7. DevOps Integration Using Ansible

### Objective

Ansible automates checks for the local development environment and validates the portfolio by running its production build.

### Files

* `ansible/inventory.ini` — Defines localhost as the managed host.
* `ansible/validate-portfolio.yml` — Contains the validation tasks.

### Workflow

The playbook performs these operations:

1. Checks whether Node.js is installed.
2. Checks whether npm is installed.
3. Displays the detected tool versions.
4. Verifies that `package.json` exists.
5. Verifies that `package-lock.json` exists.
6. Executes `npm run build` from the project directory.
7. Displays the build output.
8. Reports success when all tasks complete.

### Run the playbook

From the repository root:

```bash
ansible-playbook -i ansible/inventory.ini ansible/validate-portfolio.yml
```

### Validate playbook syntax

```bash
ansible-playbook -i ansible/inventory.ini ansible/validate-portfolio.yml --syntax-check
```

### Verified result

The playbook completed successfully with:

* **Successful tasks:** 10
* **Failed tasks:** 0
* **Unreachable hosts:** 0
* **Production build:** Successful

The production build compiled the application, completed TypeScript checks, generated static pages, and finalized route optimization.

**Integration scope:** Ansible automates local validation and build verification. Vercel handles hosting and deployment; the playbook does not itself deploy the website.

## 8. Website Deployment

The project is intended to be hosted on Vercel.

Deployment workflow:

1. Import the GitHub repository into Vercel.
2. Confirm that the framework is detected as Next.js.
3. Keep the default build settings unless changes are required.
4. Deploy the project.
5. Open the generated deployment URL.
6. Verify the Home, About, and Projects pages.

**Live URL:** Replace this line with the verified Vercel deployment URL.

When the repository is connected to Vercel, pushing new commits to the configured production branch can trigger a new deployment.

## 9. Development Changes

Record the meaningful changes made during development below. Keep this section consistent with the actual commits in GitHub.

| No. | Change                                  | Evidence                     |
| --- | --------------------------------------- | ---------------------------- |
| 1   | Initial portfolio project setup         | Git commit history           |
| 2   | Initial application structure and pages | Git commit history           |
| 3   | Hero section improvements               | Git commit history           |
| 4   | Additional website improvements         | Add the corresponding commit |
| 5   | Ansible validation integration          | Add the corresponding commit |

The table must be updated to reflect the actual changes and commit history before submission. Do not count documentation-only commits as website feature changes.

## 10. Screenshots and Evidence

Add genuine screenshots to `docs/screenshots/` and use the following section to document them.

| Screenshot              | Evidence to capture                          |
| ----------------------- | -------------------------------------------- |
| `home-page.png`         | Portfolio home page running in the browser   |
| `about-page.png`        | About page                                   |
| `projects-page.png`     | Projects page                                |
| `github-history.png`    | GitHub repository and commit history         |
| `ansible-success.png`   | Successful Ansible playbook execution        |
| `vercel-deployment.png` | Successful Vercel deployment and project URL |

After adding the screenshots, embed them here:

### Home Page

![Portfolio home page]("E:\porfolio\public\picture\ar.jpg")

### About Page

![Portfolio about page](E:\porfolio\public\picture\image1.jpg)

### Projects Page

![Portfolio projects page](docs/screenshots/projects-page.png)

### GitHub Commit History

![GitHub commit history](docs/screenshots/github-history.png)

### Ansible Validation

![Successful Ansible validation](docs/screenshots/ansible-success.png)

### Vercel Deployment

![Successful Vercel deployment](docs/screenshots/vercel-deployment.png)

*These image paths must point to actual screenshot files committed to the repository.*

## 11. Conclusion

This project combines personal website development with practical DevOps workflows. Git and GitHub provide source-code management and traceable history, Ansible automates environment checks and production-build validation, and Vercel provides the hosting and deployment platform.

The result demonstrates the integration of application development, version control, automated validation, and deployment practices in a single project.

---

**Author:** Shwet Kshirsagar
**Repository:** https://github.com/shwetchan20/portfolio
