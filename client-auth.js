const CLIENT_ACCESS_KEY = "flex-ai-client-access";
const CLIENT_USERNAME = "client";
const CLIENT_PASSWORD = "flex2026";

function hasClientAccess() {
  return sessionStorage.getItem(CLIENT_ACCESS_KEY) === "granted";
}

function requireClientAccess() {
  if (!hasClientAccess()) {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const next = encodeURIComponent(currentPath.replace(/^\//, "") || "client-concepts.html");
    window.location.href = `/client-login.html?next=${next}`;
  }
}

function wireLoginForm() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  const error = document.querySelector("[data-login-error]");
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next") || "client-concepts.html";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
      sessionStorage.setItem(CLIENT_ACCESS_KEY, "granted");
      window.location.href = next.startsWith("/") ? next : `/${next}`;
      return;
    }

    if (error) {
      error.hidden = false;
    }
  });
}

function wireLogout() {
  const buttons = document.querySelectorAll("[data-logout]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      sessionStorage.removeItem(CLIENT_ACCESS_KEY);
      window.location.href = "client-login.html";
    });
  });
}

wireLoginForm();
wireLogout();
