# CitizenBridge

> AI-powered government and legal document assistant that helps users understand documents, find relevant information, and discover applicable government schemes.

CitizenBridge uses **RAG (Retrieval-Augmented Generation)** to process user-uploaded documents and provide contextual AI-powered responses.

## Features

* 📄 Upload and process government/legal documents
* 🔍 Semantic document search using vector embeddings
* 🤖 AI-powered question answering using Gemini
* 🧠 RAG-based responses using Qdrant
* 🌐 Multilingual document assistance
* 🎙️ Voice-based interaction support
* 📋 Checklist generation from documents
* 🏛️ Government scheme discovery
* 🔐 Authentication using Clerk
* ☁️ Cloud document storage using Cloudinary
* ⚡ Background processing using Inngest
* 📑 PDF/document extraction using Docling
* 🔗 QR-based access to relevant portals and resources

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* DaisyUI
* Clerk
* Zustand
* React Hook Form
* Zod

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Clerk
* Cloudinary
* Inngest
* Gemini API
* Jina AI
* Qdrant

## Document Processing Service

* Python
* FastAPI
* Docling
* Uvicorn

## External Services

* MongoDB Atlas
* Cloudinary
* Clerk
* Qdrant Cloud
* Jina AI
* Google Gemini
* Inngest

---

# Architecture

```text
                         ┌─────────────────────┐
                         │      React App      │
                         │       Vite          │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP API
                                    ▼
                         ┌─────────────────────┐
                         │   Node / Express    │
                         │      Backend        │
                         └──────┬─────┬────────┘
                                │     │
                 ┌──────────────┘     └───────────────┐
                 │                                    │
                 ▼                                    ▼
        ┌─────────────────┐                  ┌─────────────────┐
        │   MongoDB       │                  │   Cloudinary    │
        │     Atlas       │                  │ File Storage    │
        └─────────────────┘                  └─────────────────┘
                                                     │
                                                     │ Document URL
                                                     ▼
                                          ┌─────────────────────┐
                                          │ Python FastAPI      │
                                          │ Docling Service     │
                                          └──────────┬──────────┘
                                                     │
                                                     │ Extracted Text
                                                     ▼
                                          ┌─────────────────────┐
                                          │      Inngest        │
                                          │ Background Jobs     │
                                          └──────────┬──────────┘
                                                     │
                                                     ▼
                                          ┌─────────────────────┐
                                          │ Jina Embeddings     │
                                          └──────────┬──────────┘
                                                     │
                                                     ▼
                                          ┌─────────────────────┐
                                          │    Qdrant Cloud     │
                                          │   Vector Database   │
                                          └──────────┬──────────┘
                                                     │
                                                     │ Relevant Chunks
                                                     ▼
                                          ┌─────────────────────┐
                                          │    Gemini API       │
                                          │     LLM / RAG       │
                                          └─────────────────────┘
```

---

# Project Structure

```text
citizenBridge/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── python-service/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
├── package.json
└── README.md
```

---

# Prerequisites

Install the following before starting:

* Node.js 18+
* npm
* Python 3.10+
* Git
* MongoDB Atlas account
* Clerk account
* Cloudinary account
* Qdrant Cloud account
* Jina AI account
* Google Gemini API access
* Inngest account

For local Clerk webhooks, install:

* ngrok

---

# Clone the Repository

```bash
git clone https://github.com/maurya-kavi/citizenBridge.git
cd citizenBridge
```

---

# 1. Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# 2. Backend Setup

Open another terminal and navigate to:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Add the following variables:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PYTHON_SERVICE_URL=http://localhost:8000

JINA_API_KEY=your_jina_api_key

QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key

GEMINI_API_KEY=your_gemini_api_key

INNGEST_DEV=1
INNGEST_EVENT_KEY=dev
```

Start the backend:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

---

# 3. Python Document Processing Service

Open another terminal:

```bash
cd python-service
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
python -m uvicorn main:app --reload --port 8000
```

The service will run at:

```text
http://localhost:8000
```

Check:

```text
http://localhost:8000/
```

Expected response:

```json
{
  "status": "ok",
  "service": "docling-extractor"
}
```

---

# 4. MongoDB Atlas Setup

Create a MongoDB Atlas cluster.

Create a database user and obtain the connection string.

Add the connection string to:

```env
MONGO_URI=your_mongodb_connection_string
```

### Network Access

For local development, your current IP address must be allowed in MongoDB Atlas:

```text
MongoDB Atlas
→ Security
→ Network Access
→ Add IP Address
```

For production, configure the appropriate network access according to your deployment environment.

---

# 5. Clerk Authentication Setup

Create a Clerk application.

You need:

### Frontend

```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

### Backend

The backend requires the **Clerk webhook signing secret**:

```env
CLERK_WEBHOOK_SECRET=your_webhook_signing_secret
```

The backend webhook endpoint is:

```text
/api/webhooks/clerk
```

---

# 6. Local Clerk Webhook Using ngrok

For local development, Clerk cannot directly reach:

```text
http://localhost:5000
```

Use ngrok.

Install ngrok and authenticate it with your account.

Start the backend first:

```bash
npm run dev
```

Then run:

```bash
ngrok http 5000
```

ngrok will provide a public URL similar to:

```text
https://your-ngrok-url.ngrok-free.dev
```

Configure the Clerk webhook endpoint:

```text
https://your-ngrok-url.ngrok-free.dev/api/webhooks/clerk
```

Enable these events:

```text
user.created
user.updated
user.deleted
```

> The ngrok URL can change after restarting ngrok. Update the Clerk webhook URL if required.

---

# 7. Cloudinary Setup

Create a Cloudinary account.

Get:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Add them to the backend `.env`.

## Important PDF Configuration

CitizenBridge uploads and processes PDF files.

In Cloudinary, make sure PDF/raw file delivery is enabled.

Navigate to the Cloudinary security settings and enable:

```text
Allow delivery of PDF and ZIP files
```

Without this configuration, the Python extraction service may receive:

```text
401 Unauthorized
```

when trying to download a PDF from Cloudinary.

---

# 8. Qdrant Setup

Create a Qdrant Cloud cluster.

Obtain:

```env
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
```

Add them to the backend `.env`.

Qdrant is used as the vector database for storing and retrieving document embeddings.

---

# 9. Jina AI Setup

Create a Jina AI account/API key.

Add:

```env
JINA_API_KEY=your_jina_api_key
```

The application uses Jina embeddings for semantic vector search.

---

# 10. Gemini Setup

Create a Google Gemini API key.

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Gemini is used for generating responses from the retrieved document context.

---

# 11. Inngest Setup

CitizenBridge uses Inngest for background document-processing workflows.

## Local Development

For local development, add:

```env
INNGEST_DEV=1
INNGEST_EVENT_KEY=dev
```

Start the backend:

```bash
npm run dev
```

Then start the Inngest development server in another terminal:

```bash
npx inngest-cli@latest dev
```

The Inngest development dashboard will be available at:

```text
http://localhost:8288
```

The backend Inngest endpoint is:

```text
http://localhost:5000/api/inngest
```

---

# 12. Production Inngest Setup

For production, create an Inngest application and obtain:

```env
INNGEST_EVENT_KEY=your_production_event_key
INNGEST_SIGNING_KEY=your_production_signing_key
```

Add these to the production backend environment.

### Important

Do **not** use:

```env
INNGEST_DEV=1
```

in production.

The production Inngest application should communicate with the publicly deployed backend:

```text
https://your-backend-url/api/inngest
```

---

# Document Processing Flow

When a user uploads a document, the general workflow is:

```text
User uploads PDF
        ↓
Frontend
        ↓
Node/Express Backend
        ↓
Cloudinary
        ↓
Inngest Background Job
        ↓
Python FastAPI Service
        ↓
Docling
        ↓
Extracted Markdown/Text
        ↓
Chunking
        ↓
Jina Embeddings
        ↓
Qdrant
        ↓
Vector Storage
```

When the user asks a question:

```text
User Question
      ↓
Backend
      ↓
Query Embedding
      ↓
Qdrant Similarity Search
      ↓
Relevant Document Chunks
      ↓
Gemini
      ↓
Context-aware Answer
      ↓
Frontend
```

This is the core RAG pipeline used by CitizenBridge.

---

# Running the Complete Application Locally

You need multiple terminals.

### Terminal 1 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

### Terminal 2 — Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```text
http://localhost:5000
```

### Terminal 3 — Python Service

```bash
cd python-service
venv\Scripts\activate
python -m uvicorn main:app --reload --port 8000
```

Runs on:

```text
http://localhost:8000
```

### Terminal 4 — Inngest

```bash
npx inngest-cli@latest dev
```

Runs on:

```text
http://localhost:8288
```

### Terminal 5 — ngrok

Required for local Clerk webhooks:

```bash
ngrok http 5000
```

---

# Environment Variables Summary

## Frontend

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=
```

## Backend

```env
NODE_ENV=
PORT=

MONGO_URI=

CLERK_WEBHOOK_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PYTHON_SERVICE_URL=

JINA_API_KEY=

QDRANT_URL=
QDRANT_API_KEY=

GEMINI_API_KEY=

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

For local development:

```env
INNGEST_DEV=1
```

Do not commit any `.env` file to GitHub.

---

# Production Deployment

CitizenBridge can be deployed using separate services.

Recommended architecture:

```text
                 ┌───────────────────┐
                 │      Vercel       │
                 │ React Frontend    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │      Render       │
                 │ Node/Express API  │
                 └─────────┬─────────┘
                           │
             ┌─────────────┼──────────────┐
             │             │              │
             ▼             ▼              ▼
        MongoDB       Cloudinary      Inngest
        Atlas
             │
             │
             ▼
       ┌───────────────────┐
       │      Render       │
       │ Python + Docling  │
       └───────────────────┘
             │
             ▼
       Jina + Qdrant
             │
             ▼
          Gemini
```

---

# Frontend Deployment

Deploy the `frontend` directory using your preferred hosting provider.

Production environment variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_production_clerk_publishable_key
VITE_API_URL=https://your-backend-url
```

After changing Vercel environment variables, redeploy the frontend.

---

# Backend Deployment

Deploy the `server` directory as a Node.js web service.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Production environment:

```env
NODE_ENV=production

MONGO_URI=...

CLERK_WEBHOOK_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

PYTHON_SERVICE_URL=https://your-python-service-url

JINA_API_KEY=...

QDRANT_URL=...
QDRANT_API_KEY=...

GEMINI_API_KEY=...

INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

Do not set:

```env
INNGEST_DEV=1
```

in production.

---

# Python Service Deployment

Deploy the `python-service` directory as a Python web service.

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

After deployment, verify:

```text
https://your-python-service-url/
```

Expected:

```json
{
  "status": "ok",
  "service": "docling-extractor"
}
```

Then configure the backend:

```env
PYTHON_SERVICE_URL=https://your-python-service-url
```

---

# Production Clerk Webhook

After deploying the backend, update the Clerk production webhook.

Use:

```text
https://your-backend-url/api/webhooks/clerk
```

Enable:

```text
user.created
user.updated
user.deleted
```

The production webhook should point directly to the deployed backend.

**ngrok is only required for local development.**

---

# Security

Never commit:

```text
.env
.env.local
.env.production
```

Never expose:

```text
MONGO_URI
CLOUDINARY_API_SECRET
CLERK_WEBHOOK_SECRET
JINA_API_KEY
QDRANT_API_KEY
GEMINI_API_KEY
INNGEST_EVENT_KEY
INNGEST_SIGNING_KEY
```

Only frontend variables intentionally prefixed with:

```text
VITE_
```

should be used in the frontend environment.

---

# Troubleshooting

## Frontend shows a blank/white screen

Check:

1. Browser DevTools → Console
2. Vercel environment variables
3. `VITE_CLERK_PUBLISHABLE_KEY`
4. `VITE_API_URL`
5. Redeploy after changing environment variables

---

## Backend cannot connect to MongoDB

Check:

* `MONGO_URI`
* MongoDB Atlas Network Access
* Database username/password
* Cluster status

---

## PDF remains stuck at extraction

Check that all services are running:

```text
Frontend
Backend
Python Service
Inngest
```

Also verify:

```env
PYTHON_SERVICE_URL
```

and check the backend/Python/Inngest logs.

---

## Cloudinary returns 401 for PDF

Enable PDF/ZIP delivery in Cloudinary security settings.

---

## Inngest says event key is missing

For local development:

```env
INNGEST_DEV=1
INNGEST_EVENT_KEY=dev
```

For production:

```env
INNGEST_EVENT_KEY=your_production_event_key
INNGEST_SIGNING_KEY=your_production_signing_key
```

Do not use local development settings in production.

---

# Development Ports

| Service        | Port | URL                      |
| -------------- | ---: | ------------------------ |
| Frontend       | 5173 | `http://localhost:5173`  |
| Backend        | 5000 | `http://localhost:5000`  |
| Python Service | 8000 | `http://localhost:8000`  |
| Inngest        | 8288 | `http://localhost:8288`  |
| ngrok          |    — | Public tunnel to backend |

---

# Important Notes

* The application requires multiple external services to function completely.
* The frontend depends on the Node/Express backend.
* The backend depends on MongoDB, Cloudinary, Qdrant, Jina, Gemini and Inngest.
* Document extraction depends on the Python/Docling service.
* Local Clerk webhooks require ngrok or another publicly accessible tunnel.
* Production Clerk webhooks should point to the deployed backend.
* Production Inngest should use production keys and the publicly accessible backend endpoint.
* Never commit API keys or secrets to GitHub.

---

# License

This project is intended for educational, hackathon, and demonstration purposes.
