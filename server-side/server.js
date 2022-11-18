process.env.AMBIENTE_PROCESSO = "local_MYSQL";
process.env.AMBIENTE_PROCESSO = "local_SQL_SERVER";
process.env.AMBIENTE_PROCESSO = "producao";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + "/src/views/";
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORTA = 8080;

const app = express();
const corsConfig = {
	origin: `http://localhost:8080`,
};

app.use(express.json());
app.use(express.static(path));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

var usuarioRouter = require("./src/routes/usuarios");
var metricaRouter = require("./src/routes/metricas");

app.use("/usuarios", usuarioRouter);
app.use("/metricas", metricaRouter);

app.get("/", function (req, res) {
	res.render(path + "index.html");
});

// Nodemailer
app.post("/enviarEmail", (req, res) => {
	const nome = req.body.nome;
	const emailUser = req.body.email;
	const telefone = req.body.telefone;
	const assunto = req.body.assunto;
	const mensagem = req.body.mensagem;

	const emailArfas = process.env.EMAIL;

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: emailArfas,
			pass: process.env.PASS,
		},
	});

	const mailOptions = {
		from: emailUser,
		to: "arfasmonitoria@arfas.com",
		subject: `${assunto}`,
		html: `
		<h2><b>Mensagem de ${nome} - Assunto: ${assunto}</b></h2>
		<br>
		<h4>Email:</h4> ${emailUser} 
		<br>
		<h4>Telefone:</h4> ${telefone}
		<br>
		<h4>mensagem:</h4> 
		<p>${mensagem}</p>
		`,
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Email enviado com sucesso!");
			console.log(info);
			console.log("Email enviado!");
		}
	});
});

app.listen(PORTA, async function () {
	console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
