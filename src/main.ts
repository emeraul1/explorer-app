import './style.css'

const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const mainMenu = document.querySelector<HTMLElement>("#mobile-menu");
const menuIcon = document.querySelector<HTMLImageElement>("#menu-icon");

function setMenuState(isOpen: boolean): void {
  mainMenu?.classList.toggle("hidden", !isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  if (menuIcon) {
    menuIcon.src = isOpen
      ? "./src/assets/icons/close.svg"
      : "./src/assets/icons/menu.svg";
  }

}
menuButton?.addEventListener("click", (): void => {
  const isOpen: boolean =
    menuButton.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});