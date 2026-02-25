function initFormValidation() {
  const forms = document.querySelectorAll("[data-validate='contact-form']");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      const fields = {
        name: form.querySelector("input[name='name']"),
        phone: form.querySelector("input[name='phone']"),
        email: form.querySelector("input[name='email']"),
        message: form.querySelector("textarea[name='message']"),
      };

      let valid = true;

      function setError(field, message) {
        if (!field) return;
        const wrapper = field.closest(".field-group");
        if (!wrapper) return;
        let error = wrapper.querySelector(".field-error");
        if (!error) {
          error = document.createElement("div");
          error.className = "field-error";
          wrapper.appendChild(error);
        }
        error.textContent = message;
      }

      function clearError(field) {
        if (!field) return;
        const wrapper = field.closest(".field-group");
        if (!wrapper) return;
        const error = wrapper.querySelector(".field-error");
        if (error) error.remove();
      }

      Object.values(fields).forEach(clearError);

      if (fields.name && fields.name.value.trim().length < 3) {
        setError(fields.name, "Please enter your full name.");
        valid = false;
      }

      const phonePattern = /^[0-9\s+\-]{8,15}$/;
      if (!fields.phone || !phonePattern.test(fields.phone.value.trim())) {
        setError(fields.phone, "Please enter a valid phone number.");
        valid = false;
      }

      if (fields.email && fields.email.value.trim() !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(fields.email.value.trim())) {
          setError(fields.email, "Please enter a valid email (or leave blank).");
          valid = false;
        }
      }

      if (!fields.message || fields.message.value.trim().length < 10) {
        setError(fields.message, "Please tell us a little about your concern.");
        valid = false;
      }

      if (!valid) {
        event.preventDefault();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initFormValidation);

