import express from "express";
import axios from "axios";
import bodyParser from "body-parser"; 

const app = express();
const port = 3000;
const API_URL = " https://v2.jokeapi.dev/joke/Any?";
  
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// Set the view engine to ejs
app.set('view engine', 'ejs'); 

app.get("/", async (req, res) => {  
    try {
        const result = await axios.get(API_URL);  

        if (result.data.type == "twopart") { 
          res.render("index.ejs", {
            setup: result.data.setup,
            delivery: result.data.delivery     
         }); 
        } else {
        res.render("index.ejs", {
            joke: result.data.joke    
         }); 
        }
      } catch (error) {
        console.log(error.response.data);
    res.status(500);
      }
    });

    app.post("/created-joke", async (req, res) => {  
      let jokeQuery = req.body.submitted
      
      

      if (result.data.type == "twopart") { 
         let config = `?type=twopart&contains=${jokeQuery}`
      } else {
         let config = `&contains=${jokeQuery}`
      }
       
      try {
          const result = await axios.get(API_URL+config); 
          console.log(result.data)
        
          if (result.data && result.data.joke) {
      res.render("index.ejs", {
        joke: result.data.joke
      });
    } else {  
      res.redirect("/")
    }
        } catch (error) {
          console.log(error.response.data);
      res.status(500);  
        }
      });




    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      