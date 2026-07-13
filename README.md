<div align="center">

# 🚀 ElevateCV AI

### **AI-Powered Career Analysis & Interview Preparation Platform**

_Analyze your resume, compare it with job descriptions, generate personalized interview strategy, receive AI-powered feedback, and prepare confidently for your dream job._

---

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?style=for-the-badge&logo=mongodb)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-blueviolet?style=for-the-badge&logo=google)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

⭐ **Turn your resume into an AI-powered interview strategy.**

</div>

---

# 🌟 Overview

**ElevateCV AI** is a modern AI-powered career assistant that helps job seekers evaluate their resumes, compare them against job descriptions, identify skill gaps, and prepare for interviews with personalized AI-generated questions and feedback.

Rather than practicing random interview questions, ElevateCV AI analyzes your unique profile and provides actionable insights to improve your chances of landing your next role.

Whether you're a student, fresher, or experienced developer, ElevateCV AI helps you prepare with confidence.

---

# ✨ Key Features

| Feature                     | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| 🔐 Secure Authentication    | JWT-based authentication with protected routes                 |
| 📄 Resume Analysis          | AI evaluates your resume and identifies strengths & weaknesses |
| 💼 Job Description Matching | Compares your resume with a target job description             |
| 📊 ATS Match Score          | Calculates how well your resume aligns with the job            |
| 🤖 AI Interview Generator   | Generates technical & HR interview questions                   |
| 💡 Suggested Answers        | AI provides guidance for answering interview questions         |
| 🎯 Skill Gap Detection      | Identifies missing skills required for the role                |
| 📈 Career Insights          | Personalized recommendations to improve your profile           |
| ⚡ Fast & Responsive        | Built with React and Express for smooth performance            |

---

# 🏗️ System Architecture

```text
                  +-------------------+
                  |      Frontend     |
                  |       React       |
                  +---------+---------+
                            |
                            |
                  REST API Requests
                            |
                            ▼
                  +-------------------+
                  |  Express Backend  |
                  +---------+---------+
                            |
            +---------------+----------------+
            |                                |
            ▼                                ▼
     MongoDB Database                 Google Gemini AI
            |                                |
            +---------------+----------------+
                            |
                            ▼
                  AI Interview Report
```

---

# 🧠 AI Workflow

```text
                  +------------------------+
                  |    Resume Upload       |
                  +-----------+------------+
                              |
                              ▼
                  +------------------------+
                  |  Job Description Input |
                  +-----------+------------+
                              |
                              ▼
                  +------------------------+
                  | Candidate Information  |
                  +-----------+------------+
                              |
                              ▼
                  +------------------------+
                  |   Google Gemini AI     |
                  |   Prompt Processing    |
                  +-----------+------------+
                              |
          +-------------------+-------------------+
          |                                       |
          ▼                                       ▼
+------------------------+            +------------------------+
|   Resume Evaluation    |            | Skill Gap Analysis     |
+-----------+------------+            +-----------+------------+
            |                                     |
            +----------------+--------------------+
                             |
                             ▼
                  +------------------------+
                  | Interview Questions    |
                  | (Technical + HR)       |
                  +-----------+------------+
                              |
                              ▼
                  +------------------------+
                  | Personalized Career    |
                  |      AI Report         |
                  +------------------------+
```

---

# 🛠 Tech Stack

### Frontend

- ⚛ React
- React Router
- Context API
- Axios
- SCSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer
- Zod Validation

### AI

- Google Gemini API
- Google GenAI SDK

### Other Tools

- Puppeteer
- dotenv
- CORS

---

# 📂 Folder Structure

```text
ElevateCV AI
│
├── backend
|   ├── src
|   |    ├── config
│   |    ├── controllers
│   |    ├── middleware
│   |    ├── models
│   |    ├── routes
│   |    ├── services
│   |    └── utils
|   |          ├── prompts
|   |          └── schemas
│   └── server.js
│
├── frontend
│   ├── src
│   |    ├── features
|   |    |     ├── auth
|   |    |     |    ├── components  
|   |    |     |    ├── hooks
|   |    |     |    ├── pages
|   |    |     |    ├── services
|   |    |     |    └── auth.context.js
|   |    |     └── interview
|   |    |          ├── components  
|   |    |          ├── hooks
|   |    |          ├── pages
|   |    |          ├── services
|   |    |          └── interview.context.js
|   |    ├── styles
|   |    ├── app.routes.jsx
|   |    └── main
│   └── App.jsx
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Pratik5767/ElevateCV-AI.git
```

```bash
cd ElevateCV AI
```

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

---

# 📸 Screenshots

> Add screenshots here after deployment.

- 🏠 Home Page
- 🔑 Login
- 👤 Register
- 🤖 AI Report
- 📊 AI generated Resume

---

# 🚀 Future Roadmap

- 🎙 Voice-based Mock Interviews
- 💬 AI Career Coach Chatbot
- 📈 Resume ATS Visualization
- 📥 PDF Report Export
- 📧 Email Reports
- 🧑‍💼 Company-specific Interview Sets

---

# 📚 What I Learned

This project strengthened my understanding of:

- Full-Stack Web Development
- RESTful API Design
- JWT Authentication
- MongoDB & Mongoose
- React Context API
- AI Prompt Engineering
- Google Gemini Integration
- Secure Backend Development
- File Upload Handling
- Modular Project Architecture

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 👨‍💻 Developer

**Pratik**

GitHub: **https://github.com/Pratik5767**

---

# ⭐ Support

If you found this project helpful, please consider:

⭐ Starring the repository

🍴 Forking it

📢 Sharing it with others

Your support motivates further development and improvements!

---

<div align="center">

### 💙 Thanks for visiting ElevateCV AI!

**Empowering careers with Artificial Intelligence.**

</div>