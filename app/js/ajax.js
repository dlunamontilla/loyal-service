const calendario = ( _ruta, _selector ) => {
  if ( typeof _ruta !== "string" || typeof _selector !== "string" )
    return;

  const _elemento = elemento( _selector );

  if ( _elemento === null )
    return;
  
  // Creando elementos:
  let caption = document.createElement( "div" );
  caption.textContent = "Select a day";

  let
    form = document.createElement( "form" ),
    hidden = document.createElement( "input"),
    grid = document.createElement( "div" ),
    gridItem = document.createElement( "div" );

  caption.classList.add( "caption" );

  // Agregando atributos al formulario:
  form.setAttribute("method", "post");
  form.setAttribute("action", "app/ajax/");
  
  // Agregando clases al formulario:
  form.classList.add( "form" );

  // Estableciendo attributos para el hidden:
  hidden.setAttribute( "type", "hidden" );
  hidden.setAttribute( "name", "mes");

  form.append( hidden );

  // Estableciendo las clases de las cuadrículas:
  grid.classList.add( "calendar" );
  gridItem.classList.add( "calendar__item" );

  form.append( caption, grid );
  _elemento.append( form );


  fetch( _ruta )
  .then( function( respuesta ) {
    return respuesta.json();
  })
  .then( function( calendario ) {
    for ( let item of calendario ) {
      let elemento = importNode( gridItem ),
        dia = document.createElement( "span" ),
        diaSemana = document.createElement( "span" );

      // Días del mes:
      dia.classList.add( "calendar__dia", "calendar__dia--dia");
      dia.textContent = item.dia;

      // Días de la semana:
      diaSemana.classList.add( "calendar__dia", "calendar__dia--semana" );
      diaSemana.textContent = item.diaSemana;

      // Elemento ITEM:
      elemento.setAttribute("data-dia", item.dia );

      // Agregar elementos a cada ITEM:
      elemento.append(
        dia, diaSemana
      );

      grid.append( elemento );
    }

    let items = form.querySelectorAll( ".calendar__item" );

    const seleccionar = ( _elemento, _clase ) => {
      if (
        typeof _elemento === "undefined" ||
        typeof _clase !== "string"
      ) {
        return;
      }

      // Remover las clases de los items si la contienen:
      items.forEach( _elemento => {
        _elemento.classList.remove( _clase );
      });

      let __elemento = _elemento;
      if ( ! _elemento.classList.contains( "calendar__item" ) ) {
        __elemento = _elemento.parentNode;
      }

      if ( ! __elemento.classList.contains( "calendar__item" ) ) {
        return;
      }

      __elemento.classList.add( _clase );
    };

    form.onclick = (e) => {
      let $dia = (typeof e.target.dataset.dia !== "undefined" )
      ? typeof e.target.dataset.dia : e.target.parentNode.dataset.dia;

      console.log( "\$dia =", $dia );

      hidden.value = $dia;
      seleccionar( e.target, "calendar__item--selected" );
    }
  });
};

const about = ( _ruta ) => {
  if (typeof _ruta !== "string") {
    return;
  }

  fetch( _ruta)
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function( json ) {
    const mission = elemento( "#get-mission" ),
      vision = elemento( "#get-vision");

    if ( mission === null || vision === null )
      return;

    const
      pMision = document.createElement( "p" ),
      pVision = document.createElement( "p" );

    let 
      tMision = json.mision,
      tVision = json.vision;
    
    // Eliminar retorno de carro:
    tMision = tMision.replace(/\r/g, "");
    tVision = tVision.replace(/\r/g, "");

    // Convertir el texto en un array:
    tMision = tMision.split("\n\n");
    tVision = tVision.split("\n\n");

    for ( let texto of tMision ) {
      let parrafo = importNode( pMision );
      parrafo.textContent = texto;
      mission.append( parrafo );
    }

    for ( let texto of tVision ) {
      let parrafo = importNode( pVision );
      parrafo.textContent = texto;
      vision.append( parrafo );
    }
  });
}

about( "app/ajax/?about", "#selector" );
// calendario( "app/ajax/?calendario", "#calendar" );