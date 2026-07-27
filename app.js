document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  const cartButton = document.querySelector("#cart-btn");
  const cartBadge = document.querySelector("#cart-badge");
  let count = 0;
  if (cartButton && cartBadge) {
    cartBadge.hidden = true;
    cartButton.addEventListener("click", () => {
      count += 1;
      cartBadge.hidden = false;
      cartBadge.textContent = String(count);
    });
  }

  const activationForm = document.querySelector("#code-form");
  const activationMessage = document.querySelector("#code-message");
  activationForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    activationMessage.textContent =
      "Activation is disabled in this static student prototype. No access code is validated in the browser.";
  });
});
