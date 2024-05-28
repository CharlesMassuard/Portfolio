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
});