process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

const PORTA = 3030;

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

// Nodemailer
app.post("/enviarEmail", (req, res) => {
	const email = process.env.EMAIL;

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: email,
			pass: process.env.PASS,
		},
	});

	const handlebarOptions = {
		viewEngine: {
			extName: ".html",
			partialsDir: path.resolve("./views"),
			defaultLayout: false,
		},
		viewPath: path.resolve("./views"),
		extName: ".handlebars",
	};

	transporter.use("compile", hbs(handlebarOptions));

	const mailOptions = {
		from: email,
		to: email,
		subject: `Mensagem de ${req.body.email} - assunto: ${req.body.assunto}`,
		text: req.body.mensagem,
		template: "emailTemplate",
		context: {
			nome: req.body.nome,
			email: req.body.email,
			telefone: req.body.telefone,
			assunto: req.body.assunto,
			mensagem: req.body.mensagem,
		},
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email enviado!");
			res.send("Sucesso!");
		}
	});
});

app.listen(PORTA, function () {
	console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
