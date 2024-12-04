document.addEventListener('DOMContentLoaded', function() {

    var originalRightBackground = document.querySelector('.right-side').style.backgroundImage;

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

    displayLastProjet();

    window.voirLastProjet = async function(){ 
        console.log("Clicked");
        const response = await fetch("../BD/portfolio.json");
        const data = await response.json();
        window.location.href = `./html/projet.html?id=${data.projets[data.projets.length - 1].id}`;
    };

    async function displayLastProjet() {
        try {
            const response = await fetch("../BD/portfolio.json");
            const data = await response.json();
            document.getElementById("deuxiemePageCentre").innerHTML = `
                <h1>Mon dernier projet</h1>
                <img id=lastProjetImg src="${data.projets[data.projets.length - 1].img[0]}" alt="Image du dernier projet" title="Voir le projet" onClick="voirLastProjet()">
                <a href="./html/projet.html?id=${data.projets[data.projets.length - 1].id}"><h2 title="Voir le projet">${data.projets[data.projets.length - 1].nom}</h2></a>
            `;
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    }

    //changement arriere plan si hover

    document.getElementById("devText").addEventListener("mouseover", function() {
        document.querySelector('.right-side').style.backgroundImage = "url('../static/img/dev.png')";
        document.querySelector('.right-side').style.color = "white";
    });


    document.getElementById("devText").addEventListener("mouseout", function() {
        document.querySelector('.right-side').style.backgroundImage = originalRightBackground;
        document.querySelector('.right-side').style.color = "black";
    });

    document.getElementById("droneText").addEventListener("mouseover", function() {
        document.querySelector('.right-side').style.backgroundImage = "url('../static/img/drone.webp')";
        document.querySelector('.right-side').style.color = "white";

    });

    document.getElementById("droneText").addEventListener("mouseout", function() {
        document.querySelector('.right-side').style.backgroundImage = originalRightBackground;
        document.querySelector('.right-side').style.color = "black";
    });
});