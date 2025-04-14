from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

load_dotenv()

# Create FastAPI app instance
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://pingcrm-demo.vercel.app",  # Replace with your actual Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Get the DATABASE_URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# If no DATABASE_URL is provided, raise a more descriptive error
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set in the environment")

# Add URL validation and correction for render.com postgres URLs
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    # Create SQLAlchemy engine
    engine = create_engine(DATABASE_URL)
except Exception as e:
    print(f"Error creating database engine: {str(e)}")
    print(f"Database URL format (censored): {DATABASE_URL.split('@')[0]}@****")
    raise

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 