(function () {
	const imagen = async (_elemento, _ruta) => {
		const res = await fetch(_ruta),
			recurso = await res.text();
		_elemento.insertAdjacentHTML("beforeend", recurso);
	}

	const ruta = "multimedia/imagen/loyal-services-logo.svg",
		logo = document.querySelector("#logotipo");

	if (logo !== null)
		imagen(logo, ruta);

	// Obtener datos de la plantilla
	const cards = document.querySelector("#template-cards"),
		title = document.querySelector("#template-title"),
		buttonTel = document.querySelector("#template-button-tel");

	// Obtener Secciones:
	const servicesContent = document.querySelector("#services-content");


	// Implementar plantilla en: Services:
	const servicesTitle = title.cloneNode(true),
		servicesCards = cards.cloneNode(true);

	servicesTitle.textContent = "Services";
	servicesContent.append(servicesTitle.content, servicesCards.content, buttonTel.cloneNode(true).content);

	const iconos = document.querySelectorAll("[data-src]");

	if ( iconos.length > 0 )
		iconos.forEach((icono) => {
			imagen( icono, icono.dataset.src );
		});
}())