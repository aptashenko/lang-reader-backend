# 🌍 Lang Reader Backend

> Backend service for learning foreign languages through reading and vocabulary tracking.

> 🚧 This project is currently under active development. Features and APIs may change frequently.

Lang Reader is a platform that helps users learn languages by reading adapted texts. Users can save new words, track progress, practice with flashcards, and get feedback from AI.

---

## 🚀 Tech Stack

- **NestJS** – Modular framework for scalable server-side applications
- **Supabase** – Database and authentication
- **TypeScript** – Strongly typed JavaScript
- **PostgreSQL** – Reliable relational database

---

## 🧠 Features

- 🔐 User authentication via Supabase Auth
- 📚 Manage reading texts (CRUD)
- 💬 AI integration for comprehension checks
- 💾 REST API for frontend (Vue.js)

---

## 🛠️ Getting Started

### 1. Clone the repository:

```bash```
``git clone https://github.com/aptashenko/lang-reader-backend.git
cd lang-reader-backend``

### 2. Install dependencies

``npm install``

### 3. Create a .env file

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

### 4. Run the server
``npm run start:dev``

### 📁 Project Structure
```
src/
├── auth/              # Supabase token validation, route guards
├── texts/             # Endpoints for managing reading texts
├── words/             # Endpoints for managing user vocabulary
├── stats/             # User statistics and reading progress
├── ai/                # AI integration and validation
├── common/            # Shared helpers and decorators
└── main.ts            # Application entry point
```
