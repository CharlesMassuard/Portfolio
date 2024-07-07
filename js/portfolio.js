async function fetchAndDisplayProjets() {
    try {
        const response = await fetch("../BD/portfolio.json");
        const data = await response.json();
        const gridProjet = document.getElementsByClassName("gridProjets");

        data.projets.forEach(projet => {
            const projetDiv = document.createElement("div");
            projetDiv.className = "projet";
            projetDiv.setAttribute('data-id', projet.id);
            projetDiv.innerHTML = `
                <img src="${projet.img[0]}" alt="Image du projet" title="Voir le projet">
                <h2 title="Voir le projet">${projet.nom}</h2>
            `;
            Array.from(document.getElementsByClassName("gridProjets")).forEach(gridProjet => {
                const clonedProjetDiv = projetDiv.cloneNode(true);
                clonedProjetDiv.addEventListener('click', function() {
                    window.location.href = `projet.html?id=${this.getAttribute('data-id')}`;
                });
                gridProjet.appendChild(clonedProjetDiv);
            });
        });
    } catch (error) {
        console.error('Error fetching projects', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchAndDisplayProjets();
});