import express from "express";
import userRouter from "./router/user.mjs";

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());  //IMPORTANT -> to parse the body of the request to json
app.use(userRouter);

//localhost:3000/api/user?filter=username&value=surya

// put -> complete update
// patch -> partial update