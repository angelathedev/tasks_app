# Tasks API

A minimal **Rails API-only** app for managing tasks (in memory).  
Endpoints support creating, toggling, deleting tasks, and viewing task stats.  
Deployed on [Render](https://render.com).

---

## Features
- `GET /tasks` → list all tasks  
- `POST /tasks` → create a new task (`{ "text": "Do the thing" }`)  
- `PATCH /tasks/:id/toggle` → toggle task completion ✅/❌  
- `DELETE /tasks/:id` → delete a task  
- `GET /tasks/stats` → get counts of total/done/not done  

---

## Getting Started (Local)

### Next Steps
- Build a simple frontend to consume the API
- Swap in Postgres and ActiveRecord for persistence
- Add user authentication (API keys / JWT)

### Setup
```bash
# install dependencies
bundle install

# run the server (default port 3000)
bin/rails server
