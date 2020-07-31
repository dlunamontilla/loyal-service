var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const elemento = (_selector) => {
    return document.querySelector(_selector);
};
const elementos = (_selector) => {
    return document.querySelectorAll(_selector);
};
const servicesContent = elemento("#services-content"), catalogsContent = elemento("#catalogs-content"), aboutContent = elemento("#about-content");
const templateCards = elemento("#template-cards"), templateTitle = elemento("#template-title"), templateButtonTel = elemento("#template-button-tel"), menuItem = elemento("#menu-item");
const home = elemento("#home"), navigation = elemento("#navigation"), header = elemento("#header"), menuButton = elemento("#menu-button"), app = elemento("#app");
const visitarSecciones = () => {
    const hrefs = elementos("[data-href]");
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
const insertar = (__parentElement, ...elementosHTML) => {
    if (typeof __parentElement === "undefined" || elementosHTML.length < 1)
        return;
    if (__parentElement == null)
        return;
    elementosHTML.forEach(elemento => {
        if (elemento != null)
            __parentElement.append(elemento);
    });
    return;
};
const importNode = (__componente) => {
    return document.importNode(__componente, true);
};
const createTitle = (_text) => {
    if (typeof _text !== "string")
        return;
    const title = importNode(templateTitle.content);
    title.children[0].textContent = _text;
    return title;
};
const styles = (_styles) => {
    if (typeof _styles !== "string")
        return;
    let styles = document.styleSheets, evaluar = new RegExp(`(${_styles})`, "i"), cssRules;
    for (let valor in styles) {
        if (!isNaN(Number(valor)) || evaluar.test(styles[valor].href))
            cssRules = styles[valor].cssRules;
    }
    const panelDerecho = (_reglaCSS) => {
        if (typeof _reglaCSS === "undefined")
            return;
        let _panelDerecho = elemento(".portada__item--right"), width = _panelDerecho.clientWidth + "px";
        _reglaCSS.style.setProperty("--logo-derecha", width);
    };
    for (let regla of cssRules)
        if (regla.selectorText === ":root") {
            panelDerecho(regla);
            onresize = () => {
                panelDerecho(regla);
            };
            break;
        }
};
const imagen = (_elemento, _ruta) => __awaiter(this, void 0, void 0, function* () {
    if (typeof _ruta !== "string")
        return;
    if (_ruta.trim().length < 2)
        return;
    const res = yield fetch(_ruta), recurso = yield res.text();
    _elemento.insertAdjacentHTML("beforeend", recurso);
    styles("style.css");
});
const isEmail = (_correo) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_correo);
};
const isSpan = (_isSpan) => {
    return Object.prototype.toString.call(_isSpan) === "[object HTMLSpanElement]";
};
const mensaje = (_selector, _mensaje) => {
    if (typeof _mensaje === "undefined")
        return;
    const _elemento = elemento(_selector), span = document.createElement("span");
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
        };
    }, 5 * 1000);
};
const cambiarClases = (_claseA, _claseB, _claseC) => {
    if (typeof _claseA !== "string" || typeof _claseB !== "string" || typeof _claseC !== "string")
        return;
    if (header !== null && home !== null && navigation !== null) {
        if (scrollY >= home.offsetHeight - 50
            && navigation.classList.contains(_claseA)
            && !header.classList.contains(_claseC)) {
            navigation.classList.replace(_claseA, _claseB);
            header.classList.add(_claseC);
        }
        else if (scrollY <= home.offsetHeight - 50
            && navigation.classList.contains(_claseB)
            && header.classList.contains(_claseC)) {
            navigation.classList.replace(_claseB, _claseA);
            header.classList.remove(_claseC);
        }
    }
};
const imagenSVG = () => {
    const iconos = elementos("[data-src]");
    if (iconos.length > 0)
        iconos.forEach(icono => {
            imagen(icono, icono.dataset.src);
        });
};
const isList = (_isList) => {
    return Object.prototype.toString.call(_isList) === '[object HTMLLIElement]';
};
const isLink = (_isLink) => {
    return Object.prototype.toString.call(_isLink) === "[object HTMLAnchorElement]";
};
const cards = elemento("#template-cards"), title = elemento("#template-title"), buttonTel = elemento("#template-button-tel");
insertar(servicesContent, createTitle("Services"), importNode(templateCards).content, importNode(buttonTel).content);
insertar(aboutContent, importNode(buttonTel).content);
const items = (_selector, _clase) => {
    if (typeof _selector !== "string" || typeof _clase !== "string")
        return;
    const _items = elementos(_selector);
    if (typeof _items.length === "number" && _items.length > 0)
        _items.forEach(elemento => {
            if (elemento.classList.contains(_clase))
                elemento.classList.remove(_clase);
        });
};
const menuModal = () => {
    let modal = document.createElement("div"), contentMenu = document.createElement("div"), ul = document.createElement("ul"), salir = document.createElement("button"), _menuItem = importNode(menuItem).content, existe = false;
    contentMenu.classList.add("menu-modal__item");
    ul.classList.add("menu-vertical");
    salir.classList.add("menu-salir");
    salir.textContent = "x";
    salir.onclick = () => {
        modal.remove();
    };
    ul.onclick = (e) => {
        e.preventDefault();
        let enlace = e.target;
        if (isLink(enlace)) {
            let section = elemento(enlace.getAttribute("href"));
            if (section !== null)
                section.scrollIntoView({ behavior: 'smooth' });
            modal.remove();
        }
    };
    const reemplazar = (_elemento, _selector, _claseA, _claseB) => {
        if (typeof _elemento === "undefined")
            return;
        if (typeof _claseA !== "string" ||
            typeof _claseB !== "string" ||
            typeof _selector !== "string")
            return;
        let _elementos = _elemento.querySelectorAll(_selector);
        _elementos.forEach(__elemento => {
            __elemento.classList.replace(_claseA, _claseB);
        });
    };
    insertar(contentMenu, salir, ul);
    insertar(modal, contentMenu);
    if (menuItem !== null) {
        insertar(ul, _menuItem);
        reemplazar(ul, "a", "menu__enlace", "menu-vertical__enlace");
        reemplazar(ul, "li", "menu__item", "menu-vertical__item");
    }
    modal.classList.add("menu-modal", "menu-modal--show");
    let num = 0;
    const nodosHijos = app.childNodes;
    nodosHijos.forEach(nodo => {
        let elemento = typeof nodo.classList !== "undefined" &&
            nodo.classList.contains("menu-modal--show");
        if (elemento) {
            num++;
            existe = true;
        }
    });
    if (app !== null && !existe)
        insertar(app, modal);
};
let menu = elemento("#menu");
if (typeof menu !== "undefined" || menu !== null)
    menu.onclick = (e) => {
        let mElement = e.target;
        if (!isList(mElement.parentNode))
            return;
        items("#menu li", "menu__item--selected");
        let mItem = mElement.parentNode;
        mItem.classList.add("menu__item--selected");
        if (isLink(mElement)) {
            e.preventDefault();
            let _elemento = elemento(mElement.getAttribute("href"));
            if (_elemento !== null)
                _elemento.scrollIntoView({
                    behavior: 'smooth'
                });
        }
    };
let form = elemento("#form"), email = elemento("#email");
if (form !== null && email !== null) {
    console.log("Se ejecuta");
    form.onsubmit = (e) => {
        if (!isEmail(email.value.trim())) {
            e.preventDefault();
            mensaje("#label-email", "Ingrese un correo válido");
        }
    };
}
visitarSecciones();
onscroll = () => {
    cambiarClases("navigation--home", "navigation--default", "header--default");
};
addEventListener("load", () => {
    cambiarClases("navigation--home", "navigation--default", "header--default");
    if (menuItem !== null && menu !== null)
        insertar(menu, importNode(menuItem).content);
});
if (menuButton !== null)
    menuButton.onclick = () => {
        menuModal();
    };
imagenSVG();
