document.addEventListener('DOMContentLoaded', function() {
    var text1 = document.querySelector('.animated-text');
    text1.innerHTML = text1.textContent.replace(/\S/g, function(letter, index) {
        return `<span class='letter' style='--i: ${index}'>${letter}</span>`;
    });

    var text2 = document.querySelector('.animated-text-bottom');
    var text2Content = text2.textContent;
    text2.textContent = '';

    var duration = text1.textContent.length * 0.5;

    setTimeout(function() {
        text2.innerHTML = text2Content.replace(/\S/g, function(letter, index) {
            return `<span class='letter' style='--i: ${index}'>${letter}</span>`;
        });
    }, duration * 70);
});