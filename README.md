<<<<<<< HEAD
# Bitrthday-Flyer-Generator
=======
# Birthday Flyer Automation (Node.js + React)

This repo contains a full-stack app:
- **Backend** (Express + MongoDB + Nodemailer + node-cron + Jimp) for scheduling, flyer generation, and emailing.
- **Frontend** (React + Vite) for CRUD on users.

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Notes
- Scheduler runs daily at midnight in `TIMEZONE` (default `Asia/Colombo`).
- To test immediately, change the cron expression in `src/services/birthdayJob.js` to `*/1 * * * *`.
- Flyers and uploads are saved locally and also served under `/flyers` and `/uploads`.
- Ensure you use an **App Password** if you use Gmail SMTP.
>>>>>>> 21b2927 (Initial commit)
