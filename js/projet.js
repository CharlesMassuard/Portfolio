import ProjetsProvider from "../services/projetsProvider.js";
import TechnosProvider from "../services/technosProvider.js";

async function loadProjectDetails() {
    const projectId = getProjectIdFromUrl();
    try {
        const projet = await ProjetsProvider.getProjet(projectId);
        var titreProjet = document.getElementById('titreProjet');
        if (projet) {
            titreProjet.textContent = projet.nom;
            loadProjectImages(projet.img); // Appel de la fonction pour charger les images
            document.getElementById('descriptionProjet').innerHTML = projet.description; //innerHTML Permet de pouvoir utiliser des balises pour la mise en page
            document.getElementById("bottom").innerHTML = `
                <div id="info">
                    <p><b>Cadre : </b>${projet.cadre}</p>
                </div>
                <div id="boutonsBottom"></div>`;
            if(projet.github) {
                document.getElementById("boutonsBottom").innerHTML += `
                    <a class="btn git" href="${projet.github}" target="_blank"><i class="fa fa-github"></i> Accéder au GitHub <i class="fa fa-external-link"></i></a>`;
            }
            if(projet.site) {
                document.getElementById("boutonsBottom").innerHTML += `
                    <br>
                    <a class="btn site" href="${projet.site}" target="_blank">&#127760 Accéder au Site <i class="fa fa-external-link"></i></a>
                    <i id=textSite>${projet.site}</i>`;
            }
            if(projet.technos){
                let technos = [];
                for (let i = 0; i < projet.technos.length; i++) {
                    technos.push(await TechnosProvider.getTechno(projet.technos[i]));
                }
                technos.forEach(techno => {
                    document.getElementById("technoProjet").innerHTML += `
                        <img src="${techno.img}" alt="${techno.nom}" title="${techno.nom}" class="technoImg">`;
                });
            }
        }
        return projet;
    } catch (error) {
        console.error("Failed to load project details:", error);
    }
}

function getProjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

async function loadProjectImages(imagesprojet) {
    let slideshow = document.getElementById('slideshow-container');
    for (let i = 0; i < imagesprojet.length; i++) {
        if (await imageExists(imagesprojet[i])) {
            slideshow.innerHTML += `
            <div class="mySlides fade">
                <img src="${imagesprojet[i]}" id="img${i}"style="width:100%" alt="Image ${i}" onClick="swapTailleImage(${i})">
            </div>`;
            dots.innerHTML += `<span class="dot" onclick="currentSlide(${i+1})" title="Afficher l'image ${i+1}"></span>`;
        }
    }
    slideshow.innerHTML += `
        <!-- Next and previous buttons -->
        <a class="prev" onclick="plusSlides(-1)" title="Afficher l'image précédnete">&#10094;</a>
        <a class="next" onclick="plusSlides(1)" title="Afficher l'image suivante">&#10095;</a>`;
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };

    // Thumbnail image controls
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1;}
        if (n < 1) {slideIndex = slides.length;}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    document.getElementById('caroussel').addEventListener('mouseover', function() {
        document.querySelector('.prev').style.opacity = '1';
        document.querySelector('.next').style.opacity = '1';
    });

    document.getElementById('caroussel').addEventListener('mouseout', function() {
        document.querySelector('.prev').style.opacity = '0';
        document.querySelector('.next').style.opacity = '0';
    });
}


document.addEventListener('DOMContentLoaded', loadProjectDetails);
    
window.swapTailleImage = function(i){
    let img = document.getElementById("img"+i);
    // Utilisez getComputedStyle pour obtenir toutes les propriétés CSS calculées
    var style = window.getComputedStyle(img);
    // Accédez à la propriété max-height
    var maxHeightPx = style.maxHeight; // La valeur est en pixels (ex: "500px")
    // Convertissez cette valeur en nombre
    var maxHeightValue = parseFloat(maxHeightPx); // Convertit "500px" en 500

    var precButton = document.querySelector('.prev');

    if (maxHeightValue == 500) {
        img.style.width = "90vw";
        img.style.maxHeight = "90vh";
        img.style.height = "auto";
        img.style.cursor = "zoom-out";
        img.style.position = "fixed";
        img.style.top = "70px";
        img.style.zIndex = "1000";
        img.style.left = "5vw";
        precButton.style.display = "none";
    } else {
        img.style.maxHeight = "500px";
        img.style.zIndex = "0";
        img.style.width = "48vw";
        img.style.position = "relative";
        img.style.cursor = "zoom-in";
        img.style.top = "0";
        img.style.left = "";
        precButton.style.display = "block";
    }
}