<?php
  include __DIR__ . "/app/php/index.php";

  // Registrar los dominios sobres los que se va a aplicar:
  $protocolo = new DLProtocolo([
    "loyalservicesca.com",
    "www.loyalservicesca.com"
  ]);
  
  // Forzar a utilizar el protocolo HTTPS:
  $protocolo -> https();
?>

<!DOCTYPE html>
<html lang="en-CA">

<head id="head">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Sitio Web para una empresa que presta servicios" />
  <meta name="title" content="Loyal Services">
  <title>Loyal Services</title>

  <link rel="icon" href="multimedia/imagen/favicon.png" type="image/png">
  <link rel="shortcut icon" href="multimedia/imagen/favicon.ico" type="image/x-icon">

  <!-- Agregando CHAT (JivoChat) -->
  <script src="//code.jivosite.com/widget/sA5TgHg0Nf" async></script>

  <!-- Estilos -->
  <link rel="stylesheet" href="vista/css/style.css?v3">
  <script src="app/library/smoothscroll.js"></script>

  <!-- Google -->
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>

  <template id="template-cards">
    <div class="cards">
      <div class="cards__item" data-href="#about">
        <div class="cards__img" data-src="multimedia/imagen/mision.svg"></div>

        <div class="cards__text">
          <span class="cards__title">Mission</span>
        </div>
      </div>

      <div class="cards__item" id="servicios">
        <div class="cards__img" data-src="multimedia/imagen/servicios.svg"></div>

        <div class="cards__text">
          <span class="cards__title">Our Services</span>
        </div>
      </div>

      <div class="cards__item" data-href="#contact">
        <div class="cards__img" data-src="multimedia/imagen/phone.svg"></div>

        <div class="cards__text">
          <span class="cards__title">Contacts</span>
        </div>
      </div>
    </div>
  </template>

  <template id="template-title">
    <h2 class="title title--center title--large title--uppercase"></h2>
  </template>

  <template id="template-button-tel">
    <a href="tel:+16477004965" class="button button--flex button--tel button--block">647 700 4965</a>
  </template>

  <template id="menu-item">
    <li class="menu__item"><a href="#home" class="menu__enlace flex">HOME</a></li>
    <li class="menu__item"><a href="#services" class="menu__enlace flex">Services</a></li>
    <li class="menu__item"><a href="#catalogs" class="menu__enlace flex">Catalogs</a></li>
    <li class="menu__item"><a href="#about" class="menu__enlace flex">About</a></li>
    <li class="menu__item"><a href="#contact" class="menu__enlace flex">Contact</a></li>
  </template>

  <template id="animacion">
    <div class="caja giro-constante" id="animacion-carga">
      <svg viewBox="0 0 140 140" class="lienzo giro-intervalo">
        <!-- Degradado de colores -->
        <linearGradient id="gradiente" gradientTransform="rotate(319)">
          <stop stop-color="#2873fe" offset="0%" />
          <stop stop-color="#9e48c9" offset="30%" />
        </linearGradient>

        <!-- Circunferencia con borde fijo-->
        <circle class="cir cir--fijo" cx="70" cy="70" r="65" />

        <!-- Circunferencia con borde animado -->
        <circle class="cir cir--completando giro-trazo" cx="70" cy="70" r="65" />
      </svg>
    </div>
  </template>

  <template id="template-calendar">
    <div class="modal-calendar" id="modal-calendar">
      <div class="modal-calendar__item modal-calendar__item--group-button">
        <button data-action="salir" class="modal-calendar__salir">x</button>
      </div>

      <div class="modal-calendar__item modal-calendar__item--content">
        <form action="app/ajax/" method="post" id="form-calendar">
          <input type="hidden" name="fechaSeleccionada" id="fechaSeleccionada" data-include="">

          <div class="flex controls">
            <label for="meses" data-include="false">
              <select name="meses" id="meses" class="controls__select">
                <span>Seleccione un mes</span>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </label>

            <label class="correo">
              <span class="color-base color-base--frontal">Enter your email</span>
              <input type="email" name="email" id="email" class="input input--text" autocomplete="off" maxlength="70" placeholder="correo@example.com" data-include="">
            </label>

          </div>

          <hr>

          <div class="info" id="informacion">Select a day:</div>
          <div id="mes" class="modal-calendar__mes"></div>

          <!-- reCAPTCHA de Google -->
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          
          <div class="fondo flex flex--wrap">
            <div class="g-recaptcha flex__item" data-sitekey="6LcEs8AZAAAAAK-W6DdpNO4doqXWTU1G3Nx0OuWr"></div>
            <div id="informar-reserva"></div>
            <button type="submit" class="button button--primary button--right">Reserve</button>
          </div>
        </form>
      </div>
    </div>
  </template>

  <main id="app" class="min-height">
    <header class="header min-height" id="header">
      <nav class="navigation navigation--home" id="navigation">
        <div class="navigation flex flex--between">
          <!-- Isotipo -->
          <a href="#home" class="logo logo__enlace">
            <div class="logo logo--horizontal" data-src="multimedia/imagen/loyal-services-texto-grisaceo.svg"></div>
          </a>

          <button id="menu-button" class="menu-button">
            <span data-src="multimedia/imagen/bars.svg"></span>
            <span>Menu</span>
          </button>

          <ul class="menu menu--responsive" id="menu"></ul>
        </div>
      </nav>
    </header>

    <div class="content">
      <section id="home" class="portada">
        <div id="logotipo" class="portada__item portada__item--left"
          data-src="multimedia/imagen/loyal-services-logo-azul.svg"></div>
        <div class="portada__item portada__item--right"
          data-src="multimedia/imagen/isotipo-mitad-derecha-sin-fondo.svg"></div>
      </section>

      <!-- Área de servicios -->
      <section id="services" class="section section--services">
        <div id="services-content" class="section__content"></div>
      </section>

      <section id="catalogs" class="section section--cards">
        <div class="section__content" id="catalogs-content">
          <h2 class="title title--center title--large title--uppercase">Catalogs</h2>

          <div class="grid-catalogs" id="grid-catalogs"></div>
        </div>
      </section>

      <section id="about" class="section section--about">
        <div id="about-content" class="section__content">
          <h2 class="title title--center title--large">About</h2>

          <!-- Misión -->
          <div class="grid grid--gap grid--column-2 max-width max-width--1 max-width--center">
            <div class="flex flex--columns grid__item grid__item--about">
              <div class="about about--title">Mission</div>

              <div class="grid__caption" id="get-mission"></div>
            </div>

            <!-- Visión -->
            <div class="flex flex--columns grid__item grid__item--about">
              <div class="about about--title">
                Vision
              </div>

              <div class="grid__caption" id="get-vision"></div>
            </div>

          </div>
        </div>
      </section>

      <section id="contact" class="section section--contact">
        <div class="section__item section__item--fondo flex--center">
          <div class="logo logo--vertical" data-src="multimedia/imagen/loyal-services-logo.svg"></div>
        </div>

        <div class="section__item">
          <div class="contact">
            <div class="contact__title">
              <h3 class="title title--center title--info">Contact</h3>
            </div>

            <div class="contact__info">
              <!-- WhatsApp -->
              <div class="whatsapp">
                <p>WhatsApp:</p>
                <p class="whatsapp__parrafo">
                  <a class="whatsapp__enlace social-icon social-icon--whatsapp"
                    href="https://web.whatsapp.com/send?phone=16477004965&text=" target="_blank">
                    <span data-src="multimedia/imagen/whatsapp.svg"></span>
                    +1 647 700 4965
                  </a>
                </p>
              </div>

              <!-- Correo electrónico -->
              <div class="email">
                <p>Email:</p>
                <p>
                  <a href="mailto:loyalservices.ca@gmail.com" class="social-icon social-icon--generico">
                    <span data-src="multimedia/imagen/envelope.svg"></span>
                    loyalservices.ca@gmail.com&nbsp;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="section__item">
          <div class="contact">
            <div class="contact__title">
              <h3 class="title title--center title--info">Calendar</h3>
            </div>

            <!-- Ir al calendario -->
            <div id="calendar" class="view-calendar">
              <a href="#view-calendar" class="calendar--enlace">
                <div data-src="multimedia/imagen/calendario.svg"></div>
                <p>Go to the calendar</p>
              </a>
            </div>

            <!-- Sitio Web -->
            <div class="website">
              <p>Website:</p>
              <p>
                <a href="https://www.loyalservicesca.com/" target="_blank" class="social-icon social-icon--generico">
                  <span data-src="multimedia/imagen/globe.svg"></span>
                  www.loyalservicesca.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="section__item section__item--form">
          <div class="contact contact--form">
            <form action="./app/php/procesar.php" class="form" method="post" id="form-email">
              <label id="label-email">
                <p class="text text--small-caps text--label">Subscribe and receive <br>notifications</p>

                <div class="content-input">
                  <input type="text" name="email" id="email"
                    class="input input--text content-input__item content-input__item--text"
                    placeholder="Enter your email" autocomplete="off">
                  <button class="button button--primary button--circle content-input__item content-input__item--button"
                    data-src="multimedia/imagen/angle-right.svg"></button>
                </div>
              </label>

              <br>
              <!-- reCAPTCHA de Google -->
              <div class="g-recaptcha" data-sitekey="6LcEs8AZAAAAAK-W6DdpNO4doqXWTU1G3Nx0OuWr"></div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </main>
  <script src="app/js/main.js"></script>
  <script src="app/js/ajax.js"></script>
</body>

</html>