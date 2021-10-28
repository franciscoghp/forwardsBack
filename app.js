// 1 - Invocamos a Express
const express = require('express');
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

//4 -seteamos el directorio de assets
// app.use('/resources',express.static('public'));
// app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
// app.set('view engine','ejs');

//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');

//9 - establecemos las rutas
	// app.get('/login',(req, res)=>{
	// 	res.render('login');
	// })

	// app.get('/register',(req, res)=>{
	// 	res.render('register');
	// })

//10 - Método para la REGISTRACIÓN
// app.post('/register', async (req, res)=>{
// 	const user = req.body.user;
// 	const name = req.body.name;
//     const rol = req.body.rol;
// 	const pass = req.body.pass;
// 	let passwordHash = await bcrypt.hash(pass, 8);
//     connection.query('INSERT INTO users SET ?',{user:user, name:name, rol:rol, pass:passwordHash}, async (error, results)=>{
//         if(error){
//             console.log(error);
//         }else{            
// 			res.render('register', {
// 				alert: true,
// 				alertTitle: "Registration",
// 				alertMessage: "¡Successful Registration!",
// 				alertIcon:'success',
// 				showConfirmButton: false,
// 				timer: 1500,
// 				ruta: ''
// 			});
//             //res.redirect('/');         
//         }
// 	});
// })



//11 - Metodo para la autenticacion


//12 - Método para controlar que está auth en todas las páginas
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});


//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

// const PORT = process.env.PORT || 3000
// app.listen(PORT, ()=>{
//     console.log('SERVER RUNNING IN PORT:', PORT);
// });


// require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();