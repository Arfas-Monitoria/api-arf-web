const graficoLine = document.querySelector(".grafico p:first-of-type");
const graficoBar = document.querySelector(".grafico p:last-of-type");
const lista = document.querySelector(".lista-container");

function filtrar(exibirIndividual) {
	graficoBar.style.display = "none";
	graficoLine.style.display = "none";
	lista.style.display = "none";
	periodo_container.style.display = "none";
	metrica_container.style.display = "none";

	if (exibicao.value == "grafica" || exibirIndividual) {
		periodo_container.style.display = "flex";
		metrica_container.style.display = "flex";
		exibicao.value = "grafica";

		switch (periodo.value) {
			case "tempo_real":
				graficoLine.style.display = "flex";
				break;
			case "media_diaria":
				graficoBar.style.display = "flex";
				break;
		}
	} else {
		lista.style.display = "flex";
	}
}
