document.addEventListener("DOMContentLoaded", function () {

    var SLIDE_INTERVAL = 5000;

    var stage = document.querySelector(".page-hero-slideshow");
    if (!stage) return;

    var slides = stage.querySelectorAll(".hero-slide-image");
    var dots = document.querySelectorAll(".page-hero-dot");

    function showSlide(index) {
        slides.forEach(function (slide, i) {
            slide.classList.toggle("is-active", i === index);
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === index);
        });
    }

    var now = Date.now();
    var storedIndex = parseInt(localStorage.getItem("heroSlideIndex"), 10);
    var storedTime = parseInt(localStorage.getItem("heroSlideTime"), 10);

    if (isNaN(storedIndex) || isNaN(storedTime)) {
        storedIndex = 0;
        storedTime = now;
    } else {
        var elapsed = now - storedTime;
        var stepsElapsed = Math.floor(elapsed / SLIDE_INTERVAL);
        if (stepsElapsed > 0) {
            storedIndex = (storedIndex + stepsElapsed) % slides.length;
            storedTime = storedTime + (stepsElapsed * SLIDE_INTERVAL);
        }
    }

    localStorage.setItem("heroSlideIndex", storedIndex);
    localStorage.setItem("heroSlideTime", storedTime);
    showSlide(storedIndex);

    var timer = setInterval(advance, SLIDE_INTERVAL);

    function advance() {
        storedIndex = (storedIndex + 1) % slides.length;
        storedTime = Date.now();
        localStorage.setItem("heroSlideIndex", storedIndex);
        localStorage.setItem("heroSlideTime", storedTime);
        showSlide(storedIndex);
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
            clearInterval(timer);
            storedIndex = i;
            storedTime = Date.now();
            localStorage.setItem("heroSlideIndex", storedIndex);
            localStorage.setItem("heroSlideTime", storedTime);
            showSlide(storedIndex);
            timer = setInterval(advance, SLIDE_INTERVAL);
        });
    });

});
