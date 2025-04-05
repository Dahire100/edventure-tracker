
# 🕹️  Edventure Tracker

**Gamify Edventure Tracker** is a dynamic, gamified educational tracking platform built to engage learners, motivate consistent progress, and celebrate achievements. It leverages modern tech to create a vibrant, interactive experience for students and educators alike.

---

## 🌟 Overview

Gamify your learning journey! With **Gamify Edventure Tracker**, students can track educational activities, earn rewards, climb leaderboards, and enjoy a visually engaging and rewarding platform that enhances learning consistency and motivation.

---

## 🔧 Tech Stack

- **Frontend**: React + TypeScript  
- **Styling**: Tailwind CSS + PostCSS  
- **Build Tool**: Vite  
- **Package Manager**: `bun` or `npm`  
- **Linting & Config**: ESLint, tsconfig, Tailwind config

---

## 🚀 Features

- 🏆 Track learning activities & achievements  
- 📊 Visualize stats and progress through dashboards  
- 🏅 Earn rewards for completed tasks  
- 📈 Leaderboards to spark friendly competition  
- 🎨 Beautiful UI with responsive design  
- ⚡ Built with performance in mind using Vite + Tailwind

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js (v16+)  
- Bun (optional)  
- npm/yarn if not using Bun

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gamify-edventure-tracker.git
cd gamify-edventure-tracker

# Install dependencies with Bun (recommended)
bun install

# OR use npm
npm install
```

### 🧪 Development

```bash
# Start development server
bun dev

# OR with npm
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## 🌐 Deployment

To deploy the app on platforms like Netlify or Vercel:

```bash
# Build the project
bun build
# OR
npm run build
```

Then deploy the `dist/` folder.

---

## 📁 Project Structure

```
gamify-edventure-tracker/
├── public/                         # Static assets
├── src/                            # Source code
│   ├── components/                 # UI & page components
│   │   ├── auth/                   # Login form
│   │   ├── dashboard/              # Activity, leaderboard, stats
│   │   └── ui/                     # UI primitives (accordion, dialogs)
│   ├── App.tsx                     # Root component
│   ├── App.css                     # Global styles
│   └── main.tsx                    # Entry point
├── tailwind.config.ts              # Tailwind CSS config
├── vite.config.ts                  # Vite config
├── tsconfig.json                   # TypeScript config
└── package.json                    # Project metadata
```

---

## 🧑‍💻 Contributing

We love contributions! Here's how you can help:

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "Add your feature"

# Push and create a pull request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more information.

