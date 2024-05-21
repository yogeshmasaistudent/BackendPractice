const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { PostRouter } = require("./Routes/Post.Router");


// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/posts",PostRouter)




const PORT = process.env.PORT || 4545;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Server is running at PORT ${PORT}`);
  } catch (error) {
    console.error(`Internal Error: ${error.message}`);
  }
});
