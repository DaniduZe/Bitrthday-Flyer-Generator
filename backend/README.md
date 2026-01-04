# Birthday Flyer Backend

## Setup
1. `cp .env.example .env` and fill values
2. `npm install`
3. `npm run dev`

The API serves:
- `GET /api/users` list
- `GET /api/users/:id` fetch
- `POST /api/users` (multipart form) fields: name, email, dob (YYYY-MM-DD), picture (file)
- `PUT /api/users/:id` (multipart form) same fields
- `DELETE /api/users/:id`

Static files:
- `/uploads/*` for uploaded pictures
- `/flyers/*` for generated flyers

The birthday job runs daily at midnight (TIMEZONE env). To test quickly, temporarily change the cron expression in `src/services/birthdayJob.js` to run every minute: `'*/1 * * * *'`.
