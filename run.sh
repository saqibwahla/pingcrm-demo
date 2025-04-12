#!/bin/bash

# Start the backend server
cd backend
source venv/bin/activate
python init_db.py
uvicorn main:app --reload &
cd ..

# Start the frontend server
cd frontend
npm run dev 