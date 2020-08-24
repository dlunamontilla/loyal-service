const agregarCero = (numero) => {
  if (typeof numero !== "number")
    return;

  return (numero < 10) ? `0${numero}` : `${numero}`;
};

// Obtener Fecha:
var obtenerFecha = function obtenerFecha() {
  const fecha = new Date();

  return {
    dia: fecha.getDate(),
    mes: fecha.getMonth() + 1,
    anno: fecha.getFullYear()
  }
};

// Informar al usuario sobre las acciones realizadas:
var informar = function informar(_dia, _info, opciones) {
  if (typeof _dia === "undefined" || typeof _info === "undefined")
    return;

  if (typeof _dia.dataset.dia === "undefined")
    return;

  if (_info !== null) {
    if (typeof opciones.tipo !== "undefined")
      _info.setAttribute("class", `info info--${opciones.tipo}`);

    if (typeof opciones.mensaje !== "undefined")
      _info.textContent = opciones.mensaje;
  }
};

var seleccionarMes = function seleccionarMes(_mes) {
  if (typeof _mes === "undefined")
    return;

  // Instanciar la clase Date():
  let fecha = new Date();

  const opciones = [];
  const nodoOpciones = _mes.querySelectorAll("option");

  nodoOpciones.forEach(opcion => {
    opciones.push(opcion);
  });

  let mesActual = obtenerFecha().mes;

  for (let opcion of opciones) {
    if (opcion.value == mesActual) {
      opcion.selected = true;
    }
  }
};

var enviarFormulario = function enviarFormulario(_ruta, _form) {
  if (typeof _ruta === "undefined" || typeof _form === "undefined")
    return;

  const form = elemento(_form);

  if (form === null)
    return;

  var formData = new FormData();

  for (let elemento of form) {
    let incluir = elemento.getAttribute("data-include");
    let google = elemento.getAttribute("name") === "g-recaptcha-response";

    if (incluir !== null || google) {
      formData.append(`${elemento.getAttribute("name")}`, `${elemento.value}`);
    }
  }

  fetch(_ruta, {
    method: 'POST',
    body: formData
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (json) {
      // console.log("json =>", json);

      let informarReserva = elemento("#informar-reserva");

      if ( informarReserva !== null ) {
        informarReserva.textContent = json.info;

        if ( json.status === true ) {
          informarReserva.setAttribute("class", "info info--success");

          let salir = elemento("[data-action='salir']");
          // data-action="salir"
          setTimeout(function() {
            if ( salir !== null )
              salir.click();
          }, 3000);
        }else {
          informarReserva.setAttribute("class", "info info--warning");
        }
      }
    })
    .catch(function(error) {
      console.log( error );
    });
};

var marcarDia = function marcarSeleccion(_elementos, opciones) {
  if (typeof _elementos === "undefined")
    return;

  if (typeof _elementos.length === "undefined" || _elementos.length < 1)
    return;

  const nodos = [];

  for (let item of _elementos) {
    nodos.push(item);
  }

  if (typeof opciones.clase !== "undefined") {
    for (let nodo of nodos) {
      if (typeof nodo.classList !== "undefined")
        nodo.classList.remove(opciones.clase);
    }

    if (typeof opciones.dia !== "undefined") {
      let dia = parseInt(opciones.dia) - 1;

      if (typeof nodos[dia].classList !== "undefined")
        nodos[dia].classList.add(opciones.clase);
    }
  }
};

var formatearFecha = function formatearFecha( fecha ) {
  if ( typeof fecha === "undefined" )
    return;

  // meses
  const meses = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Elementos Fechas:
  let _elementos = fecha.split("-");

  let anno = _elementos[0],
    mes = _elementos[1],
    dia = _elementos[2];
  
  mes--;

  return `${meses[mes]} ${dia}, ${anno}`;
}

// Calendario:
const calendario = (_ruta, _main) => {
  if (typeof _ruta !== "string" || typeof _main !== "string")
    return;

  const main = elemento(_main);
  if (main === null)
    return;

  // Obtener datos de la plantilla si existe:
  const plantilla = elemento("#template-calendar");
  if (plantilla === null)
    return;

  // Imcorporar elementos:
  const modalCalendar = importNode(plantilla).content;

  // Observar cambios en el DOM:
  var observar = new MutationObserver(function (mutaciones) {
    mutaciones.forEach(function (mutacion) {
      if (mutacion.type === "childList")
        completarCalendario(_ruta);
    });
  });

  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  observar.observe(main, config);
  main.append(modalCalendar);

  // Completar calendario:
  const completarCalendario = (ruta) => {
    const calendario = main.querySelector("#modal-calendar");
    if (calendario === null)
      return;

    // Obtener el contenedor de los días:
    const mes = elemento("#mes");
    const meses = elemento("#meses");

    // Crear elementos:
    let dias = document.createElement("div"),
      diasItem = document.createElement("div"),
      semanaItem = document.createElement("div");

    // Establecer atributos:
    dias.setAttribute("class", "dias");
    diasItem.setAttribute("class", "dias__item");
    semanaItem.setAttribute("class", "dias__semana");

    // Obtener días en función del mes seleccionado:
    const obtenerDias = (_ruta) => {
      if (typeof _ruta === "undefined")
        return;

      // Leer los datos del servidor:
      fetch(_ruta)
        .then(function (respuesta) {
          return respuesta.json();
        })
        .then(function (data) {
          if (mes === null)
            return;

          let nDias, nDiasItem, nSemanaItem;

          mes.innerHTML = "";
          for (let item of data) {
            nDias = importNode(dias);
            nDiasItem = importNode(diasItem);
            nSemanaItem = importNode(semanaItem);

            nDias.setAttribute("data-dia", item.dia);
            nDiasItem.textContent = item.dia;
            nSemanaItem.textContent = item.diaSemana;

            if (item.diaSemana === "Sat") {
              nSemanaItem.classList.add("dias__semana--sabado");
            }

            if (item.diaSemana === "Sun") {
              nSemanaItem.classList.add("dias__semana--domingo");
            }

            // Seleccionar el día actual:
            if (item.mes === obtenerFecha().mes && item.dia === obtenerFecha().dia) {
              nDias.classList.add("dias--actual");
            }

            // Marcar los días anteriores a la fecha actual:
            if (
              (item.mes === obtenerFecha().mes && item.dia < obtenerFecha().dia) ||
              item.mes < obtenerFecha().mes
            ) {
              nDias.classList.add("dias--anteriores");
            }

            // Marcar los días reservados:
            if (!item.disponible) {
              nDias.classList.remove("dias--anteriores");
              nDias.classList.add("dias--reservados");

              nDias.setAttribute("title", "Reserved Day");
            }

            nDias.append(nSemanaItem, nDiasItem);

            mes.append(nDias);
          }
        });
    }

    obtenerDias(ruta);

    // Seleccionar un mes del calendario:
    if (meses !== null && mes !== null) {
      seleccionarMes(meses);

      meses.onchange = function () {
        obtenerDias(`./app/ajax/?calendario&mes=${this.value}`);
      }
    }

    const fechaSeleccionada = elemento("#fechaSeleccionada"),
      formCalendario = elemento("#form-calendar");

    if (formCalendario !== null)
      formCalendario.onsubmit = function (e) {
        e.preventDefault();

        if (fechaSeleccionada.value === "") {
          alert("You must select a date before continuing");
          return;
        }

        let confirmar = confirm(`Do you want to save the date: ${formatearFecha( fechaSeleccionada.value )}?`);
        if (confirmar) {
          enviarFormulario("app/ajax/", "#form-calendar");
        }
      };

    // Cerrar la ventana calendario:
    calendario.onclick = function (e) {
      let salir = e.target;

      if (typeof salir.dataset.action !== "undefined") {
        const body = elemento("body");

        // Remover el atributo style al cerrar la ventana modal:
        if (body !== null) {
          body.removeAttribute("style");
        }

        // Remover la ventana modal al presionar el botón 
        // de cerrar:
        this.remove();
      }

      // Valor por defecto del elemento día:
      let dia = null;

      if (
        e.target.classList.contains("dias__item") ||
        e.target.classList.contains("dias__semana")
      ) {
        dia = e.target.parentNode;
      }

      if (typeof e.target.dataset.dia !== "undefined") {
        dia = e.target;
      }

      // Cuando el usuario seleccione una fecha se marcará esa fecha en el input hidden
      if (dia !== null) {
        if (meses === null)
          return;

        // Preparando formato de fecha para enviarlas al servidor:
        let fdia = agregarCero(parseInt(dia.dataset.dia)),
          fmes = agregarCero(parseInt(meses.value)),
          anno = obtenerFecha().anno;

        // Elemento para informar al usuario del tipo de selección que ha hecho:
        let info = elemento("#informacion");

        // Informar al usuario:
        if (dia.classList.contains("dias--anteriores"))
          informar(dia, info, {
            tipo: "warning",
            mensaje: "Choose a date greater than the current date"
          });

        if (dia.classList.contains("dias--reservados"))
          informar(dia, info, {
            tipo: "warning",
            mensaje: "Reserved by another user"
          });

        if (dia.classList.contains("dias--actual"))
          informar(dia, info, {
            tipo: "warning",
            mensaje: "This day cannot be reserved"
          })

        if (
          !dia.classList.contains("dias--anteriores") &&
          !dia.classList.contains("dias--reservados") &&
          !dia.classList.contains("dias--actual")
        ) {
          informar(dia, info, {
            tipo: "success",
            mensaje: "Valid date selected"
          });

          marcarDia(mes.childNodes, {
            dia: dia.dataset.dia,
            clase: "dias--seleccionado"
          });

          // Obteniendo el elemento input hidden para agregarle información
          // de la fecha seleccionada por el usuario para su posterior envío al
          // servidor:
          if (fechaSeleccionada !== null)
            fechaSeleccionada.setAttribute("value", `${anno}-${fmes}-${fdia}`);
        }
      }

    };

  }
};

// Acerca de:
const about = (_ruta) => {
  if (typeof _ruta !== "string") {
    return;
  }

  fetch(_ruta)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (json) {
      const mission = elemento("#get-mission"),
        vision = elemento("#get-vision");

      if (mission === null || vision === null)
        return;

      const
        pMision = document.createElement("p"),
        pVision = document.createElement("p");

      let
        tMision = json.mision,
        tVision = json.vision;

      // Eliminar retorno de carro:
      tMision = tMision.replace(/\r/g, "");
      tVision = tVision.replace(/\r/g, "");

      // Convertir el texto en un array:
      tMision = tMision.split("\n\n");
      tVision = tVision.split("\n\n");

      for (let texto of tMision) {
        let parrafo = importNode(pMision);
        parrafo.textContent = texto;
        mission.append(parrafo);
      }

      for (let texto of tVision) {
        let parrafo = importNode(pVision);
        parrafo.textContent = texto;
        vision.append(parrafo);
      }
    });
};

// Catálogos:
const catalogs = (_ruta, _selector) => {
  if (
    typeof _ruta !== "string" ||
    typeof _selector !== "string"
  ) {
    return;
  }

  const catalogo = elemento(_selector);
  if (catalogo === null)
    return;


  fetch(_ruta)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (json) {
      const grid = document.createElement("div"),
        gridItem = document.createElement("a"),
        gridImagen = document.createElement("div"),
        imagen = document.createElement("img"),
        gridCaption = document.createElement("div");

      grid.classList.add("grid-catalogs");
      gridItem.classList.add("grid-catalogs__item");
      gridImagen.classList.add("grid-catalogs__imagen");
      gridCaption.classList.add("grid-catalogs__caption");

      for (let item of json) {
        let nImagen = importNode(imagen),
          nGridItem = importNode(gridItem),
          nGridImagen = importNode(gridImagen),
          nGridCaption = importNode(gridCaption);

        nGridItem.setAttribute("target", "_blank");

        if (typeof item.url !== "undefined")
          nGridItem.setAttribute("href", item.url);

        if (typeof item.thumbnail !== "undefined")
          nImagen.setAttribute("src", item.thumbnail);

        if (typeof item.description !== "undefined") {
          nGridItem.setAttribute("data-caption", item.description);
          nGridCaption.innerHTML = item.description;
        }

        nGridImagen.append(nImagen);
        nGridItem.append(nGridImagen, nGridCaption);
        grid.append(nGridItem);
      }

      catalogo.append(grid);

      catalogo.onclick = (e) => {
        e.preventDefault();

        link = e.target.parentNode.parentNode;

        if (!isLink(link))
          link = e.target.parentNode;

        if (!isLink(link))
          link = null;

        if (link === null)
          return;

        const foto = document.createElement("div"),
          fotoSalir = document.createElement("button"),
          fotoImagen = document.createElement("div"),
          fotoImg = document.createElement("img"),
          fotoCaption = document.createElement("div");

        // Establecer atributos:
        foto.setAttribute("class", "modal-foto fadeIn");
        fotoSalir.setAttribute("class", "modal-foto__salir");
        fotoImagen.setAttribute("class", "modal-foto__imagen");
        fotoImg.setAttribute("class", "modal-foto__img");

        if (typeof link.href !== "undefined")
          fotoImg.setAttribute("src", link.href);

        fotoCaption.setAttribute("class", "modal-foto__caption");

        main = elemento("#app");

        if (main === null)
          return;

        // Establecer contenido:
        fotoSalir.textContent = "x";

        if (typeof link.dataset.caption !== "undefined")
          fotoCaption.innerHTML = link.dataset.caption;

        fotoImagen.append(fotoImg);
        foto.append(fotoSalir, fotoImagen, fotoCaption);

        // Incorporarlo al DOM:
        main.append(foto);

        foto.onclick = function (e) {
          if (!e.target.classList.contains("modal-foto__salir"))
            return;

          if (typeof this.remove === "function");
          this.remove();
        }
      }
    })
};

// Servicios disponibles:
const services = (_ruta, _servicios, _destino) => {
  if (
    typeof _ruta === "undefined" ||
    typeof _servicios === "undefined" ||
    typeof _destino === "undefined"
  ) {
    return;
  }

  const main = elemento(_destino),
    servicios = elemento(_servicios);

  if (main === null || servicios === null)
    return;


  fetch(_ruta)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (json) {
      servicios.onclick = function () {
        const body = elemento("body");

        if (body === null)
          return;

        // CREAR ELEMENTOS::
        // Elementos del módulo de servicio:
        const modalServices = document.createElement("div"),
          modalServicesContent = document.createElement("div"),
          modalServicesItem = document.createElement("div"),
          modalServicesTitle = document.createElement("div"),
          h2 = document.createElement("h2"),
          h3 = document.createElement("h3"),
          modalServicesDescription = document.createElement("div"),
          modalServicesSalir = document.createElement("button");

        // Establecer atributos a los elementos:
        modalServices.setAttribute("class", "modal-services");
        modalServicesContent.setAttribute("class", "modal-services__content");
        modalServicesItem.setAttribute("class", "modal-services__item");
        modalServicesTitle.setAttribute("class", "modal-services__title");

        // Títulos de las descripciones y la ventana modal:
        h2.setAttribute("class", "title title--base");
        h3.setAttribute("class", "title--base");

        modalServicesDescription.setAttribute("class", "modal-services__description");
        modalServicesSalir.setAttribute("class", "modal-services__salir");

        // Establecer contenido por defectos a los elementos:
        modalServicesSalir.textContent = "x";
        h2.textContent = "Services We Offer";

        // Incluir elementos en otros:
        modalServices.append(modalServicesSalir, h2, modalServicesContent);

        if (!Array.isArray(json))
          return;

        for (let item of json) {
          let nTitle = importNode(h3),
            nModalTitle = importNode(modalServicesTitle),
            nDescription = importNode(modalServicesDescription),
            nModalItem = importNode(modalServicesItem);

          if (typeof item.title !== "undefined")
            nTitle.innerHTML = item.title;

          if (typeof item.description !== "undefined")
            nDescription.innerHTML = item.description;

          // Incluir elementos en otros:
          nModalTitle.append(nTitle);
          nModalItem.append(nModalTitle, nDescription);

          modalServicesContent.append(nModalItem);
        }

        // Incluir en Main:
        modalServices.classList.add("fadeIn");
        main.append(modalServices);

        body.style.overflow = "hidden";

        // Trabajar sobre la ventana:
        modalServices.onclick = function (e) {
          let salir = e.target;
          const body = elemento("body");


          if (typeof salir.classList.contains !== "function")
            return;

          if (!salir.classList.contains("modal-services__salir"))
            return;

          if (typeof this.remove === "function")
            this.remove();

          if (body !== null)
            body.removeAttribute("style");
        }
      }
    })
};

// Obtener un JSON con los datos de About:
about("app/ajax/?about");

// Obtener un JSON de catálogos:
catalogs("app/ajax/?catalogs", "#grid-catalogs");

// Services:
services("app/ajax/?services", "#servicios", "#app");


const calendar = elemento("#calendar");
if (calendar !== null)
  calendar.onclick = function () {
    const body = elemento("body");
    if (body !== null) {
      body.style.overflow = "hidden";
    }

    calendario("app/ajax/?calendario", "#app");
  }


// Lectura de mensaje:
const infoEnvio = (ruta, selector, tipo) => {
  if (
    typeof ruta === "undefined" ||
    typeof selector === "undefined" ||
    typeof tipo !== "string"
  ) {
    return;
  }

  const label = elemento(selector);
  const success = document.createElement("div");

  success.setAttribute("class", `info info--${tipo} desplegar`);

  if (label === null)
    return;

  fetch(ruta)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      if (data.info.trim().length > 3)
        success.textContent = data.info;

      label.append(success);

      setTimeout(function () {
        success.classList.replace("desplegar", "plegar");
        success.onanimationend = function () {
          if (typeof this.remove === "function")
            this.remove();
        }
      }, 10 * 1000);
    })
};

// Probar:
infoEnvio("app/ajax/?correoEnviado", "#label-email", "success");
infoEnvio("app/ajax/?correoNoEnviado", "#label-email", "error");
