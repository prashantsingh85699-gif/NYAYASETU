# e-Jagriti: AI-Powered Legal Petition Drafting Platform

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL
- OpenAI API Key

### Installation

1. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file based on the example and add your DB URL and OpenAI Key
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   # Create .env.local if needed with VITE_API_URL
   npm run dev
   ```

3. **Access the App**
   Open http://localhost:5173

## Features
- AI Petition Drafting
- Multilingual Support (12+ Languages)
- PDF Generation
- Dashboard & History
- Legal Chatbot
