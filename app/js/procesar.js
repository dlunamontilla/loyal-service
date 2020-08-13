// Procesar formulario antes de enviar:
const __initForm__ = (_selector, _clase) => {
  if (typeof _selector !== "string" || typeof _clase !== "string" )
    return;

  const form = elemento( _selector );
  if ( form !== null ) {
    const hidden = form.querySelector( "[type='hidden']" );

    form.onclick = ( e ) => {
      if ( e.target.classList.contains( _clase ) ) {
        if ( hidden !== null && typeof e.target.dataset.id !== "undefined" ) {
          hidden.setAttribute( "value", e.target.dataset.id );
          
          // Preguntar al usuario si desea eliminar el elemento que seleccionó:
          let confirmar = confirm("Do you want to continue?");
          if (confirmar) form.submit();
        }
      }
    }
  }
}

const charLength = ( _selector ) => {
  if ( typeof _selector !== "string" )
    return;

  const label = elemento( _selector );

  if ( label === null )
    return;

  const textarea = label.querySelector( "textarea" );
  const length = label.querySelector( ".length" );

  if ( textarea === null || length === null )
    return;

  length.textContent = `${textarea.value.length} of ${textarea.getAttribute("maxlength")} characters`;

  textarea.oninput = function() {
    length.textContent = `${this.value.length} of ${this.getAttribute("maxlength")} characters`;
  }
}

const passwordFormat = ( _form, _oldPassword, _newPassword, _repeatPassword ) => {
  // Si se llama la función sin pasar los parámetros como cadena 
  // no devuelve ningún resultado y se detiene la ejecución del código:
  if (
    typeof _form !== "string" ||
    typeof _oldPassword !== "string" ||
    typeof _newPassword !== "string" ||
    typeof _repeatPassword !== "string"
  ) {
    return;
  }

  const form = elemento( _form ),
    oldPassword = elemento( _oldPassword ),
    newPassword = elemento( _newPassword ),
    repeatPassword = elemento( _repeatPassword );

  if (
    form === null ||
    oldPassword === null ||
    newPassword === null ||
    repeatPassword === null
  ) {
    return;
  }

  form.onsubmit = function(e) {
    if ( ! isPassword( newPassword ) ) {
      e.preventDefault();
      alert("Invalid Password Format");
    }

    if ( newPassword.value !== repeatPassword.value ) {
      e.preventDefault();
      alert("Password do not Match");
      newPassword.focus();
    }
  };

  const info = form.querySelector( ".passwords" );

  const match = ( inputA, inputB ) => {
    if (
      typeof inputA === "undefined" ||
      typeof inputB === "undefined"
    ) {
      return;
    }

    if ( info === null )
      return;

    // Avisarle al usuario cuando sus contraseñas no coincidan:
    info.textContent = ( inputA.value === inputB.value ) ? "Passwords Match" : "Passwords do not Match";

    // Evaluar con las contraseñas coincidan
    if ( inputA.value === inputB.value ) {
      if ( ! info.classList.contains( "passwords--match" ) )
        info.classList.add( "passwords--match" );

      if ( info.classList.contains("passwords--no-match") )
        info.classList.replace( "passwords--no-match", "password--match" );
    }else {
      // Si lo contiene lo elimina:
      if ( info.classList.contains("passwords--match") )
        info.classList.remove("passwords--match");

      // Si no la contiene, lo agrega (en este caso la clase "password--no-match");
      if ( ! info.classList.contains("passwords--no-match") )
        info.classList.add("passwords--no-match");
    }
  };

  repeatPassword.oninput = function() {
    match( newPassword, repeatPassword );
  }
};

passwordFormat(
  "#form-update-password",
  "#oldPassword",
  "#newPassword",
  "#repeat-password"
);

// Mostrar al usuario cuántos caracteres ha utilizado:
charLength( "#label-catalogs-description" );
charLength( "#label-services-description" );

// Prepara el formulario para que pueda eliminar servicios específicos:
__initForm__("#eliminar-servicios", 'grid__item--eliminar');
__initForm__("#eliminar-catalogos", 'grid__item--eliminar');

