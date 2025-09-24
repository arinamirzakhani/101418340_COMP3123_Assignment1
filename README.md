## How to Run Locally
1) Start Mongo (Docker): docker start comp3095-mongodb
2) Copy .env.example to .env and set:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/comp3123_assigment1
   JWT_SECRET=replace_me
3) npm install
4) npm run dev  
DB name: comp3123_assigment1

## Test Credentials (for marking)
Email: johndoe@example.com
Password: password123

## Hosting
Not hosted. Run locally at http://localhost:3000


## Endpoints (base: /api/v1)
- POST /user/signup (201)
- POST /user/login (200)
- GET  /emp/employees (200)
- POST /emp/employees (201)
- GET  /emp/employees/:eid (200)
- PUT  /emp/employees/:eid (200)
- DELETE /emp/employees?eid=... (204)

