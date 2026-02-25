#!/bin/bash
# InterviewMitra - Clean start script
echo "Stopping any existing processes on ports 5173, 5174, 5175, 8000..."
lsof -ti:5173 -ti:5174 -ti:5175 -ti:8000 2>/dev/null | xargs kill -9 2>/dev/null
sleep 2
echo "Starting InterviewMitra..."
npm run dev
