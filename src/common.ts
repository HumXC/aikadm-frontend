export function applyZoom(zoom: number) {
    document.documentElement.style.fontSize = `${zoom * 16}px`;
    document.documentElement.style.setProperty("--icon-size", `${zoom * 24}px`);
}
