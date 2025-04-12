# PingCRM

A modern CRM application built with React, TypeScript, FastAPI, and PostgreSQL.

## Features

- Contact Management
- Company Management
- Search & Filter functionality
- Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- TanStack Query for data fetching
- Axios for HTTP requests
- Tailwind CSS for styling

### Backend
- FastAPI (Python)
- PostgreSQL database
- SQLAlchemy ORM
- Pydantic for data validation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL

### Backend Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the database:
- Create a PostgreSQL database named `pingcrm`
- Update the DATABASE_URL in `backend/.env` if needed

4. Run the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Contacts
- GET /api/contacts - List all contacts
- GET /api/contacts/{id} - Get a specific contact
- POST /api/contacts - Create a new contact
- PUT /api/contacts/{id} - Update a contact
- DELETE /api/contacts/{id} - Delete a contact

### Companies
- GET /api/companies - List all companies
- GET /api/companies/{id} - Get a specific company
- POST /api/companies - Create a new company
- PUT /api/companies/{id} - Update a company
- DELETE /api/companies/{id} - Delete a company

## Deployment

The application can be deployed using:
- Frontend: Vercel
- Backend: Render
- Database: Supabase or Neon

## License

This project is licensed under the MIT License. 