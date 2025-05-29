import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const DEFAULT_PORT = 3000;
const START_MESSAGE = "Server is up and running.";

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(START_MESSAGE);
});
