require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

(async () => {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
})();

app.get('/health', (_, res) => res.send('ok'));

