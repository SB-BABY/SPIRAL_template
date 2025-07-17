

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuButton = document.querySelector(".header__menu-button");
  const mobileMenu = document.querySelector(".header__nav--mobile");

  menuButton.addEventListener("click", function () {
    const isOpen = mobileMenu.style.display === "flex";
    mobileMenu.style.display = isOpen ? "none" : "flex";

    // Toggle icon
    const icon = menuButton.querySelector("i");
    if (isOpen) {
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-line");
    } else {
      icon.classList.remove("ri-menu-line");
      icon.classList.add("ri-close-line");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll(
    ".header__nav--mobile .header__nav-item"
  );
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.style.display = "none";
      const icon = menuButton.querySelector("i");
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-line");
    });
  });

  // Модальное окно
  const modal = document.getElementById("orderModal");
  const openModalButtons = document.querySelectorAll(
    ".promotions__order-button, [data-modal-open]"
  );
  const closeModalButton = document.querySelector(".modal__close");
  const orderForm = document.getElementById("orderForm");
  const serviceSelect = document.getElementById("service");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const agreeCheckbox = document.getElementById("agree");
  const submitButton = document.querySelector(".modal__submit");

  // Открытие модального окна
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Если это кнопка из карточки услуги
      if (this.classList.contains("promotions__order-button")) {
        const card = this.closest(".promotions__card");
        const serviceName = card.querySelector(
          ".promotions__card-title"
        ).textContent;
        const serviceDescription = card.querySelector(
          ".promotions__card-description"
        ).textContent;

        openModal();
        // Подставляем данные из карточки
        serviceSelect.value = serviceName;
        // Можно также добавить описание в textarea
        document.getElementById(
          "message"
        ).value = `Интересует услуга: ${serviceName}\n${serviceDescription}`;
      } else {
        // Обычное открытие модального окна
        openModal();
      }

      validateForm();
    });
  });

  // Закрытие модального окна
  closeModalButton.addEventListener("click", closeModal);
  modal.querySelector(".modal__overlay").addEventListener("click", closeModal);

  // Валидация формы
  [serviceSelect, nameInput, phoneInput, agreeCheckbox].forEach((element) => {
    element.addEventListener("input", validateForm);
    element.addEventListener("change", validateForm);
  });

  // Отправка формы
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Заявка отправлена! Мы скоро с вами свяжемся.");
    closeModal();
    this.reset();
  });

  function openModal() {
    modal.classList.add("modal--active");
    document.body.style.overflow = "hidden";
    // Фокус на первом поле
    nameInput.focus();
  }

  function closeModal() {
    modal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }

  function validateForm() {
    const isServiceValid = serviceSelect.value !== "";
    const isNameValid = nameInput.value.trim() !== "";
    const isPhoneValid = phoneInput.value.trim() !== "";
    const isAgreed = agreeCheckbox.checked;

    // Подсветка ошибок
    serviceSelect.classList.toggle("modal__error", !isServiceValid);
    nameInput.classList.toggle("modal__error", !isNameValid);
    phoneInput.classList.toggle("modal__error", !isPhoneValid);

    // Активация кнопки
    submitButton.disabled = !(
      isServiceValid &&
      isNameValid &&
      isPhoneValid &&
      isAgreed
    );
  }
});