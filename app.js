
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. ELEMENTOS DE LA PÁGINA
  // ==========================================

  const cover = document.getElementById("cover");

  const invitation = document.getElementById("invitation");

  const envelope = document.getElementById("envelope");

  const openBtn = document.getElementById("openBtn");

  const music = document.getElementById("music");

  const musicBtn = document.getElementById("musicBtn");

  const snow = document.getElementById("snow");

  const snowBtn = document.getElementById("snowBtn");

  const glitter = document.getElementById("glitter");


  // ==========================================
  // 2. VARIABLES GENERALES
  // ==========================================

  let opened = false;

  let snowEnabled = true;


  // ==========================================
  // 3. CREAR NIEVE ANIMADA
  // ==========================================

  function createSnow() {

    snow.innerHTML = "";

    for (let i = 0; i < 60; i++) {

      const flake = document.createElement("span");

      flake.className = "flake";

      // Algunos copos son estrellas de nieve
      // y otros son pequeños puntitos blancos.

      flake.textContent =
        Math.random() > 0.6 ? "❄" : "•";

      // Posición horizontal aleatoria

      flake.style.left =
        Math.random() * 100 + "%";

      // Tamaño de cada copo

      flake.style.fontSize =
        (6 + Math.random() * 13) + "px";

      // Velocidad de caída

      flake.style.animationDuration =
        (9 + Math.random() * 13) + "s";

      // Diferentes momentos de inicio

      flake.style.animationDelay =
        (-Math.random() * 22) + "s";

      // Transparencia de cada copo

      flake.style.opacity =
        0.2 + Math.random() * 0.6;

      snow.appendChild(flake);

    }

  }


  // ==========================================
  // 4. CREAR BRILLITOS DORADOS
  // ==========================================

  function createSparkles() {

    glitter.innerHTML = "";

    for (let i = 0; i < 50; i++) {

      const star = document.createElement("span");

      star.className = "spark";

      // Dos tipos de estrellas doradas

      star.textContent =
        Math.random() > 0.5 ? "✦" : "✧";

      // Posiciones aleatorias

      star.style.left =
        Math.random() * 100 + "%";

      star.style.top =
        Math.random() * 100 + "%";

      // Tamaños diferentes

      star.style.fontSize =
        (7 + Math.random() * 12) + "px";

      // Velocidad de brillo

      star.style.animationDuration =
        (2 + Math.random() * 3) + "s";

      star.style.animationDelay =
        (-Math.random() * 5) + "s";

      glitter.appendChild(star);

    }

  }


  // ==========================================
  // 5. ACTIVAR EFECTOS NAVIDEÑOS
  // ==========================================

  createSnow();

  createSparkles();


  // ==========================================
  // 6. ABRIR EL SOBRE
  // ==========================================

  function openInvitation() {

    // Evita abrir dos veces la invitación

    if (opened) {
      return;
    }

    opened = true;

    // Animación del sobre

    envelope.classList.add("opened");

    // Desactivar botón mientras se abre

    openBtn.disabled = true;


    // ========================================
    // 7. COMENZAR LA MÚSICA
    // ========================================

    // Volumen inicial: 25%

    music.volume = 0.25;

    // Intentamos reproducir el audio.
    // Si falla, la invitación igual se abre.

    const attempt = music.play();

    if (
      attempt &&
      typeof attempt.then === "function"
    ) {

      attempt.then(function () {

        musicBtn.textContent = "♫";

        musicBtn.setAttribute(
          "aria-label",
          "Pausar música"
        );

      }).catch(function () {

        musicBtn.textContent = "♪";

        musicBtn.setAttribute(
          "aria-label",
          "Activar música"
        );

      });

    }


    // ========================================
    // 8. MOSTRAR LA INVITACIÓN
    // ========================================

    // Esperamos 650 milisegundos para que
    // se vea la animación del sobre.

    setTimeout(function () {

      // Ocultar portada

      cover.hidden = true;

      // Mostrar invitación

      invitation.hidden = false;

      // Volver arriba de la página

      window.scrollTo(0, 0);

    }, 650);

  }


  // ==========================================
  // 9. EVENTOS PARA ABRIR EL SOBRE
  // ==========================================

  // Abrir tocando directamente el sobre

  envelope.addEventListener(
    "click",
    openInvitation
  );

  // Abrir tocando el botón

  openBtn.addEventListener(
    "click",
    openInvitation
  );


  // ==========================================
  // 10. CONTROL DE MÚSICA
  // ==========================================

  musicBtn.addEventListener("click", function () {

    if (music.paused) {

      // Si está pausada, reproducir

      music.play().then(function () {

        musicBtn.textContent = "♫";

        musicBtn.setAttribute(
          "aria-label",
          "Pausar música"
        );

      }).catch(function () {

        alert(
          "No se pudo reproducir Navidad.mp3. " +
          "Revisá que esté en la misma carpeta " +
          "que index.html."
        );

      });

    } else {

      // Si está sonando, pausar

      music.pause();

      musicBtn.textContent = "♪";

      musicBtn.setAttribute(
        "aria-label",
        "Activar música"
      );

    }

  });


  // ==========================================
  // 11. CONTROL DE NIEVE
  // ==========================================

  snowBtn.addEventListener("click", function () {

    snowEnabled = !snowEnabled;

    // Mostrar u ocultar nieve

    snow.hidden = !snowEnabled;

    // Cambiar icono del botón

    snowBtn.textContent =
      snowEnabled ? "❄" : "☀";

    snowBtn.setAttribute(
      "aria-label",
      snowEnabled
        ? "Desactivar nieve"
        : "Activar nieve"
    );

  });


});
