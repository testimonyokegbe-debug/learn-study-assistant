Learn-AI Study Assistant

Learn is an AI-powered student productivity platform designed to bring essential study tools into one application.
The platform combines an AI chat assistant with practical academic tools, allowing students to ask questions, organize notes, read PDF materials, and perform calculations without switching between different applications.

Features:

1.AI Study Assistant
An integrated AI chat assistant that allows students to ask questions and receive AI-generated responses and explanations.
The assistant communicates with the application's backend, which securely handles the AI API request.

2.Notes
A simple notes section for creating and managing study notes.
Students can create notes with a title and content and manage them directly within the application.

3.PDF Reader(learn)
A built-in PDF reading section that allows students to access and read their study materials within the platform.

4.Calculator
A calculator for performing mathematical calculations while studying.

5.Authentication
The application includes user authentication using Firebase Authentication.
Supported authentication methods include:
- Email and password
- Google Sign-In

6.Responsive Interface
The application is designed to provide a usable experience across different screen sizes, including desktop and mobile devices.

Tech Stack:

Frontend
- React
- Vite
- JavaScript
- Tailwind CSS

Backend
- Express.js
- REST API

Authentication & Data
- Firebase Authentication
- Firebase Firestore

AI
- Gemini AI API
- AI chat integration
- React Markdown
- KaTeX for mathematical expressions

Development & Deployment
- Git
- GitHub
- Vercel
- Render

Architecture:

The application uses a separate frontend and backend architecture.
The frontend handles the user interface and interactions, while the Express backend acts as the intermediary for AI requests instead of exposing the AI API key directly in the frontend.

Environment Variables:

The backend requires environment variables for sensitive configuration.

Example:

PORT=5000
GEMINI_API_KEY=your_api_key_here

Deployment:

The application uses separate deployment environments for the frontend and backend.

Frontend: Vercel

Backend: Render

The production frontend communicates with the deployed backend API.

Project Goal:

The goal of this project was to explore how AI can be integrated into a practical software product rather than building a standalone chatbot.
The AI assistant is integrated into a broader student-focused platform containing multiple tools that support everyday studying.

What I Learned

Through this project, I gained practical experience with:
- Building applications with React
- Creating responsive interfaces with Tailwind CSS
- Building REST APIs with Express
- Connecting a frontend to a backend
- Integrating an AI API
- Firebase Authentication
- Google authentication
- Firestore
- Environment variables and API key security
- Handling API requests and errors
- Git and GitHub
- Frontend and backend deployment
- Deploying applications with Vercel and Render
- Structuring a full-stack application

Future Improvements

Possible future improvements include:

- Password reset and account recovery
- Persistent synchronization of notes
- AI-generated quizzes
- Study progress tracking
- Improved AI response performance
- More advanced PDF functionality
- Additional AI-powered study features

Author:
Testimony Iruoghene Okegbe (full stack developer)
