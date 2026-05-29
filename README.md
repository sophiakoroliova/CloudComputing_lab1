# Todo App

A 3-tier web application for the Cloud Computing & Distributed Systems course.

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 16+
- Git

## Setup

### 1. Database

Create a database and a user:

```bash
sudo -u postgres psql
```

```sql
CREATE USER todouser WITH PASSWORD 'todopass';
CREATE DATABASE tododb OWNER todouser;
\q
```

### 2. Backend

```bash
cd backend

python -m venv .venv
source .venv/bin/activate   # Linux/Mac
# .venv\Scripts\activate    # Windows

pip install -r requirements.txt

cp .env.example .env

python main.py
```

### 3. Frontend

```bash
cd frontend

npm install

npm run dev
```

## Lab Assignment

Your task is to explore the application architecture, understand how the components communicate, and experiment with failures. Refer to the lab assignment document for detailed instructions.
