// Simplificación de «document.querySelector» y «document.querySelectorAll»:
const elemento = _selector => document.querySelector(_selector),
	elementos = _selector => document.querySelectorAll( _selector );

// Los contenedores internos de la mayoría
// de las secciones:
const servicesContent = elemento("#services-content"),
	cardsContent = elemento("#cards-content"),
	aboutContent = elemento("#about-content");

// Plantillas:
const templateCards = elemento( "#template-cards" ),
	templateTitle = elemento( "#template-title" ),
	templateButtonTel = elemento( "#template-button-tel" );

// Función para insertar elementos del componentes en otro elemento:
const insertar = (__parentElement, ...elementosHTML ) => {
	if (__parentElement === undefined || !elementosHTML.length )
		return;

	if ( __parentElement == null )
		return;

	elementosHTML.forEach( elemento => {
		if ( elemento != null )
			__parentElement.append( elemento );

		console.log( typeof elemento )
	});

	return;
};

// Importar nodo:
const importNode = ( __componente ) => {
	return document.importNode( __componente, true );
};

const createTitle = ( _text ) => {
	if ( typeof _text !== "string" )
		return;

	const title = importNode( templateTitle.content );
	title.children[0].textContent = _text;
	
	return title;
};

const imagen = async (_elemento, _ruta) => {
	if ( typeof _ruta !== "string" )
		return;

	if ( _ruta.trim().length < 2 )
		return;

	const res = await fetch(_ruta),
		recurso = await res.text();

	_elemento.insertAdjacentHTML("beforeend", recurso);
}

// Con esta función combinada con la función «imagen( elemento, ruta )»
// hace posible que cualquier elemento que tenga el atributo [data-src]
// apuntando a una imagen vectorial se incorpore al documento:
const imagenSVG = () => {
	const iconos = elementos( "[data-src]" );

	if ( iconos.length > 0 )
		iconos.forEach(icono => {
			imagen( icono, icono.dataset.src );
		});

	console.log( iconos );
};

// Obtener datos de la plantilla
const cards = document.querySelector("#template-cards"),
	title = document.querySelector("#template-title"),
	buttonTel = document.querySelector("#template-button-tel");

// Implementar plantilla en: Services:
insertar( servicesContent,
	createTitle("Services"),
	importNode( templateCards ).content,
	importNode( buttonTel ).content );

// Implementar botón en About:
insertar( aboutContent, importNode( buttonTel ).content );

// Implementar imágenes vectoriales en los elementos con 
// el atributo [data-src]:
imagenSVG();