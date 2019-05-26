function nextSlide(num) {
    console.log("next slide", num);
    
    let activeIndex = $(".slide.active").attr("index");
    activeIndex = parseInt(activeIndex);
    console.log("next slide activeIndex", activeIndex, typeof activeIndex)

    if(num) {
        activeIndex++;
        console.log("true", activeIndex, typeof activeIndex);
        activateSlide(activeIndex);
        return;
    }
    activeIndex--;
    console.log("false", activeIndex, typeof activeIndex)
    activateSlide(activeIndex);
}

// Thumbnail image controls
function currentSlide(index) {
    activateSlide(index);
}

function activateSlide(index) {
    console.log("activateSlide", index);

    const slides = $(".slide");
    const dots = $(".dot");

    // bounds checks
    if (index > 2) {
        index = 0;
    }

    if (index < 0) {
        index = 2;
    }

    console.log("bounds activateSlide", index);

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

