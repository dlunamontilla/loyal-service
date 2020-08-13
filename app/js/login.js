const formLogin = elemento( "#form-login" );

const isUser = ( inputUser ) => {
  if ( typeof inputUser == "undefined" || inputUser === null )
    return false;

  let pattern = /^[a-z]{1}[a-z\-\_\.]{4,16}[a-zA-Z0-9]{1}$/i;
  return pattern.test( inputUser.value.trim() );
}

const isPassword = ( inputPassword ) => {
  if ( typeof inputPassword == "undefined" || inputPassword === null )
    return;
    
  let pattern = /^[a-z0-9\-\_\.\*\%\&\/\\\Ñ\ñ\$\#\@\|\!\[\]\+\¿\?\(\)\¬\{\}]{8,30}$/i;
  return pattern.test( inputPassword.value.trim() );
}

// Detectar envío de formulario:
if ( formLogin !== null )
  formLogin.onsubmit = e => {
    let user = elemento( "#user" ),
      pass = elemento( "#password" );

    if ( user === null || pass === null )
      e.preventDefault();

    if ( ! isUser( user ) ) {
      e.preventDefault();
      user.classList.add( "loginAnimation");

      user.onanimationend = () => {
        user.classList.remove( "loginAnimation" );
      }
    }

    if ( ! isPassword( pass ) ) {
      e.preventDefault();
      pass.classList.add( "loginAnimation");

      pass.onanimationend = () => {
        pass.classList.remove( "loginAnimation" );
      }
    }
  };

