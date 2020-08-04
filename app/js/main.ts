const elemento = (_selector: string): any => {
	return document.querySelector(_selector) as HTMLElement;
};

const elementos = (_selector: string) => {
	return document.querySelectorAll(_selector);
};

// Los contenedores internos de la mayoría
// de las secciones:
const servicesContent = elemento("#services-content"),
	catalogsContent = elemento("#catalogs-content"),
	aboutContent = elemento("#about-content");

// Plantillas:
const templateCards = elemento("#template-cards"),
	templateTitle = elemento("#template-title"),
	templateButtonTel = elemento("#template-button-tel"),
	menuItem = elemento("#menu-item");

// Otros elementos:
const home = elemento("#home"),
	navigation = elemento("#navigation"),
	header = elemento("#header"),
	menuButton = elemento("#menu-button"),
	app = elemento( "#app" ) as HTMLElement;

const visitarSecciones = () => {
	const hrefs = elementos("[data-href]") as NodeListOf<HTMLElement>;

	if (hrefs.length > 0)
		hrefs.forEach(href => {
			href.addEventListener("click", function () {
				const _elemento = elemento(href.dataset.href);

				_elemento.scrollIntoView({
					behavior: 'smooth'
				});
			}, false);
		});
};

// Función para insertar elementos del componentes en otro elemento:
const insertar = (__parentElement: Element, ...elementosHTML: Element[] ) => {
	if ( typeof __parentElement === "undefined" || elementosHTML.length < 1 )
		return;

	if (__parentElement == null)
		return;

	elementosHTML.forEach(elemento => {
		if (elemento != null)
			__parentElement.append(elemento);
	});

	return;
};

// Importar nodo:
const importNode = (__componente: any): any  => {
	if ( typeof __componente === "undefined" || __componente === null )
		return null;

	return document.importNode(__componente, true);
};

// Función para insertar título a partir de la plantilla:
const createTitle = (_text: string) => {
	if (typeof _text !== "string")
		return;

	if ( templateTitle !== null ) {
		const title = importNode(templateTitle.content);
		title.children[0].textContent = _text;
	
		return title;
	}

};

// Leer y editar una hoja de estilos externa. Se 
// utilizan expresiones regulares:
const styles = ( _styles: string ) => {
	if (typeof _styles !== "string")
		return;

	let styles = document.styleSheets,
		evaluar = new RegExp(`(${_styles})`, "i"),
		cssRules: any;

	for (let valor in styles) {
		if (!isNaN(Number(valor)) || evaluar.test(styles[valor].href))
			cssRules = styles[valor].cssRules;
	}

	const panelDerecho = (_reglaCSS: any) => {
		if (typeof _reglaCSS === "undefined")
			return;

		let _panelDerecho = elemento(".portada__item--right"),
			width = (_panelDerecho !== null) ?_panelDerecho.clientWidth + "px" : 0;

		_reglaCSS.style.setProperty("--logo-derecha", width);
	};

	for (let regla of cssRules)
		if (regla.selectorText === ":root") {
			panelDerecho(regla);

			onresize = () => {
				panelDerecho(regla);
			}
			break;
		}
};

// Cargar imágenes vectoriales. El primer parámetro es 
// el elemento y el segundo la ruta de la imagen vectorial:
const imagen = async (_elemento: Element, _ruta: string) => {
	if (typeof _ruta !== "string")
		return;

	if (_ruta.trim().length < 2)
		return;

	const res = await fetch(_ruta),
		recurso = await res.text();

	_elemento.insertAdjacentHTML("beforeend", recurso);
	styles("style.css");
}

// Validar correo:
const isEmail = (_correo: string) => {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_correo);
};

const isSpan = (_isSpan: ChildNode) => {
	return Object.prototype.toString.call(_isSpan) === "[object HTMLSpanElement]";
};

// Crear mensaje:
const mensaje = (_selector: string, _mensaje: string) => {
	if (typeof _mensaje === "undefined")
		return;

	const _elemento = elemento(_selector),
		span = document.createElement("span");

	span.classList.add("warning", "desplegar");
	span.textContent = _mensaje;

	for (let _mensaje of _elemento.childNodes)
		if (isSpan(_mensaje))
			return;

	if (_elemento !== null)
		_elemento.appendChild(span);

	setTimeout(() => {
		span.classList.replace("desplegar", "plegar");

		span.onanimationend = () => {
			span.remove();
		}

	}, 5 * 1000);
};

// Cambiar de forma dinámica las clase en función de las 
// secciones en las que se encuentre el usuario:

const cambiarClases = (_claseA: string, _claseB: string, _claseC: string) => {
	if (typeof _claseA !== "string" || typeof _claseB !== "string" || typeof _claseC !== "string")
		return;

	if (header !== null && home !== null && navigation !== null) {
		if (scrollY >= home.offsetHeight - 50
			&& navigation.classList.contains(_claseA)
			&& !header.classList.contains(_claseC)) {

			navigation.classList.replace(_claseA, _claseB);
			header.classList.add(_claseC);

		} else if (scrollY <= home.offsetHeight - 50
			&& navigation.classList.contains(_claseB)
			&& header.classList.contains(_claseC)) {

			navigation.classList.replace(_claseB, _claseA);
			header.classList.remove(_claseC);

		}
	}
};

// Con esta función combinada con la función «imagen( elemento, ruta )»
// hace posible que cualquier elemento que tenga el atributo [data-src]
// apuntando a una imagen vectorial se incorpore al documento:
const imagenSVG = () => {
	const iconos = elementos("[data-src]") as NodeListOf<HTMLElement>;

	if (iconos.length > 0)
		iconos.forEach(icono => {
			imagen(icono, icono.dataset.src);
		});
};

// Verificar si es una lista:
const isList = (_isList: any) => {
	return Object.prototype.toString.call(_isList) === '[object HTMLLIElement]';
};

// Comprobar si el elemento que pasa como parámetro se trata de un enlace:
const isLink = (_isLink: any) => {
	return Object.prototype.toString.call(_isLink) === "[object HTMLAnchorElement]";
};

// Obtener datos de la plantilla
const cards = elemento("#template-cards"),
	title = elemento("#template-title"),
	buttonTel = elemento("#template-button-tel");

// Implementar plantilla en: Services:
let cardContent = (templateCards !== null) ? importNode(templateCards).content : null,
	buttont = (buttonTel !== null ) ? importNode(buttonTel).content : null;

if ( cardContent !== null && buttont !== null )
	insertar(servicesContent,
		createTitle("Services"),
		importNode(cardContent),
		importNode(buttont));

// Implementar botón en About:
if ( buttont !== null )
	insertar(aboutContent, importNode(buttont));

// Obtener los enlaces del menú:
const items = (_selector: string, _clase: string) => {
	if (typeof _selector !== "string" || typeof _clase !== "string")
		return;

	const _items = elementos(_selector);

	if (typeof _items.length === "number" && _items.length > 0)
		_items.forEach(elemento => {
			if (elemento.classList.contains(_clase))
				elemento.classList.remove(_clase);
		})
};


// Menú Modal:
const menuModal = () => {
	let modal: HTMLDivElement = document.createElement("div"),
		contentMenu: HTMLDivElement = document.createElement("div"),
		ul: HTMLUListElement = document.createElement("ul"),
		salir: HTMLButtonElement = document.createElement("button"),
		_menuItem: any = importNode(menuItem).content,
		existe: boolean = false;

	contentMenu.classList.add("menu-modal__item");
	ul.classList.add("menu-vertical");
	salir.classList.add("menu-salir");
	salir.textContent = "x";

	salir.onclick = () => {
		modal.remove();
	};

	ul.onclick = (e: Event) => {
		e.preventDefault();

		// Visitar la sección que apunta el enlace:
		let enlace = e.target as HTMLElement;
		if (isLink(enlace)) {
			let section = elemento(enlace.getAttribute("href")) as HTMLElement;

			if (section !== null)
				section.scrollIntoView({ behavior: 'smooth' });

			modal.remove();
		}
	}

	// Reemplazar clases:
	const reemplazar = (_elemento: Element, _selector: string, _claseA: string, _claseB: string) => {
		if (typeof _elemento === "undefined")
			return;

		if (typeof _claseA !== "string" ||
			typeof _claseB !== "string" ||
			typeof _selector !== "string"
		)
			return;

		let _elementos = _elemento.querySelectorAll(_selector);

		_elementos.forEach(__elemento => {
			__elemento.classList.replace(_claseA, _claseB);
		});
	};

	// Insertar elementos del menú en la ventana Modal:
	insertar(contentMenu, salir, ul);
	insertar(modal, contentMenu);

	if (menuItem !== null) {
		insertar(ul, _menuItem);

		reemplazar(ul, "a", "menu__enlace", "menu-vertical__enlace");
		reemplazar(ul, "li", "menu__item", "menu-vertical__item");
	}

	modal.classList.add("menu-modal", "menu-modal--show");

	let num: number = 0;
	const nodosHijos = app.childNodes as NodeListOf<HTMLElement>;

	nodosHijos.forEach( nodo => {
		let elemento: boolean = typeof nodo.classList !== "undefined" &&
		nodo.classList.contains("menu-modal--show");

		if (elemento) {
			num++;
			existe = true;
		}
	});

	// Comprobar si app no es nula y el nodo a insertar existe:
	if (app !== null && !existe)
		insertar(app, modal);
}

let menu = elemento( "#menu" );
if (typeof menu !== "undefined" && menu !== null)
	menu.onclick = (e: Event) => {
		let mElement = e.target as HTMLElement;
		if (!isList(mElement.parentNode))
			return;

		items("#menu li", "menu__item--selected");
		let mItem = mElement.parentNode as HTMLElement;
		mItem.classList.add("menu__item--selected");

		if (isLink(mElement)) {
			e.preventDefault();
			let _elemento = elemento(mElement.getAttribute("href"));

			if (_elemento !== null)
				_elemento.scrollIntoView({
					behavior: 'smooth'
				});
		}
	}

let form = elemento( "#form" ),
	email = elemento( "#email");

if (form !== null && email !== null) {
	console.log( "Se ejecuta" );

	form.onsubmit = (e: Event) => {
		if (!isEmail(email.value.trim())) {
			e.preventDefault();
			mensaje("#label-email", "Ingrese un correo válido");
		}
	}

}


// Visitar secciones en función de que un elemento tenga definido
// el atributo [data-href]:
visitarSecciones();

// Se requiere actualizar las clases de la barra de navegación
// y del elemento header en función de en qué sección se encuentre:
onscroll = () => {
	cambiarClases("navigation--home", "navigation--default", "header--default");
};

addEventListener("load", () => {
	cambiarClases("navigation--home", "navigation--default", "header--default");

	// Cargar menú de navegación:
	if (menuItem !== null && menu !== null)
		insertar(menu, importNode(menuItem).content);
});

// Menú de navegación:
if (menuButton !== null)
	menuButton.onclick = () => {
		menuModal();
	}

// Implementar imágenes vectoriales en los elementos con 
// el atributo [data-src]:
imagenSVG();