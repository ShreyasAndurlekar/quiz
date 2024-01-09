import express from "express";            // using modern ES6 syntax here so it's "import from" instead of require
import pg from "pg"

const app = express();
const port = 3000;
app.use(express.static('public'));   

app.use(express.json());        // default middleware provided by express no need to import body parser since dealing with json files
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.render("website.ejs");

});

var messagex = "undefined";

const db = new pg.Client({

  user: 'postgres',
  host: 'localhost',
  password: '*******',
  database: 'leaderboard',
  port: 5432  

});

db.connect();

app.get('/display_leaderboard', async (req, res) => {

  try {

    const result = await db.query('SELECT username,country,coins FROM users ORDER BY coins DESC');
    res.json(result.rows);

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

      await db.query('INSERT INTO users VALUES ($1, $2, $3)',[username, password, country]);
      messagex = "undefined";
      res.render("users.ejs",{messagex});
    }
    catch(error){

      console.error("Error executing query: ",error.message);
      messagex = "User already exists with that username";
      res.render("users.ejs",{messagex});
    }
});

app.post('/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  try{

    const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2',[username, password]);
    if(result.rowCount == 1){

      messagex = "undefined";
      res.render("website.ejs",{messagex});
    }
      
    else{

      messagex = "User does not exist or incorrect password";
      res.render("users.ejs",{messagex});

    }
    
  }
  catch(error){

    
    console.error("Error executing query: ",error.message);
  }
})

app.get('/redirect', (req, res) => {

  messagex = "undefined";
  res.render("users.ejs",{messagex});
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
