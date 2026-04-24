const themeButtons = document.querySelectorAll("[data-theme]");
const body = document.body;
const themeIcon = document.getElementById("themeIcon");
const emailBadge = document.getElementById("email");
const githubBadge = document.getElementById("github");

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>`;

function updateThemeIcon() {
  const currentTheme = body.getAttribute("data-bs-theme") || "light";
  themeIcon.innerHTML = currentTheme === "light" ? sunIcon : moonIcon;
}

function updateBadgeColors() {
  const currentTheme = body.getAttribute("data-bs-theme") || "light";

  if (currentTheme === "dark") {
    emailBadge.classList.remove("bg-secondary");
    emailBadge.classList.add("bg-light", "text-dark");

    githubBadge.classList.remove("bg-dark");
    githubBadge.classList.add("bg-warning", "text-dark");
    return;
  }

  emailBadge.classList.remove("bg-light", "text-dark");
  emailBadge.classList.add("bg-secondary");

  githubBadge.classList.remove("bg-warning", "text-dark");
  githubBadge.classList.add("bg-dark");
}

function updateThemeButtons() {
  const currentTheme = body.getAttribute("data-bs-theme") || "light";

  themeButtons.forEach((button) => {
    if (button.getAttribute("data-theme") === currentTheme) {
      button.classList.add("active");
      button.setAttribute("disabled", "");
    } else {
      button.classList.remove("active");
      button.removeAttribute("disabled");
    }
  });

  updateThemeIcon();
  updateBadgeColors();
}

themeButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const theme = this.getAttribute("data-theme");
    body.setAttribute("data-bs-theme", theme);
    updateThemeButtons();
  });
});

updateThemeButtons();
