document.addEventListener('DOMContentLoaded', function() {
    
    var count = 0;

    //Never gonna give you up si 5 clics (easteregg n°1)
    document.getElementById("logoNavBar").addEventListener("click", function() {
        console.log("Clicked");
        count++;
        if (count == 5) {
            count = 0;
            window.open("https://youtu.be/dQw4w9WgXcQ?si=83OgelfkkR2b5ao3", "_blaznk")
        }
    });

    let burger = document.getElementById('burger'),
	 nav    = document.getElementById('main-nav'),
	 slowmo = document.getElementById('slowmo');

    burger.addEventListener('click', function(e){
        this.classList.toggle('is-open');
        nav.classList.toggle('is-open');
        if(nav.classList.contains('is-open')) {
            document.getElementById("voirPlusTel").style.zIndex = "0";
        } else {    
            document.getElementById("voirPlusTel").style.zIndex = "2000";
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