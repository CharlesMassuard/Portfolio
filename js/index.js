document.addEventListener('DOMContentLoaded', function() {
    var texts1 = document.querySelectorAll('.animated-text');
    texts1.forEach(function(text1) {
        text1.innerHTML = text1.textContent.replace(/\S/g, function(letter, index) {
            return `<span class='letter' style='--i: ${index}'>${letter}</span>`;
        });
    });

    var texts2 = document.querySelectorAll('.animated-text-bottom');
    texts2.forEach(function(text2) {
        var text2Content = text2.textContent;
        text2.textContent = '';

        var duration = text2.textContent.length * 0.5;

        setTimeout(function() {
            text2.innerHTML = text2Content.replace(/\S/g, function(letter, index) {
                return `<span class='letter' style='--i: ${index}'>${letter}</span>`;
            });
        }, duration * 70);
    });

    window.onload = function() {
        adjustBottomScreenHeight();
    };
    
    window.onresize = function() {
        adjustBottomScreenHeight();
    };
    
    function adjustBottomScreenHeight() {
        var windowHeight = window.innerHeight;
        var navbarHeight = document.querySelector('header').offsetHeight;
        var topScreenHeight = document.querySelector('.top-screen').offsetHeight;
        var bottomScreenHeight = windowHeight - navbarHeight - topScreenHeight;
        
        document.querySelector('.bottom-screen').style.height = bottomScreenHeight + 'px';
    }

    document.getElementById("voirPlusTel").addEventListener("click", function() {
        window.location.href = "./html/portfolio.html";
    });

    async function displayProjects() {
        const response = await fetch("../BD/portfolio.json");
        const data = await response.json();
    
        // Separate "Coup de coeur" projects from others
        const coupDeCoeurProjects = data.projets.filter(projet => projet.coupDeCoeur).reverse();
        const otherProjects = data.projets.filter(projet => !projet.coupDeCoeur).reverse();
    
        // Combine the projects with "Coup de coeur" first, sorted by addition order
        const sortedProjects = [...coupDeCoeurProjects, ...otherProjects];
    
        sortedProjects.forEach(projet => {
            let divCards = document.querySelector('.card-group');
    
            if (!projet.templateImg) {
                projet.templateImg = projet.img[0];
            }
    
            let tagsHTML = '';
            if (projet.tags && projet.tags.length > 0) {
                projet.tags.forEach(tag => {
                    tagsHTML += `<span class="tag">${tag}</span>`;
                });
            }
    
            let newCard = `
            <div class="card" title="${projet.nom}" onclick="window.location.href='./html/projet.html?id=${projet.id}'">
                <img src="${projet.templateImg}" class="card-image" title="${projet.nom}" alt="Image du projet">
                <div class="card-overlay">
                    <div class="blur-mask"></div>
                    <div class="card-content">
                        <h2 class="card-title">
                            ${projet.nom}
                            <span class="card-tag">${projet.cadre}</span>
                        </h2>
                        <p class="card-description">${projet.littleDescription}</p>
                        <div class="card-tags">
                            ${tagsHTML}
                        </div>
                        <button class="card-button">Voir le projet</button>
                    </div>
                </div>
            </div>`;
            divCards.insertAdjacentHTML('beforeend', newCard);
        });
    }

    displayProjects();
});