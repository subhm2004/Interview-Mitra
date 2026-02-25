# Interview Mitra

**AI-powered mock interview platform** — Practice interviews with AI, get real-time feedback, and crack your dream job.

![InterviewMitra](https://img.shields.io/badge/InterviewMitra-AI%20Mock%20Interviews-blue?style=for-the-badge)

---

## 📖 Overview

InterviewMitra is a full-stack web application that helps job seekers practice interviews using AI. Users can choose their role, experience level, and interview mode (HR or Technical). The AI conducts voice-based mock interviews with smart follow-up questions, evaluates answers in real-time, and generates detailed PDF reports with strengths, weaknesses, and improvement suggestions.

---

## ✨ Features

| Feature                    | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| **Google Auth**            | Sign in with Google (Firebase Authentication)             |
| **Role-based Interviews**  | Select job role & experience level; AI adjusts difficulty |
| **HR & Technical Modes**   | Behavioral (HR) or technical interview modes              |
| **Resume-based Questions** | Upload resume for project-specific questions              |
| **Voice Interview**        | Speak answers; AI listens and responds with follow-ups    |
| **Real-time Feedback**     | Instant feedback after each answer                        |
| **Timer Simulation**       | Time pressure like real interviews                        |
| **PDF Report**             | Downloadable report (light blue theme); Share link to copy URL |
| **Interview History**      | Track all past interviews and performance                 |
| **Progress Dashboard**     | Analytics, charts, and performance trends                 |
| **Interview Tips**         | Quick reference: HR questions, DSA topics, System Design  |
| **Credits System**         | 100 welcome bonus; pay-per-interview via Razorpay         |
| **Theme Toggle**           | Dark / Light mode switch in navbar                        |
| **Streaks & Badges**       | Daily streak tracking; badges (First Interview, 5 Interviews, Score 8+, HR Master, Technical Master) |
| **Responsive UI**          | Modern design with Tailwind CSS, Motion animations        |

---

## 🛠 Tech Stack

| Layer        | Technology                                              |
| ------------ | ------------------------------------------------------- |
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, Redux Toolkit, Motion |
| **Backend**  | Node.js, Express 5                                      |
| **Database** | MongoDB (Mongoose)                                      |
| **Auth**     | Firebase (Google Sign-in), JWT                          |
| **AI**       | OpenRouter API (LLM for questions & evaluation)         |
| **Payments** | Razorpay                                                |
| **Charts**   | Recharts, react-circular-progressbar                    |
| **PDF**      | jsPDF, jspdf-autotable                                  |
| **UI**       | react-hot-toast                                         |

---

## 📁 Project Structure

```
interviewmitra/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Navbar, Footer, Step1/2/3, Timer, AuthModel
│   │   ├── pages/          # Home, Auth, Pricing, Interview, History, Report, Tips, Dashboard
│   │   ├── redux/          # User state, theme
│   │   ├── utils/          # Firebase config, API helpers
│   │   └── assets/         # Images, icons
│   ├── index.html
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/             # DB, token, multer
│   ├── controllers/        # Auth, user, interview, payment
│   ├── models/             # User, Interview, CreditsTransaction
│   ├── routes/             # API routes
│   ├── services/           # OpenRouter, Razorpay
│   ├── index.js
│   └── package.json
│
├── package.json            # Root - runs client + server together
├── start.sh                # Clean start script
├── SETUP.md                # Quick setup reference
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Firebase** account (for Google Auth)
- **OpenRouter** API key ([openrouter.ai](https://openrouter.ai/))
- **Razorpay** account (optional, for payments)

---

## 📋 Installation & Setup

### Step 1: Clone & Install Dependencies

```bash
# Navigate to project folder
cd interviewmitra

# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### Step 2: Server Environment Variables

Create `server/.env`:

```env
PORT=8000
MONGODB_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"
JWT_SECRET="your-random-secret-key-min-32-chars"
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

| Variable              | Required     | Description                   |
| --------------------- | ------------ | ----------------------------- |
| `PORT`                | No           | Server port (default: 8000)   |
| `MONGODB_URL`         | Yes          | MongoDB connection string     |
| `JWT_SECRET`          | Yes          | Random string for JWT signing |
| `OPENROUTER_API_KEY`  | Yes          | AI questions & evaluation     |
| `RAZORPAY_KEY_ID`     | For payments | Razorpay Key ID               |
| `RAZORPAY_KEY_SECRET` | For payments | Razorpay Secret               |

### Step 3: Client Environment Variables

Create `client/.env`:

```env
VITE_FIREBASE_APIKEY=your-firebase-api-key
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key
```

| Variable               | Required     | Description                    |
| ---------------------- | ------------ | ------------------------------ |
| `VITE_FIREBASE_APIKEY` | Yes          | Firebase project API key       |
| `VITE_RAZORPAY_KEY_ID` | For payments | Same as server Razorpay Key ID |

### Step 4: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project (or use existing)
3. **Authentication** → Sign-in method → Enable **Google**
4. **Project Settings** → General → Your apps → Add **Web app**
5. Copy `apiKey` → paste in `client/.env` as `VITE_FIREBASE_APIKEY`
6. In **Authorized domains**, add `localhost`

> **Note:** If you use a different Firebase project, update `client/src/utils/firebase.js` with your `authDomain`, `projectId`, etc.

### Step 5: OpenRouter Setup

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Get API key from dashboard
3. Add to `server/.env` as `OPENROUTER_API_KEY`

### Step 6: Razorpay Setup (Optional)

1. Create account at [Razorpay](https://razorpay.com/)
2. Dashboard → Settings → API Keys → Generate **Test** keys
3. Add `Key ID` and `Secret` to `server/.env`
4. Add `Key ID` to `client/.env` as `VITE_RAZORPAY_KEY_ID`

---

## ▶️ Running the Project

### Option A: Single Command (Recommended)

From project root:

```bash
npm run dev
```

This starts:

- **Server** at `http://localhost:8000`
- **Client** at `http://localhost:5173`

Open **http://localhost:5173** in your browser.

### Routes

| Path           | Page              |
| -------------- | ----------------- |
| `/`            | Home              |
| `/auth`        | Auth              |
| `/interview`   | Interview flow    |
| `/history`     | Interview history |
| `/report/:id`  | Interview report  |
| `/dashboard`   | Progress dashboard|
| `/tips`        | Interview tips    |
| `/pricing`     | Buy credits       |

### Option B: Using start.sh (Clean Start)

Kills any process on ports 5173, 5174, 5175, 8000, then starts:

```bash
chmod +x start.sh
./start.sh
```

### Option C: Separate Terminals

**Terminal 1 – Server:**

```bash
cd server
node index.js
```

**Terminal 2 – Client:**

```bash
cd client
npx vite
```

---

## 🔄 How It Works

### User Flow

1. **Home** → User lands on homepage, sees features & testimonials
2. **Auth** → Sign in with Google (required for interview)
3. **Interview Setup (Step 1)** → Select role, experience, mode (HR/Tech), optionally upload resume
4. **Interview (Step 2)** → AI asks questions; user speaks; real-time feedback
5. **Report (Step 3)** → View scores, charts, insights; download PDF; share link
6. **History** → See all past interviews
7. **Dashboard** → Progress analytics, performance trends
8. **Tips** → HR questions, DSA topics, System Design reference
9. **Pricing** → Buy credits (Razorpay) for more interviews

### API Endpoints

| Method | Endpoint                            | Description                       |
| ------ | ----------------------------------- | --------------------------------- |
| POST   | `/api/auth/google`                  | Google auth, sets JWT cookie      |
| GET    | `/api/user/current-user`            | Get logged-in user                |
| POST   | `/api/interview/resume`             | Upload & analyze resume           |
| POST   | `/api/interview/generate-questions` | Generate AI questions (deducts credits) |
| POST   | `/api/interview/submit-answer`      | Submit answer, get feedback       |
| POST   | `/api/interview/finish`             | Finish interview, update streak & badges |
| GET    | `/api/interview/get-interview`      | Get user's interview history      |
| GET    | `/api/interview/report/:id`         | Get report by ID                  |
| POST   | `/api/payment/order`                | Create Razorpay order             |
| POST   | `/api/payment/verify`               | Verify payment, add credits       |

### Credits System

- New users get **100 welcome credits** on signup
- Each interview consumes **50 credits**
- Buy more via **Pricing** page (Razorpay)
- Credits transactions logged (add/deduct with reason)

---

## 🌐 Configuration

### Change Server URL

If backend runs on a different host/port, update `client/src/App.jsx`:

```js
export const ServerUrl = "http://localhost:8000";
```

### CORS

Server allows `localhost` and `127.0.0.1` on any port. For production, update `server/index.js`:

```js
origin: ["https://your-frontend-domain.com"];
```

---

## 📦 Production Build

### Client

```bash
cd client
npm run build
```

Output in `client/dist/`. Deploy to Vercel, Netlify, or any static host.

### Server

```bash
cd server
node index.js
```

For production, use **PM2** or similar:

```bash
pm2 start server/index.js --name interviewmitra
```

---

## 🐛 Troubleshooting

| Issue                            | Solution                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| **localhost refused to connect** | Check if ports 5173/8000 are free: `lsof -i :5173` and `lsof -i :8000`. Kill with `kill -9 <PID>` |
| **Port already in use**          | Vite may use 5174/5175; use the URL shown in terminal                                             |
| **CORS / API fails**             | Restart server; ensure client URL is localhost                                                    |
| **MongoDB connection fail**      | Verify `MONGODB_URL`; whitelist IP in Atlas                                                       |
| **Google Auth not working**      | Add `localhost` to Firebase Authorized domains                                                    |
| **Razorpay error**               | Use `rzp_test_` keys in test mode                                                                 |
| **AI questions not loading**     | Check `OPENROUTER_API_KEY` and API quota                                                          |

---

## 📄 License

MIT (or as per your project)

---
