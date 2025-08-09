# Node proxy

This simple Express server forwards chat requests to OpenAI. It expects OPENAI_API_KEY in environment variables.

Usage (local):
1. cd server
2. npm install
3. export OPENAI_API_KEY='sk-...'
4. node server.js

The server exposes POST /api/chat with body:
{ "messages": [{ "role":"user", "content":"Hello" }] }

It returns:
{ "reply": "response text" }
