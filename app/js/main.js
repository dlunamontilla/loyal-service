const logotipo = async ( _elemento, _ruta ) => {
  const res = await fetch("multimedia/imagen/loyal-services-logo.svg"),
        recurso = await res.text();

  console.log( recurso );

  _elemento.insertAdjacentHTML( "beforeend", recurso );
}

const ruta = "multimedia/imagen/loyal-services-logo.svg",
      logo = document.querySelector( "#logotipo" );

if ( logo !== null )
  logotipo( logo, ruta );