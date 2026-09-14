// ---------------------------------------------------------
// Mobile navigation toggle (used on every page)
// ---------------------------------------------------------
(function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".header-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close menu" : "Menu";
  });

  // Close the menu when a link inside it is used
  links.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
})();

// ---------------------------------------------------------
// Contact form validation (about.html)
// ---------------------------------------------------------
(function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const contactRelayUrl = "https://script.google.com/macros/s/AKfycbxUR3IlveEADe3b9JrogC5-4vZrYNETchNDQJaT-f5s_m7XITa4MGUDRWjksz61M4Om/exec";
  const errorSummary = document.getElementById("error-summary");
  const errorList = document.getElementById("error-list");
  const successMessage = document.getElementById("success-message");
  const submitButton = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById("form-status");

  const fields = {
    name: {
      input: document.getElementById("cf-name"),
      errorEl: document.getElementById("cf-name-error"),
      label: "Name",
      validate: (value) => (value.trim().length >= 2 ? "" : "Enter your name (at least 2 characters)."),
    },
    email: {
      input: document.getElementById("cf-email"),
      errorEl: document.getElementById("cf-email-error"),
      label: "Email",
      validate: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) ? "" : "Enter a valid email address, like name@example.com.";
      },
    },
    message: {
      input: document.getElementById("cf-message"),
      errorEl: document.getElementById("cf-message-error"),
      label: "Message",
      validate: (value) => (value.trim().length >= 10 ? "" : "Say a little more \u2014 at least 10 characters."),
    },
  };

  function validateReason() {
    const checked = form.querySelector('input[name="reason"]:checked');
    const errorEl = document.getElementById("cf-reason-error");
    if (!checked) {
      if (errorEl) errorEl.textContent = "Choose a reason for getting in touch.";
      return "Choose a reason for getting in touch.";
    }
    if (errorEl) errorEl.textContent = "";
    return "";
  }

  function validateField(key) {
    const field = fields[key];
    const message = field.validate(field.input.value);
    field.errorEl.textContent = message;
    field.input.setAttribute("aria-invalid", message ? "true" : "false");
    return message;
  }

  // Live validation as each field is left
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    field.input.addEventListener("blur", () => validateField(key));
    field.input.addEventListener("input", () => {
      if (field.input.getAttribute("aria-invalid") === "true") validateField(key);
    });
  });

  form.querySelectorAll('input[name="reason"]').forEach((radio) => {
    radio.addEventListener("change", validateReason);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    successMessage.hidden = true;
    if (formStatus) formStatus.textContent = "";

    const messages = [];
    Object.keys(fields).forEach((key) => {
      const message = validateField(key);
      if (message) messages.push({ id: fields[key].input.id, label: fields[key].label, message });
    });
    const reasonMessage = validateReason();
    if (reasonMessage) messages.push({ id: "cf-reason-group", label: "Reason", message: reasonMessage });

    if (messages.length > 0) {
      errorList.innerHTML = "";
      messages.forEach((item) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#" + item.id;
        link.textContent = item.label + ": " + item.message;
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.getElementById(item.id);
          if (target) target.focus();
        });
        li.appendChild(link);
        errorList.appendChild(li);
      });
      errorSummary.hidden = false;
      errorSummary.focus();
      return;
    }

    errorSummary.hidden = true;
    const formData = new URLSearchParams(new FormData(form));
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    form.setAttribute("aria-busy", "true");
    if (formStatus) formStatus.textContent = "Sending your message.";

    try {
      await fetch(contactRelayUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: formData,
      });
      form.reset();
      Object.keys(fields).forEach((key) => fields[key].input.setAttribute("aria-invalid", "false"));
      successMessage.hidden = false;
      successMessage.focus();
    } catch (error) {
      console.error("Contact form submission failed.", error);
      successMessage.textContent = "Sorry - your message could not be sent. Please try again.";
      successMessage.hidden = false;
      successMessage.focus();
    } finally {
      form.removeAttribute("aria-busy");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
      if (formStatus) formStatus.textContent = "";
    }
  });
})();
