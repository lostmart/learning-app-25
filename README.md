# React + TypeScript + Vite

This project is a **headless WordPress + React (Next.js)** setup.

- **Front-end** → React/Next.js app (in `/front/`)
- **Back-end** → Custom WordPress plugin exposing REST API (in `/back-wp/`)

WordPress itself is **not versioned** here. Only the plugin code is.

## 🚀 Getting Started

### 1. Front-end (React/Next.js)

```bash
cd front
npm install
npm run dev
```

This starts the app at http://localhost:3000

### 2. Back-end (WordPress plugin)

- Install XAMPP or any local PHP/WordPress setup.
- Install WordPress under htdocs/ (or your preferred location).
- Copy or symlink the plugin:

```bash
mklink "C:\xampp\htdocs\learning-rest-api\wp-content\mu-plugins\my-api-plugin.php" "C:\Users\<YourName>\Projects\my-fullstack-app\back-wp\my-api-plugin.php"
```

- Start Apache + MySQL in XAMPP
- Visit your WordPress site at http://localhost/learning-rest-api

## 🛠️ Development Notes

- Don’t commit WordPress core files (wp-admin, wp-includes, etc.)
- All backend code must live in /back-wp/.
- Use Git branches for features (e.g. feature/new-endpoint)
