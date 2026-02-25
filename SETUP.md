# InterviewMitra - Project Setup Guide

AI-powered mock interview platform. Yeh guide project ko local pe run karne ke liye hai.

---

## Prerequisites

- **Node.js** (v18 ya usse upar)
- **MongoDB** (local ya MongoDB Atlas)
- **Firebase** account (Google Auth ke liye)
- **Razorpay** account (payments ke liye, optional - sirf pricing use karni ho toh)
- **OpenRouter** API key (AI interview ke liye)

---

## Project Structure

```
3.interviewIQ/
├── client/          # React + Vite frontend (port 5173)
├── server/          # Express backend (port 8000)
└── SETUP.md         # Yeh file
```

---

## Step 1: Server Setup

### 1.1 Dependencies Install

```bash
cd server
npm install
```

### 1.2 Environment Variables

`server/.env` file banao (ya existing file edit karo):

```env
PORT=8000
MONGODB_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"
JWT_SECRET="your-random-secret-key"
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Variables ka description:**
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8000) |
| `MONGODB_URL` | MongoDB connection string (Atlas ya local) |
| `JWT_SECRET` | JWT token signing ke liye random string |
| `OPENROUTER_API_KEY` | [OpenRouter](https://openrouter.ai/) se API key (AI questions/feedback) |
| `RAZORPAY_KEY_ID` | [Razorpay](https://razorpay.com/) test/live key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |

### 1.3 Server Run

```bash
npm run dev
```

Server `http://localhost:8000` pe chalega.

---

## Step 2: Client Setup

### 2.1 Dependencies Install

```bash
cd client
npm install
```

### 2.2 Environment Variables

`client/.env` file banao:

```env
VITE_FIREBASE_APIKEY=your-firebase-api-key
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key
```

**Variables ka description:**
| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_APIKEY` | Firebase project ka API key (Google Auth) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key (Pricing page payments ke liye) |

**Firebase setup:**
1. [Firebase Console](https://console.firebase.google.com/) pe project banao
2. Authentication → Sign-in method → Google enable karo
3. Project Settings → General → Your apps → Web app add karo
4. `apiKey` copy karke `.env` mein daalo

### 2.3 Client Run

```bash
npm run dev
```

Client `http://localhost:5173` pe chalega.

---

## Step 3: Project Run (Dono Together)

### Option A: Ek hi command se (Recommended)

Project root folder mein:
```bash
npm install    # pehli baar sirf
npm run dev
```

Server + Client dono ek saath chalenge. Browser mein open karo: **http://localhost:5173**

---

### Option B: Alag terminals mein

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

Phir browser mein open karo: **http://localhost:5173**

---

## API Base URL

Client mein server URL hardcoded hai: `http://localhost:8000`  
Agar server alag port pe ho toh `client/src/App.jsx` mein `ServerUrl` update karo.

---

## CORS

Server sirf `http://localhost:5173` se requests allow karta hai.  
Agar client alag port/domain pe ho toh `server/index.js` mein CORS `origin` update karo.

---

## Optional: Build for Production

**Client build:**
```bash
cd client
npm run build
```

Build output `client/dist/` mein milega. Isko kisi static host (Vercel, Netlify, etc.) pe deploy kar sakte ho.

**Server:** Production mein `node index.js` ya PM2 use karo (nodemon sirf dev ke liye hai).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| localhost refused to connect | Pehle koi purana process band karo: `lsof -i :5173` aur `lsof -i :8000` check karo. Phir `kill -9 <PID>` se band karo |
| Port already in use | Client 5174/5175 pe chal sakta hai - terminal mein jo URL dikhe wahi open karo |
| CORS / API calls fail | Server ab koi bhi localhost port allow karta hai. Server restart karo |
| MongoDB connection fail | `MONGODB_URL` sahi hai check karo, Atlas pe IP whitelist karo |
| Google Auth nahi chal raha | Firebase Console → Authentication → Settings → Authorized domains mein `localhost` add karo |
| Razorpay error | Test mode mein `rzp_test_` wali key use karo |

---

## Quick Start (TL;DR)

```bash
# Root se - sabse easy
cd 3.interviewIQ
npm install
# server/ aur client/ ke .env set karo (agar nahi kiye)
npm run dev
```

Ya alag-alag:
```bash
cd server && npm install && # .env set karo
cd ../client && npm install && # .env set karo
cd .. && npm run dev
```
