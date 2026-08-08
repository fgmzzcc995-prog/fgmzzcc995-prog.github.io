/* Fixely · interacciones mínimas, sin librerías */

// ---------- Menú del celular ----------
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("abierto");
  menuBtn.setAttribute("aria-expanded", abierto ? "true" : "false");
});

// cerrar el menú al tocar un enlace (en celular)
nav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("abierto");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------- Botón "Pedir una auditoría": preselecciona el tipo ----------
document.querySelectorAll("[data-tipo]").forEach((el) => {
  el.addEventListener("click", () => {
    const tipo = el.getAttribute("data-tipo");
    const select = document.getElementById("tipo");
    if (select) {
      [...select.options].forEach((o) => {
        if (o.value === tipo || o.text === tipo) select.value = o.value;
      });
    }
  });
});

// ---------- Formulario: envío a Formspree sin salir de la página ----------
const form = document.getElementById("form-contacto");
const estado = document.getElementById("form-estado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const boton = form.querySelector("button[type=submit]");
  boton.disabled = true;
  boton.textContent = "Enviando…";

  try {
    const respuesta = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (respuesta.ok) {
      form.reset();
      estado.textContent = "¡Gracias! Tu mensaje llegó. Te respondo a la brevedad.";
      boton.textContent = "Mensaje enviado ✓";
    } else {
      throw new Error("Formspree respondió con error");
    }
  } catch (error) {
    estado.textContent =
      "No se pudo enviar. Escribime directo a fixely2026@gmail.com y lo resolvemos.";
    boton.disabled = false;
    boton.textContent = "Enviar mensaje";
  }
});
