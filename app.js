const express = require('express');
const mssql = require('mssql');
const port = 3000;
const ipAddr = 'localhost';

const bcrypt = require('bcrypt');
const saltRounds = 3;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const dbConfig = {
    user: "admin", 
    password: "CruzAzul123",
    database: 'Debugger',
    server: 'sqlpruebas.c1lyopmrgrfq.us-east-1.rds.amazonaws.com',
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
  
app.post('/signup', async (req, res) => {
    try{
        const { USERNAME, EMAIL, PASSWORD, FECHA_NACIMIENTO, PAIS } = req.body;
        const usernameRegex = new RegExp (/^[a-zA-Z\s']+$/);
        const emailRegex = new RegExp (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const passwordRegex = new RegExp (/^[a-zA-Z\s']+$/);
        
        // try{
        //   if( USERNAME === "" ||   EMAIL === "" || PASSWORD  === "" || FECHA_NACIMIENTO === "" || PAIS === ""){
        //     return;
        //   }
        // }
        // catch(err){
        //   res.status(400).send("Todos los campos son obligatorios.");
        // }

        // if( USERNAME === "" ||   EMAIL === "" || PASSWORD  === "" || FECHA_NACIMIENTO === "" || PAIS === "") {
        //   res.status(400).send("Todos los campos son obligatorios.");
        // }

        // if (!nameRegex.test(USERNAME)) {
        //   res.status(400).send("El nombre de usuario no es válido.");
        //   return;
        // }

        // if (!emailRegex.test(EMAIL)) {
        //   res.status(400).send("La dirección de correo electrónico no es válida.");
        //   return;
        // }
        // if (!passwordRegex.test(PASSWORD)) {
        //   res.status(400).send("La contraseña no cumple con los requisitos mínimos.");
        //   return;
        // }

        const result = await mssql.query `
        INSERT INTO USUARIO(USERNAME,EMAIL,PASSWORD,FECHA_NACIMIENTO,PAIS)
        VALUES (${USERNAME},${EMAIL},${PASSWORD},${FECHA_NACIMIENTO},${PAIS})`;
        console.log(USERNAME, EMAIL, PASSWORD, FECHA_NACIMIENTO, PAIS);
        res.type('text').status(200).send(
        `Resource created`);
    } catch(err) {
        res.status(500).json(err);
    }
});


app.get('/juego', (req, res) => {
  res.type('text').status(200).send('Bienvenido!');
});


app.post('/signin3', async (req, res) => {
    try{
        const { username, password } = req.body;
        const result = (await mssql.query `
        SELECT * FROM USUARIO WHERE username = ${username} AND password = ${password}`).recordset;
        const row = result[0];
        console.log(row);
        if(row){
          res.type('text').status(200).send('usuario valido!');
        } else{
          res.type('text').status(401).send(
            `Usuario no valido`);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post('/signinadmin', async (req, res) => {
  try{
      const { correo, password } = req.body;
      const result = (await mssql.query `
      SELECT * FROM administrador WHERE correo = ${correo} AND password = ${password}`).recordset;
      const row = result[0];
      console.log(row);
      if(row){
        res.type('text').status(200).send('usuario valido!');
      } else{
        res.type('text').status(401).send(
          `Usuario no valido`);
      }
  } catch(err) {
      res.status(500).json(err);
  }
});

app.post('/datosjuego', async (req, res) => {
  try{
    const { nombre, puntos } = req.body;
    const result = await mssql.query `
    INSERT INTO pruebaConexion(nombre,puntos)
    VALUES (${nombre},${puntos})`;
    console.log(nombre,puntos);
    res.type('text').status(200).send(
    `Resource created`);
} catch(err) {
    res.status(500).json(err);
}
});

// app.post('/datosjuego', function (req, res)  {
//     console.log(req.body);
//     console.log(req.body.nombre);
//     console.log(req.body.puntos);
//     res.send("hola, estas en /login2")
// });

// if(nombre === "" || username === "" ||   fechaNacimiento === "" || pais  === "" || correo === "" || password === "") {
//     res.status(400).json({
//         message: "Please fill all fields"
//     });
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// if (!emailRegex.test(email)) {
//   res.status(400).json({ message: "Provide a valid email address." });
//   return;
// }

// const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//   if (!passwordRegex.test(password)) {
//     res.status(400).json({
//       message:
//         "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
//     });
//     return;
//   }

// // Check the users collection if a user with the same email already exists
// User.findOne({ email })
// .then((foundUser) => {
//     // If the user with the same email already exists, send an error response
//     if (foundUser) {
//       res.status(400).json({ message: "User already exists." });
//       return;
//     }

//     // If email is unique, proceed to hash the password
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     // Create the new user in the database
//     // We return a pending promise, which allows us to chain another `then`
//     return User.create({ email, password: hashedPassword, name });
//   })

// custom 404 page
app.use((req, res) => {
    res.type('text/plain').status(404).send('404 - Not Found');
  });
  
// app.listen(port, () => console.log(
//   `Express started on http://${ipAddr}:${port}`
//   + '\nPress Ctrl-C to terminate.'
//   ));



    