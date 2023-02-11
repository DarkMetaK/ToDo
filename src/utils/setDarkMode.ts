export function setDarkMode() {
  const htmlRoot = document.documentElement
  htmlRoot.classList.toggle('dark')
}