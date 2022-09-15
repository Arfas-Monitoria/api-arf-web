const form = document.querySelector(".form");
const nome = document.querySelector("#in_nome");
const email = document.querySelector("#in_email");
const telefone = document.querySelector("#in_telefone");
const assunto = document.querySelector("#in_assunto");
const mensagem = document.querySelector("#in_mensagem");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let data = {
		nome: nome.value,
		email: email.value,
		telefone: telefone.value,
		assunto: assunto.value,
		mensagem: mensagem.value,
	};

	let xhr = new XMLHttpRequest();

	xhr.open("post", "/enviarEmail");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = () => {
		console.log(xhr.responseText);

		if (xhr.responseText == "Sucesso!") {
			alert("Email Enviado!");
		} else {
			alert("Ocorreu um erro!");
		}
	};

	xhr.send(JSON.stringify(data));
});
