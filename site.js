const navItems = document.querySelectorAll(".nav-item");
const CART_STORAGE_KEY = "watertech-cart";
const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyByOQZg2dQwa7C_HRyq-Osilry9Mx1g-S6SOXl65sD4JmxaDAMNF_U2qS5h12kEIUa/exec";
const WHATSAPP_NUMBER = "593968467023";
const PRIMARY_PHONE = "+593968467023";
const HEADER_LOCATION =
  "Av. de los Tsáchilas 706 y Río Balao, junto al Edificio El Gigante, Santo Domingo - Ec";
const HEADER_EMAIL = "info@watertech.com.ec";
const MOBILE_PHONES = [
  "0968467023",
  "0987780011",
  "0964118838",
  "0968821837",
];
const LANDLINE_PHONE = "022750203";
const FACEBOOK_URL = "https://www.facebook.com/watertech.com.ec/";
const INSTAGRAM_URL = "https://www.instagram.com/watertech.com.ec/";

const enhanceHeader = () => {
  const topbar = document.querySelector(".topbar");
  if (!topbar || topbar.classList.contains("is-enhanced")) {
    return;
  }

  const brand = topbar.querySelector(".brand");
  const nav = topbar.querySelector(".nav");
  const ghostButton = topbar.querySelector(".button-ghost");

  if (!brand || !nav || !ghostButton) {
    return;
  }

  if (!nav.querySelector(".nav-home-link")) {
    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.className = "nav-home-link";
    homeLink.textContent = "Home";
    nav.prepend(homeLink);
  }

  const utilityBar = document.createElement("div");
  utilityBar.className = "utility-bar";
  utilityBar.innerHTML = `
    <div class="utility-bar-inner">
      <div class="utility-item">
        <span class="utility-label">Ubicación</span>
        <span>${HEADER_LOCATION}</span>
      </div>
      <a class="utility-item utility-link" href="mailto:${HEADER_EMAIL}">
        <span class="utility-label">Correo</span>
        <span>${HEADER_EMAIL}</span>
      </a>
    </div>
  `;

  const topbarMain = document.createElement("div");
  topbarMain.className = "topbar-main";

  const phoneRow = document.createElement("div");
  phoneRow.className = "header-phone-row";
  phoneRow.innerHTML = `
    <div class="header-phone-card">
      <span class="header-phone-label">Celulares</span>
      <strong class="header-phone-lines">
        <span>${MOBILE_PHONES.slice(0, 2).join(" - ")}</span>
        <span>${MOBILE_PHONES.slice(2).join(" - ")}</span>
      </strong>
    </div>
    <div class="header-phone-card">
      <span class="header-phone-label">Convencional</span>
      <strong>${LANDLINE_PHONE}</strong>
    </div>
  `;

  const actionGroup = document.createElement("div");
  actionGroup.className = "topbar-main-actions";
  ghostButton.textContent = "Contáctanos";
  ghostButton.href = "contacto.html";
  actionGroup.append(ghostButton);

  const navWrap = document.createElement("div");
  navWrap.className = "topbar-nav";
  navWrap.append(nav);

  topbar.innerHTML = "";
  topbar.classList.add("is-enhanced");
  topbarMain.append(brand, phoneRow, actionGroup);
  topbar.append(topbarMain, navWrap);
  topbar.before(utilityBar);
};

enhanceHeader();

const ensureFooter = () => {
  const siteShell = document.querySelector(".site-shell");
  if (!siteShell || siteShell.querySelector(".site-footer")) {
    return;
  }

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand-block">
        <img src="logo-watertech.png" alt="Water Tech" class="footer-logo" />
        <p>
          Ingeniería de agua, soporte técnico y soluciones confiables para industria, comercio y hogar.
        </p>
      </div>
      <div class="footer-contact-block">
        <h3>Contacto</h3>
        <p><strong>Celulares:</strong> ${MOBILE_PHONES.join(" - ")}</p>
        <p><strong>Convencional:</strong> ${LANDLINE_PHONE}</p>
        <p><strong>Correo:</strong> <a href="mailto:${HEADER_EMAIL}">${HEADER_EMAIL}</a></p>
      </div>
      <div class="footer-social-block">
        <h3>Síguenos</h3>
        <div class="footer-social-links">
          <a class="footer-social-button" href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">
            <span class="footer-social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.3-1.3H16V5.9c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.2v2.3H9v2.7h2.4v7h2.1Z"/>
              </svg>
            </span>
            <span>Facebook</span>
          </a>
          <a class="footer-social-button" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">
            <span class="footer-social-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.9 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Z"/>
              </svg>
            </span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <span>${HEADER_LOCATION}</span>
      <span>Celulares: ${MOBILE_PHONES[0]} - ${MOBILE_PHONES[1]} - ${MOBILE_PHONES[2]} - ${MOBILE_PHONES[3]}</span>
      <span>Convencional: ${LANDLINE_PHONE}</span>
    </div>
  `;

  siteShell.append(footer);
};

ensureFooter();

navItems.forEach((item) => {
  let closeTimer = null;
  const menu = item.querySelector(".dropdown-menu");

  const openMenu = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
    item.classList.add("is-open");
  };

  const closeMenu = () => {
    closeTimer = window.setTimeout(() => {
      item.classList.remove("is-open");
      closeTimer = null;
    }, 260);
  };

  item.addEventListener("mouseenter", openMenu);
  item.addEventListener("mouseleave", closeMenu);
  item.addEventListener("focusin", openMenu);
  item.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!item.contains(document.activeElement)) {
        item.classList.remove("is-open");
      }
    }, 0);
  });

  if (menu) {
    menu.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseleave", closeMenu);
  }
});

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

const buildLeadRequestBody = (payload) => {
  const requestBody = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    requestBody.append(key, String(value ?? ""));
  });

  return requestBody;
};

const submitLead = async (payload, endpoint = LEADS_ENDPOINT) => {
  const targetEndpoint = endpoint?.trim();

  if (!targetEndpoint) {
    throw new Error("No hay endpoint configurado.");
  }

  const response = await fetch(targetEndpoint, {
    method: "POST",
    mode: "cors",
    body: buildLeadRequestBody(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el formulario.");
  }

  return response;
};

const readCart = () => {
  try {
    return JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const writeCart = (cart) => {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const getCartCount = (cart) =>
  cart.reduce((total, item) => total + item.quantity, 0);

const ensureCartButton = () => {
  const topbar = document.querySelector(".topbar");
  if (!topbar || topbar.querySelector(".cart-entry")) {
    return;
  }

  const cartLink = document.createElement("a");
  cartLink.href = "carrito.html";
  cartLink.className = "cart-entry";
  cartLink.setAttribute("aria-label", "Ver carrito de compras");
  cartLink.innerHTML = `
    <span class="cart-entry-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation" focusable="false">
        <path d="M3 4h2.2c.4 0 .8.3.9.7l.5 2.3H20a1 1 0 0 1 1 .8 1 1 0 0 1-.1.7l-2.1 5.2a1.5 1.5 0 0 1-1.4.9H9.1a1.5 1.5 0 0 1-1.5-1.2L6 6H3a1 1 0 0 1 0-2Zm5.2 5 1 4.6h8l1.5-3.6H8.2ZM9 20a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      </svg>
    </span>
    <span class="cart-entry-badge" id="cart-badge">0</span>
  `;

  const actionGroup = topbar.querySelector(".topbar-main-actions");
  const ghostButton = topbar.querySelector(".button-ghost");
  if (ghostButton) {
    ghostButton.before(cartLink);
  } else if (actionGroup) {
    actionGroup.prepend(cartLink);
  } else {
    topbar.append(cartLink);
  }
};

const updateCartBadge = () => {
  ensureCartButton();
  const badge = document.getElementById("cart-badge");
  if (!badge) {
    return;
  }

  const count = getCartCount(readCart());
  badge.textContent = String(count);
  badge.classList.toggle("is-empty", count === 0);
};

const upsertCartItem = (product) => {
  const cart = readCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  writeCart(cart);
  updateCartBadge();
  renderCartPage();
};

const updateCartItemQuantity = (id, nextQuantity) => {
  const cart = readCart()
    .map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, nextQuantity) } : item
    )
    .filter((item) => item.quantity > 0);

  writeCart(cart);
  updateCartBadge();
  renderCartPage();
};

const removeCartItem = (id) => {
  const cart = readCart().filter((item) => item.id !== id);
  writeCart(cart);
  updateCartBadge();
  renderCartPage();
};

const clearCart = () => {
  writeCart([]);
  updateCartBadge();
  renderCartPage();
};

const bindAddToCartButtons = () => {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      upsertCartItem({
        id: button.dataset.productId,
        name: button.dataset.productName,
        price: Number(button.dataset.productPrice),
        category: button.dataset.productCategory,
      });

      const originalText = button.textContent;
      button.textContent = "Agregado";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1100);
    });
  });
};

const renderCartPage = () => {
  const itemsContainer = document.getElementById("cart-items");
  if (!itemsContainer) {
    return;
  }

  const cart = readCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = getCartCount(cart);
  const subtotalTarget = document.getElementById("cart-subtotal");
  const itemsTarget = document.getElementById("cart-total-items");
  const clearButton = document.getElementById("clear-cart-btn");

  if (itemsTarget) {
    itemsTarget.textContent = String(totalItems);
  }

  if (subtotalTarget) {
    subtotalTarget.textContent = formatCurrency(subtotal);
  }

  if (clearButton) {
    clearButton.disabled = cart.length === 0;
  }

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos desde la home para empezar tu selección o tu cotización.</p>
        <a class="button button-primary" href="index.html#catalogo">Explorar productos</a>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item-main">
            <p class="product-category">${item.category}</p>
            <h3>${item.name}</h3>
            <p>${formatCurrency(item.price)} por unidad</p>
          </div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button type="button" data-qty-down="${item.id}" aria-label="Disminuir cantidad">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-qty-up="${item.id}" aria-label="Aumentar cantidad">+</button>
            </div>
            <strong>${formatCurrency(item.price * item.quantity)}</strong>
            <button class="cart-remove" type="button" data-remove-item="${item.id}">Eliminar</button>
          </div>
        </article>
      `
    )
    .join("");

  itemsContainer.querySelectorAll("[data-qty-down]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.qtyDown;
      const item = readCart().find((entry) => entry.id === id);
      if (!item) return;
      if (item.quantity === 1) {
        removeCartItem(id);
        return;
      }
      updateCartItemQuantity(id, item.quantity - 1);
    });
  });

  itemsContainer.querySelectorAll("[data-qty-up]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.qtyUp;
      const item = readCart().find((entry) => entry.id === id);
      if (!item) return;
      updateCartItemQuantity(id, item.quantity + 1);
    });
  });

  itemsContainer.querySelectorAll("[data-remove-item]").forEach((button) => {
    button.addEventListener("click", () => {
      removeCartItem(button.dataset.removeItem);
    });
  });
};

ensureCartButton();
updateCartBadge();
bindAddToCartButtons();
renderCartPage();

const clearCartButton = document.getElementById("clear-cart-btn");
if (clearCartButton) {
  clearCartButton.addEventListener("click", clearCart);
}

const bindContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) {
    return;
  }

  const status = document.getElementById("contact-form-status");
  const submitButton = document.getElementById("contact-form-submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!status || !submitButton) {
      return;
    }

    const endpoint = form.dataset.endpoint?.trim();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.fecha = new Date().toISOString();
    payload.origen = "Sitio web Water Tech";

    status.textContent = "";
    status.className = "form-status";

    if (!endpoint) {
      status.textContent =
        "Formulario listo. Falta colocar la URL del Google Apps Script en data-endpoint para enviarlo a Google Sheets.";
      status.classList.add("is-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
      await submitLead(payload, endpoint);
      form.reset();
      status.textContent = "Solicitud enviada correctamente.";
      status.classList.add("is-success");
    } catch (error) {
      status.textContent =
        "No pudimos enviar el formulario en este momento. Revisa la URL del Apps Script o intenta otra vez.";
      status.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar solicitud";
    }
  });
};

const ensureWhatsAppModal = () => {
  if (document.querySelector("[data-whatsapp-modal]")) {
    return;
  }

  const modal = document.createElement("div");
  modal.className = "whatsapp-modal";
  modal.setAttribute("data-whatsapp-modal", "");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="whatsapp-backdrop" data-whatsapp-close></div>
    <div class="whatsapp-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsapp-modal-title">
      <button class="whatsapp-close" type="button" data-whatsapp-close aria-label="Cerrar formulario de WhatsApp">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="whatsapp-dialog-head">
        <p class="eyebrow">WhatsApp directo</p>
        <h2 id="whatsapp-modal-title">Déjanos tus datos y te llevamos a WhatsApp.</h2>
        <p>
          Guardaremos este contacto en Google Sheets y luego abriremos WhatsApp con tu mensaje listo para enviar.
        </p>
      </div>
      <form class="contact-form whatsapp-form" data-whatsapp-form>
        <div class="form-grid">
          <label class="form-field">
            <span>Nombre completo</span>
            <input type="text" name="nombre" placeholder="Tu nombre" required />
          </label>
          <label class="form-field">
            <span>Empresa o negocio</span>
            <input type="text" name="empresa" placeholder="Nombre de tu empresa" />
          </label>
          <label class="form-field">
            <span>Correo electrónico</span>
            <input type="email" name="correo" placeholder="nombre@empresa.com" />
          </label>
          <label class="form-field">
            <span>Teléfono</span>
            <input type="tel" name="telefono" placeholder="+593..." required />
          </label>
          <label class="form-field">
            <span>Ciudad</span>
            <input type="text" name="ciudad" placeholder="Quito, Santo Domingo..." />
          </label>
          <label class="form-field">
            <span>Interés principal</span>
            <select name="interes" required>
              <option value="">Selecciona una opción</option>
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Repuestos y soporte">Repuestos y soporte</option>
              <option value="Cotización de productos">Cotización de productos</option>
            </select>
          </label>
          <label class="form-field form-field-full">
            <span>Mensaje</span>
            <textarea
              name="mensaje"
              rows="5"
              placeholder="Cuéntanos qué necesitas y luego te llevaremos a WhatsApp."
              required
            ></textarea>
          </label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit" data-whatsapp-submit>
            Guardar y abrir WhatsApp
          </button>
          <p class="form-helper">
            Esta acción registrará el lead en Google Sheets antes de abrir la conversación por WhatsApp.
          </p>
        </div>
        <p class="form-status" data-whatsapp-status aria-live="polite"></p>
      </form>
    </div>
  `;

  document.body.append(modal);
};

const buildWhatsAppMessage = (payload) => {
  const parts = [
    `Hola, soy ${payload.nombre}.`,
    payload.empresa ? `Empresa o negocio: ${payload.empresa}.` : "",
    payload.correo ? `Correo: ${payload.correo}.` : "",
    `Teléfono: ${payload.telefono}.`,
    payload.ciudad ? `Ciudad: ${payload.ciudad}.` : "",
    payload.interes ? `Interés: ${payload.interes}.` : "",
    `Mensaje: ${payload.mensaje}`,
  ].filter(Boolean);

  return parts.join(" ");
};

const bindWhatsAppFlow = () => {
  ensureWhatsAppModal();

  const modal = document.querySelector("[data-whatsapp-modal]");
  const form = document.querySelector("[data-whatsapp-form]");
  const status = document.querySelector("[data-whatsapp-status]");
  const submitButton = document.querySelector("[data-whatsapp-submit]");

  if (!modal || !form || !status || !submitButton) {
    return;
  }

  let previousActiveElement = null;

  const closeModal = () => {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    status.textContent = "";
    status.className = "form-status";
    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  };

  const openModal = (trigger) => {
    previousActiveElement = trigger instanceof HTMLElement ? trigger : document.activeElement;
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.setTimeout(() => {
      const firstField = form.querySelector("input, select, textarea");
      if (firstField instanceof HTMLElement) {
        firstField.focus();
      }
    }, 40);
  };

  if (!document.querySelector(".whatsapp-float")) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "whatsapp-float";
    button.setAttribute("aria-label", "Abrir formulario de WhatsApp");
    button.innerHTML = `
      <span class="whatsapp-float-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="presentation" focusable="false">
          <path d="M27.2 4.8A14.3 14.3 0 0 0 4.8 22.2L3 29l7-1.8A14.3 14.3 0 1 0 27.2 4.8Zm-11.1 22c-2.2 0-4.4-.6-6.2-1.8l-.5-.3-4.2 1.1 1.1-4.1-.3-.5a11.8 11.8 0 1 1 10.1 5.6Zm6.5-8.8c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2l-.7.9c-.2.3-.4.3-.8.1-2.2-1.1-3.7-3.3-3.8-3.5-.2-.3 0-.5.1-.7l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6 0-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.2 3.3c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4Z"/>
        </svg>
      </span>
      <span class="whatsapp-float-text">WhatsApp</span>
    `;
    document.body.append(button);
    button.addEventListener("click", () => openModal(button));
  }

  document.querySelectorAll("[data-whatsapp-close]").forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.fecha = new Date().toISOString();
    payload.origen = `WhatsApp web - ${document.title}`;

    status.textContent = "";
    status.className = "form-status";
    submitButton.disabled = true;
    submitButton.textContent = "Guardando...";

    try {
      await submitLead(payload, LEADS_ENDPOINT);

      const text = buildWhatsAppMessage(payload);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      status.textContent = "Lead guardado. Abriendo WhatsApp...";
      status.classList.add("is-success");
      window.open(whatsappUrl, "_blank", "noopener");
      form.reset();
      window.setTimeout(() => {
        closeModal();
      }, 400);
    } catch (error) {
      status.textContent =
        "No pudimos guardar este lead en Google Sheets. Revisa el Apps Script e intenta otra vez.";
      status.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Guardar y abrir WhatsApp";
    }
  });
};

bindContactForm();
bindWhatsAppFlow();
