from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os
from dotenv import load_dotenv
from routers import contacts, companies
from database import engine, Base
import crud
import schemas
import database

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PingCRM API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contacts.router, prefix="/api/contacts", tags=["contacts"])
app.include_router(companies.router, prefix="/api/companies", tags=["companies"])

@app.get("/")
async def root():
    return {"message": "Welcome to PingCRM API"}

if __name__ == "__main__":
    import uvicorn
    # Use port 10000 for production on Render.com
    uvicorn.run(app, host="0.0.0.0", port=10000) 