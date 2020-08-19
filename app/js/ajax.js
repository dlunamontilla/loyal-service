// Calendario:
const calendario = (_ruta, _main) => {
  if (typeof _ruta !== "string" || typeof _main !== "string")
    return;

  const main = elemento( _main );
  if ( main === null )
    return;

  // Obtener datos de la plantilla si existe:
  const plantilla = elemento("#template-calendar");
  if ( plantilla === null )
    return;

  // Imcorporar elementos:
  const modalCalendar = importNode(plantilla).content;

  // Observar cambios en el DOM:
  var observar = new MutationObserver(function(mutaciones) {
    mutaciones.forEach(function(mutacion) {
      if ( mutacion.type === "childList" )
        completarCalendario( _ruta );
    });
  });

  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  observar.observe( main, config );
  main.append( modalCalendar );

  // Completar calendario:
  const completarCalendario = ( ruta ) => {
    const calendario = main.querySelector( "#modal-calendar" );
    if ( calendario === null )
      return;

    // Cerrar la ventana calendario:
    calendario.onclick = function(e) {
      let salir = e.target;

      if ( typeof salir.dataset.action === "undefined" )
        return;

      if ( salir.dataset.action === "salir" ) {
        if ( typeof this.remove === "function" )
          this.remove();
      }
    };

    // Crear elementos:
    const dias = document.createElement( "div" ),
      diasItem = document.createElement( "div" ),
      semanaItem = document.createElement( "div" );

    // Establecer atributos:
    dias.setAttribute("class", "dias dias--content");
    diasItem.setAttribute("class", "dias__item");
    semanaItem.setAttribute("class", "dia__semana");

    // Obtener el contenedor de los días:
    const mes = elemento("#mes");

    // Leer los datos del servidor:
    fetch(ruta)
      .then(function(respuesta) {
        return respuesta.json();
      })
      .then(function( data ) {
        if ( mes === null )
          return;

        for ( let item of data ) {
          let nDias = importNode( dias ),
            nDiasItem = importNode( diasItem ),
            nSemanaItem = importNode( semanaItem );

          nDiasItem.textContent = item.dia;
          nSemanaItem.textContent = item.diaSemana;
          nDias.append( nDiasItem, nSemanaItem );

          if ( item.dia <= 10 )
            mes.append( nDias );
        }
      })
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
if ( calendar !== null )
  calendar.onclick = function() {
    calendario( "app/ajax/?calendario", "#app" );
  }


// Lectura de mensaje:
const infoEnvio = ( ruta, selector, tipo ) => {
  if (
    typeof ruta === "undefined" ||
    typeof selector === "undefined" ||
    typeof tipo !== "string"
  ) {
    return;
  }

  const label = elemento( selector );
  const success = document.createElement( "div" );
  
  success.setAttribute("class", `info info--${tipo} desplegar`);

  if ( label === null )
    return;

  fetch(ruta)
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function ( data ) {
    if ( data.info.trim().length > 3 )
      success.textContent = data.info;
    
    label.append( success );
    
    setTimeout(function() {
      success.classList.replace( "desplegar", "plegar" );
      success.onanimationend = function() {
        if ( typeof this.remove === "function" )
          this.remove();
      }
    }, 10 * 1000);
  })
};

// Probar:
infoEnvio( "app/ajax/?correoEnviado", "#label-email", "success" );
infoEnvio( "app/ajax/?correoNoEnviado", "#label-email", "error" );
