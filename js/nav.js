document.addEventListener('DOMContentLoaded', function() {

    //detection si mobile le temps du développement -> affiche page erreur
    function isMobileDevice() {
        console.log(window.innerWidth);
        return window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    }
    
    if (isMobileDevice()) {
        window.location.href = "/html/erreurMobile.html";  // Redirige vers une page d'erreur
    }    
    
    //chargement du header
    // Chargement du header
    fetch('/html/navBarPC.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#computer header').innerHTML = data;

            // Une fois le menu chargé, ajouter la classe "select" au lien actif
            highlightActiveLink();
        });

        // Fonction pour ajouter la classe "select" au lien correspondant à la page actuelle
        function highlightActiveLink() {
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('#computer nav a');

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
        
                // Vérification standard
                if (currentPath === linkPath) {
                    link.classList.add('select');
                }
        
                // Cas particulier : si on est dans une sous-page de portfolio
                if (currentPath.includes('/html/projet.html') || currentPath.includes('/html/portfolio.html')) {
                    document.querySelector('a[href="/html/portfolio.html"]').classList.add('select');
                }
            });
        }   
    //

    var count = 0;

    //Never gonna give you up si 5 clics (easteregg n°1)
    document.getElementById("logoNavBar").addEventListener("click", function() {
        console.log("Clicked");
        count++;
        if (count == 5) {
            count = 0;
            window.open("https://youtu.be/dQw4w9WgXcQ?si=83OgelfkkR2b5ao3", "_blank")
        }
    });

    var logoMobile = document.getElementsByClassName("logoMobile");

    for (let i = 0; i < logoMobile.length; i++) {
        logoMobile[i].addEventListener("click", function() {
            window.location.href = "../index.html";
        });
    }

    let burger = document.getElementById('burger'),
	 nav    = document.getElementById('main-nav'),
	 slowmo = document.getElementById('slowmo');

    burger.addEventListener('click', function(e){
        this.classList.toggle('is-open');
        nav.classList.toggle('is-open');
        if(nav.classList.contains('is-open')) { 
            document.querySelectorAll(".device").forEach(device => {
                device.style.height = "100%";
            });
        } else {
            document.querySelectorAll(".device").forEach(device => {
                device.style.height = "0%"; //permet d'accéder aux boutons
            });
        }
    });

    slowmo.addEventListener('click', function(e){
        this.classList.toggle('is-slowmo');
    });

    /* Onload demo - dirty timeout */
    let clickEvent = new Event('click');

    window.addEventListener('load', function(e) {
        slowmo.dispatchEvent(clickEvent);
        burger.dispatchEvent(clickEvent);
        
        setTimeout(function(){
            burger.dispatchEvent(clickEvent);
            
            setTimeout(function(){
                slowmo.dispatchEvent(clickEvent);
            }, 3500);
        }, 5500);
    });
});