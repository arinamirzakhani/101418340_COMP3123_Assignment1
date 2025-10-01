## How to Run Locally
docker pull mongo:7.0
docker volume create comp3123_mongo_data

docker run -d --name comp3095-mongodb -p 27017:27017 -v comp3123_mongo_data:/data/db -e MONGO_INITDB_DATABASE=comp3123_assigment1 mongo:7.0

Start Mongo (Docker): docker start comp3095-mongodb

Copy envs: cp .env.example .env and set

PORT=3000
MONGO_URI=mongodb://localhost:27017/comp3123_assigment1
JWT_SECRET=replace_me
REQUIRE_AUTH=false


Install deps: npm install

Run API: npm run dev → Base URL: http://localhost:3000

Health: GET / → {"message":"API up"}, GET /health → ok

(Optional) Verify DB in Docker (for screenshots):

docker exec -it comp3095-mongodb mongosh

Then run:

use comp3123_assigment1
show collections
db.users.findOne()
db.employees.findOne()
exit

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

## Notes

- **Auth toggle:** `REQUIRE_AUTH=false` by default. Set `REQUIRE_AUTH=true` (and define `JWT_SECRET`) to enforce JWT on all `/api/v1/emp/*` routes.
- **Error shape:** Responses on failure follow  
  `{ "status": false, "message": "<reason>", "errors": [ ... ] }` (the `errors` array appears for validation errors).
- **Health check:** `GET /` returns `{ "message": "API up" }`.


