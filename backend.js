import express from "express";            // using modern ES6 syntax here so it's "import from" instead of require

import pkg from 'pg';
const { Pool } = pkg;

// Configure the connection to your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'horsetakeL',
  port: 5432, // Default PostgreSQL port
});

const app = express();
const port = 3000;
app.use(express.static('public'));

app.use(express.json());        // default middleware provided by express no need to import body parser since dealing with json files
app.use(express.urlencoded({ extended: true }));


// ALL VARIABLES

let message = "undefined"
var user = "notloggedin"
var coin = -1

//


app.get('/', (req, res) => {

  res.render("website.ejs");

});

app.get('/display_leaderboard', async (req, res) => {

  try {

    const result = await pool.query('SELECT username,country,coins FROM accounts ORDER BY coins DESC')
    res.json(result.rows)

  }
  catch (error) {

    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');

  }
});

app.post('/signup', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const country = req.body.country;

    try{

      await pool.query('INSERT INTO accounts (username, password, country) VALUES ($1, $2, $3)',[username, password, country])
      message = "Sucessfully logged in"
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

    const result = await pool.query('SELECT * FROM accounts WHERE username = $1 AND password = $2',[username, password]);

    if(result.rowCount == 1){

      message = "Logged In";
      user = username
      const queryx = await pool.query('SELECT coins FROM accounts WHERE username = $1',[user]);

      coin = queryx.rows[0].coins
      res.render("website.ejs")
    }
    else{

      message = "User does not exist or incorrect password";
      res.render("users.ejs",{message});

    }
  }
    catch(error){
      console.error("Error executing query: ",error.message);
    }
})

app.get('/ac_coins', (req, res) => {
  
    res.json({ user: user,
              coin: coin
    });

})

app.get('/updatecoins', async (req,res) => {

  try{

    await pool.query('UPDATE accounts SET coins = coins + 1 WHERE username = $1;',[user]);
    res.sendStatus(200)

  }
  catch(error){
    console.error("Error executing query: ",error.message);
  }
  
})

function resetUser() {

      user = "notloggedin";
}

const interval = setInterval(resetUser, 2 * 60 * 1000);

setTimeout(() => {
    clearInterval(interval); 
}, 24 * 60 * 60 * 1000); 

app.get('/redirect', (req, res) => {

  message = "undefined";
  res.render("users.ejs",{message});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});