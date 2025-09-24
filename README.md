# COMP3123 – Assignment 1 (Backend, Node/Express/MongoDB)

## Run
1. Copy `.env.example` to `.env` and fill values.
2. `npm i`
3. `npm run dev` (http://localhost:3000)

## Endpoints (base: /api/v1)
- POST /user/signup (201)
- POST /user/login (200)
- GET  /emp/employees (200)
- POST /emp/employees (201)
- GET  /emp/employees/:eid (200)
- PUT  /emp/employees/:eid (200)
- DELETE /emp/employees?eid=... (204)

> DB name: `comp3123_assigment1`
