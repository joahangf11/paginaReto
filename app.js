const express = require('express');
const mssql = require('mssql');
const port = 8080;
const ipAddr = '34.226.97.249';

const bcrypt = require('bcrypt');
const saltRounds = 3;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const dbConfig = {
    user: process.env.MSSQL_USER, 
    password: process.env.MSSQL_PASSWORD,
    database: 'web_database',
    server: 'localhost',
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
    options: { trustServerCertificate: true }
  };
  
  async function connectDb() {
    try {
      await mssql.connect(dbConfig);
      console.log('Connected to the database.');
    } catch (err) {
      console.error('Unable to connect to the database.');
      throw err;
    }
  }

  connectDb();
  
  app.post('/signin', async (req, res) => {
    try{
        const { nombre, username, fechaNacimiento, pais, correo, password } = req.body;
        console.log(nombre, username, fechaNacimiento, pais, correo, password);
    res.type('text').status(200).send(
        `Resource created`);
    } catch(err) {
        res.status(500).json(err);
    }
});

if(nombre === "" || username === "" ||   fechaNacimiento === "" || pais  === "" || correo === "" || password === "") {
    res.status(400).json({
        message: "Please fill all fields"
    });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!emailRegex.test(email)) {
  res.status(400).json({ message: "Provide a valid email address." });
  return;
}

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

// Check the users collection if a user with the same email already exists
User.findOne({ email })
.then((foundUser) => {
    // If the user with the same email already exists, send an error response
    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    // We return a pending promise, which allows us to chain another `then`
    return User.create({ email, password: hashedPassword, name });
  })
