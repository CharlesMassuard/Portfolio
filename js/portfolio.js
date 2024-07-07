async function fetchAndDisplayProjets() {
    try {
        const response = await fetch("../BD/portfolio.json");
        const data = await response.json();
        const gridProjet = document.getElementById("gridProjets");

        data.projets.forEach(projet => {
            const projetDiv = document.createElement("div");
            projetDiv.className = "projet";
            projetDiv.innerHTML = `
                <img src="${projet.img}" alt="Image du projet" title="Voir le projet">
                <h2 title="Voir le projet">${projet.nom}</h2>
            `;
            gridProjet.appendChild(projetDiv);
        });
    } catch (error) {
        console.error('Error fetching projects', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchAndDisplayProjets();
});