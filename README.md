# 🐉 DungeonForge Online

A modern, AI-powered D&D web application with real-time multiplayer capabilities.

## 🎯 Project Overview

DungeonForge Online is a comprehensive Dungeons & Dragons web application that brings the tabletop experience to the digital realm. Built with React, TypeScript, and modern web technologies, it features AI-assisted game management and seamless multiplayer functionality.

## 🚀 Current Features

### ✅ Implemented
- **Modern React App**: TypeScript-based React application with component architecture
- **Navigation System**: Multi-page navigation between game sections
- **Component Stubs**: Functional placeholders for all major features
- **Responsive Design**: Mobile-friendly dark fantasy theme
- **Development Environment**: Hot-reload development server
- **AI Code Generation**: Integration with AI development tools

### 🎯 Core Components (Stub Implementation)
- **Welcome Page**: Landing page with game introduction
- **Character Creation**: D&D character builder interface
- **Dice Roller**: Virtual dice rolling system
- **Navigation**: Seamless page routing
- **Loading & Error Handling**: User experience components

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, CSS Modules
- **Build Tool**: Create React App
- **Styling**: CSS Modules with D&D dark fantasy theme
- **Navigation**: React Router DOM
- **Development**: Hot reload, TypeScript checking
- **AI Integration**: DeepSeek API for code generation

## 🎮 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KumquatPye2/dungeonforge-game.git
   cd dungeonforge-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
dungeonforge-game/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # React components
│   │   ├── Welcome/         # Welcome page component
│   │   ├── CharacterCreation/ # Character creation (stub)
│   │   ├── DiceRoller/      # Dice rolling system (stub)
│   │   ├── Navigation/      # App navigation
│   │   ├── LoadingSpinner/  # Loading states
│   │   └── ErrorDisplay/    # Error handling
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles and themes
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design Philosophy

- **Dark Fantasy Theme**: Immersive D&D atmosphere with rich purples and mystical colors
- **Component-Based Architecture**: Modular, reusable React components
- **TypeScript First**: Type-safe development for better maintainability
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **AI-Powered Development**: Components enhanced by AI code generation

## 🔄 Development Workflow

This project uses an AI-powered development approach:
1. **Sprint Planning**: Features broken into manageable sprints
2. **AI Code Generation**: Components generated and enhanced by AI
3. **Incremental Development**: Always maintain a runnable application
4. **GitHub Integration**: Automatic commits and version control

## 🎯 Roadmap

### Sprint 1: Enhanced Character Creation
- Full character creation form
- Race, class, and background selection
- Ability score allocation
- Character sheet display

### Sprint 2: Advanced Dice System
- Multiple dice types (d4, d6, d8, d10, d12, d20)
- Dice combinations and modifiers
- Roll history and statistics
- Animation and sound effects

### Sprint 3: Campaign Management
- Create and join campaigns
- Character management within campaigns
- Basic game state tracking

### Sprint 4: Real-time Multiplayer
- WebSocket integration
- Live session sharing
- Real-time dice rolling
- Player communication

### Sprint 5: AI Game Master
- AI-assisted storytelling
- Dynamic encounter generation
- Rule assistance and automation

## 🤝 Contributing

This project is developed using AI-assisted coding workflows. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎲 About D&D

Dungeons & Dragons is a collaborative storytelling game where players create characters and embark on adventures guided by a Dungeon Master. This digital implementation aims to enhance the tabletop experience while preserving the social and creative aspects that make D&D special.

---

**Built with ❤️ for the D&D community**
