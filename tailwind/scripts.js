const root = document.documentElement;
const body = document.body;
const themeIcon = document.getElementById("themeIcon");
const themeTrigger = document.getElementById("themeTrigger");
const themeMenu = document.getElementById("themeMenu");
const themeButtons = document.querySelectorAll(".theme-option");
const emailBadge = document.getElementById("email");
const githubBadge = document.getElementById("github");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const menu = document.getElementById("menu");

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
`;

function getCurrentTheme() {
  return root.classList.contains("dark") ? "dark" : "light";
}

function setTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
}

function updateThemeIcon() {
  themeIcon.innerHTML = getCurrentTheme() === "light" ? sunIcon : moonIcon;
}

function updateThemeButtons() {
  const currentTheme = getCurrentTheme();
  themeButtons.forEach((button) => {
    const isCurrent = button.dataset.theme === currentTheme;
    button.disabled = isCurrent;
    button.setAttribute("aria-pressed", String(isCurrent));
    button.classList.toggle("bg-slate-100", isCurrent);
    button.classList.toggle("dark:bg-slate-800", isCurrent);
    button.classList.toggle("font-semibold", isCurrent);
  });
}

function updateBadgeColors() {
  const isDark = getCurrentTheme() === "dark";
  emailBadge.className = isDark
    ? "rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900"
    : "rounded-full bg-slate-500 px-4 py-2 text-sm font-medium text-white";
  githubBadge.className = isDark
    ? "rounded-full bg-amber-400 px-4 py-2 text-sm font-medium text-slate-900"
    : "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white";
}

function renderThemeState() {
  updateThemeIcon();
  updateThemeButtons();
  updateBadgeColors();
}

themeTrigger.addEventListener("click", () => {
  const isOpen = themeMenu.classList.contains("visible");
  themeMenu.classList.toggle("visible", !isOpen);
  themeMenu.classList.toggle("opacity-100", !isOpen);
  themeMenu.classList.toggle("invisible", isOpen);
  themeMenu.classList.toggle("opacity-0", isOpen);
  themeTrigger.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", (event) => {
  if (
    !themeMenu.contains(event.target) &&
    !themeTrigger.contains(event.target)
  ) {
    themeMenu.classList.remove("visible", "opacity-100");
    themeMenu.classList.add("invisible", "opacity-0");
    themeTrigger.setAttribute("aria-expanded", "false");
  }
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
    renderThemeState();
    themeMenu.classList.remove("visible", "opacity-100");
    themeMenu.classList.add("invisible", "opacity-0");
    themeTrigger.setAttribute("aria-expanded", "false");
  });
});

mobileMenuButton.addEventListener("click", () => {
  const isOpen = !menu.classList.contains("hidden");
  menu.classList.toggle("hidden", isOpen);
  menu.classList.toggle("flex", !isOpen);
  mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
});

renderThemeState();
