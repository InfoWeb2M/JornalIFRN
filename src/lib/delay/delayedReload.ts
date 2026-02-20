export function delayedReload(delay = 3000) {
  setTimeout(() => window.location.reload(), delay);
}
