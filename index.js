import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = " https://v2.jokeapi.dev/joke/Any?";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// Set the view engine to ejs
app.set("view engine", "ejs");

function renderJokePage(res, data) {
  if (data.type === "twopart") {
    res.render("index.ejs", {
      setup: data.setup,
      delivery: data.delivery,
      noJoke: false,
    });
  } else if (data.type === "single") {
    res.render("index.ejs", {
      joke: data.joke,
      noJoke: false,
    });
  } else {
    res.render("index.ejs", {
      noJoke: true,
    });
  }
}

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL); 
    renderJokePage(res, result.data);
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/created-joke", async (req, res) => {
  let jokeQuery = req.body.submitted;
  let config = `&contains=${jokeQuery}`;

  try {
    const result = await axios.get(API_URL + config);
    renderJokePage(res, result.data);
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
    res.render("index.ejs", {
      noJoke: true,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
