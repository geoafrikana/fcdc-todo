# FCDC Todo App

A full-stack Todo application built with a React frontend and a Python FastAPI backend.

## Features
- User signup and authentication
- Add, view, and delete todos
- Responsive UI
- RESTful API

## Project Structure
```
frontend/   # React app (Vite)
backend/    # FastAPI server
```

### Frontend
- Built with React and Vite
- Located in the `frontend/` directory
- Main files: `src/App.jsx`, `src/components/`, `src/utils/`

### Backend
- Built with FastAPI
- Located in the `backend/` directory
- Main files: `main.py`, `src/schemas.py`

## Getting Started

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /signup` - Register a new user
- `POST /signin` - Authenticate user
- `GET /todos` - Get all todos
- `POST /todos` - Add a new todo
- `DELETE /todos/{id}` - Delete a todo

## License
MIT
