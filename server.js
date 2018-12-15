const express = require('express') // самое первое - экспорт пакета экспресс

const app = express(); //создаем наш сервер, запуская экспресс

const bodyParser = require('body-parser');
//req.body.email - будет ошибка, мол body = undefined, чтобы получить доступ к телу запроса, нужен BODY-PARSER. Далее нужно воспользоваться промежуточным по, чтобы bodyParser можно было пользоваться.
app.use(bodyParser.json());

const cors = require('cors'); //чтобы можно было связать фронтэнд и бэкэнд, иначе хром ругается, что данные передуаются через http из неизвестного источника
app.use(cors());

const bcrypt = require('bcrypt-nodejs'); // шифрование пароля!!

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1',
    database : 'facedetector'
  }
});

app.get('/',(req,res)=>{
	res.send("inside the root");
	// res.send('signin'); - стандартный метод создания ответа
	// res.json('signin'); тоже отправка ответа, но уже в формате json, который предоставляет нам эксперсс, хоть с помощью send тоже можно отправялть json, но не так удобно! Плюс этот метод от экспресс предоставляет несколько удобных фич.
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{ //второй параметр (функция) - необязателен
	console.log(`server is running on port ${process.env.PORT}`);
})
// console.log(process.env);
// 
