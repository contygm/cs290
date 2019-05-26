// Citation: Modified and Adapted carousel https://www.w3schools.com/howto/howto_js_slideshow.asp-
function nextSlide(num) {
    
    let activeIndex = $(".slide.active").attr("index");
    activeIndex = parseInt(activeIndex);

    if(num) {
        activeIndex++;
        activateSlide(activeIndex);
        return;
    }
    activeIndex--;
    activateSlide(activeIndex);
}

// Thumbnail image controls
function currentSlide(index) {
    activateSlide(index);
}

function activateSlide(index) {
    const slides = $(".slide");
    const dots = $(".dot");

    // bounds checks
    if (index > 2) {
        index = 0;
    }

    if (index < 0) {
        index = 2;
    }

    // set non-active slides/dots
    for (i = 0; i < 3; i++) {
        if(slides[i].className === "slide active") {
            slides[i].className = "slide"; 
        }
    }

    for (i = 0; i < 3; i++) {
        // if active, set to not
        if (dots[i].className === "dot active") {
            dots[i].className = "dot";
        }
    }

    // set active slide/dot
    slides[index].className = "slide active"; 
    dots[index].className = "dot active"
}

