
function adjustLogoSpacing() {
    const container = document.querySelector(".brand-text");
    if (!container) return;

    const lines = [...container.children];

    // Réinitialiser les mesures précédentes
    container.style.width = "";
    
    lines.forEach(line => {
        line.style.letterSpacing = "0px";
        line.style.width = "max-content";
    });

    // Mesurer les textes sans espacement
    const widths = lines.map(line => {
        const range = document.createRange();
        range.selectNodeContents(line);
        return range.getBoundingClientRect().width;
    });

    // Le mot le plus large sert de référence
    const targetWidth = Math.max(...widths);

    // Donner une largeur commune à toutes les lignes
    container.style.width = `${targetWidth}px`;

    lines.forEach((line, index) => {
        const count = [...line.textContent.trim()].length;

        if (count < 2) return;

        // CSS ajoute un espacement par caractère
        const spacing = (targetWidth - widths[index]) / (count);

        line.style.letterSpacing = `${spacing}px`;
    });
}

// Attendre le chargement des polices
document.fonts.ready.then(adjustLogoSpacing);

window.addEventListener("resize", adjustLogoSpacing);
