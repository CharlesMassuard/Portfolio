async function fetchProjets() {
    try {
        const response = await fetch("../BD/portfolio.json");
        const json = await response.json();
        
        for (let i = 0; i < json.length; i++) {
            console.log(json[i]);
        }
        
        return json;
    } catch (error) {
        console.error('Error fetching projects', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchProjets();
});