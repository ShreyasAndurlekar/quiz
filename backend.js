import express from "express";            // using modern ES6 syntax here so it's "import from" instead of require

const app = express();
const port = 3000;
app.use(express.static('public'));   

app.use(express.json());        // default middleware provided by express no need to import body parser since dealing with json files
app.use(express.urlencoded({ extended: true }));

let message = "undefined"

app.get('/', (req, res) => {

  res.render("website.ejs");

});

app.get('/display_leaderboard', async (req, res) => {

  try {

    //console.log("Display leaderboard")
  } 
  catch (error) {

    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');

  }
});

app.post('/userinfo', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const country = req.body.country;

    try{

      message = username + " " + password + " " + country
      res.render("users.ejs",{message});
    }
    catch(error){

      console.error("Error executing query: ",error.message);
      message = "User already exists with that username";
      res.render("users.ejs",{message});
    }
});

app.post('/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  try{

      message = "Logged in";
      res.render("website.ejs",{message});
  } 
    catch(error){
      console.error("Error executing query: ",error.message);
    }
})

app.get('/redirect', (req, res) => {

  message = "undefined";
  res.render("users.ejs",{message});
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
