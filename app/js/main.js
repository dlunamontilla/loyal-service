// Simplificación de «document.querySelector» y «document.querySelectorAll»:
const elemento = _selector => document.querySelector(_selector),
	elementos = _selector => document.querySelectorAll( _selector );

// Los contenedores internos de la mayoría
// de las secciones:
const servicesContent = elemento("#services-content"),
	catalogsContent = elemento("#catalogs-content"),
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

// Validar correo:
const isEmail = ( _correo ) => {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( _correo );
}

// Crear mensaje:
const mensaje = ( _selector, _mensaje ) => {
	if ( typeof _mensaje === "undefined" )
		return;

	const _elemento = elemento( _selector ),
		span = document.createElement( "span" );

	span.classList.add( "warning", "fadeIn" );
	span.textContent = _mensaje;

	if ( _elemento !== null )
		_elemento.append( span );

	setTimeout(() => {
		span.classList.replace( "fadeIn", "fadeOut" );

		span.onanimationend = function() {
			this.remove();
		}

	}, 5 * 1000 );
};

// Con esta función combinada con la función «imagen( elemento, ruta )»
// hace posible que cualquier elemento que tenga el atributo [data-src]
// apuntando a una imagen vectorial se incorpore al documento:
const imagenSVG = () => {
	const iconos = elementos( "[data-src]" );

	if ( iconos.length > 0 )
		iconos.forEach(icono => {
			imagen( icono, icono.dataset.src );
		});
};


// Verificar si es una lista:
const isList = ( _isList ) => {
	return Object.prototype.toString.call( _isList ) === '[object HTMLLIElement]';
};

// Obtener datos de la plantilla
const cards = elemento("#template-cards"),
	title = elemento("#template-title"),
	buttonTel = elemento("#template-button-tel");

// Implementar plantilla en: Services:
insertar( servicesContent,
	createTitle("Services"),
	importNode( templateCards ).content,
	importNode( buttonTel ).content );

// Implementar botón en About:
insertar( aboutContent, importNode( buttonTel ).content );

// Obtener los enlaces del menú:
const items = ( _selector, _clase ) => {
	if ( typeof _selector !== "string" || typeof _clase !== "string" )
		return;

	const _items = elementos( _selector );

	if ( typeof _items.length === "number" && _items.length > 0 )
		_items.forEach( elemento => {
			if ( elemento.classList.contains( _clase ) )
				elemento.classList.remove( _clase );
		})
};

if ( typeof menu !== "undefined" || menu !== null )
	menu.onclick = (e) => {
		if ( ! isList( e.target.parentNode ) )
			return;

		items( "#menu li", "menu__item--selected" );
		e.target.parentNode.classList.add( "menu__item--selected" );
	}

if ( typeof form !== "undefined" || typeof email !== "undefined" )
	form.onsubmit = (e) => {
		if ( !isEmail( email.value.trim() )) {
			e.preventDefault();
			mensaje( "#label-email", "Richard Arandia" );
		}
	}


// onscroll = (e) => {
// 	console.clear();
// 	console.log( scrollY );

// 	console.log( "Posición =>", about.offsetTop, "=>", about );
// };

// Implementar imágenes vectoriales en los elementos con 
// el atributo [data-src]:
imagenSVG();