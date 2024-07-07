async function fetchAndDisplayProjets() {
    try {
        const response = await fetch("../BD/portfolio.json");
        const data = await response.json();
        const gridProjet = document.getElementsByClassName("gridProjets");

        data.projets.forEach(projet => {
            const projetDiv = document.createElement("div");
            projetDiv.className = "projet";
            projetDiv.innerHTML = `
                <img src="${projet.img}" alt="Image du projet" title="Voir le projet">
                <h2 title="Voir le projet">${projet.nom}</h2>
            `;
            Array.from(document.getElementsByClassName("gridProjets")).forEach(gridProjet => {
                gridProjet.appendChild(projetDiv.cloneNode(true)); //ajouter au computer et au mobile
            });
        });
    } catch (error) {
        console.error('Error fetching projects', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchAndDisplayProjets();
});