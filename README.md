# Local AI Text Summarizer
### React + FastAPI + LangGraph + Llama 3.2

A modern, full-stack web application that leverages local Large Language Models (LLMs) to provide high-quality text summarization. This project was built to explore agentic workflows and privacy-first AI deployment, ensuring all data processing happens entirely on the user's local machine.

---

## Technical Architecture
The application follows a decoupled client-server architecture, utilizing a "State Machine" approach for AI orchestration.

| Layer | Technology | Role |
| :--- | :--- | :--- |
| Frontend | React (Vite) | Handles UI/UX, state management, and asynchronous API calls. |
| Backend | FastAPI | High-performance Python API that routes traffic and manages CORS. |
| Orchestration | LangGraph | Manages the AI workflow as a stateful, cyclical graph. |
| AI Framework | LangChain | Provides the building blocks for prompt templating and LLM integration. |
| Inference Engine| Ollama | Manages local model weights and serves the Llama 3.2 engine. |

---

## Key Features
* **Privacy-First:** By using Ollama and Llama 3.2, no data ever leaves the local hardware. This is ideal for sensitive documents or internal research.
* **Agentic Ready:** Built using LangGraph, allowing the system to be easily scaled from a simple chain into a complex AI agent that can self-correct or use external tools.
* **Modern UI:** A clean, responsive interface built with React, featuring real-time synthesis feedback and clipboard integration.
* **Optimized Inference:** Configured to use the Llama 3.2 3B model for a balance of speed and reasoning capability on standard consumer hardware.

---

## System Data Flow
1. **Client Side:** User inputs text into the React interface.
2. **API Layer:** The request is sent to a FastAPI endpoint via a POST request.
3. **Graph Logic:** The text enters a LangGraph state. A node processes the text through a specialized LangChain prompt template.
4. **Local Inference:** The template is sent to Ollama, where the Llama 3.2 model generates the summary.
5. **Response:** The summary is passed back through the graph to the API, which returns it to the React frontend for display.

---

## Setup and Installation

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* Ollama installed and running

### 1. Model Setup
```bash
ollama pull llama3.2
```

### 2. Backend Setup
```bash
# Navigate to root
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn langchain-ollama langgraph
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## Project Context
Developed as a technical deep dive into Distributed Systems and Agentic AI Frameworks. This project demonstrates the ability to bridge system-level logic (FastAPI/Python) with modern reactive frontends, specifically tailored for efficient performance in local environments.
