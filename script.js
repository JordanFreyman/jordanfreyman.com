document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-container");
    const projectTiles = document.querySelectorAll(".project-tile");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    const scrollSpeed = 55; // Try 20 or 30 instead of 5

    let scrollInterval = null;

    const updateArrowVisibility = () => {
        const scrollLeft = carousel.scrollLeft;
        const scrollLimit = carousel.scrollWidth - carousel.clientWidth;

        leftArrow.style.opacity = scrollLeft > 5 ? "1" : "0";
        leftArrow.style.pointerEvents = scrollLeft > 5 ? "auto" : "none";

        rightArrow.style.opacity = scrollLeft < scrollLimit - 5 ? "1" : "0";
        rightArrow.style.pointerEvents = scrollLeft < scrollLimit - 5 ? "auto" : "none";
    };

    const startScrolling = (direction) => {
        stopScrolling(); // just in case
        scrollInterval = setInterval(() => {
            if (direction === "left") {
                carousel.scrollLeft -= scrollSpeed;
            } else if (direction === "right") {
                carousel.scrollLeft += scrollSpeed;
            }
            updateArrowVisibility();
        }, 10); // adjust for smoothness
    };

    const stopScrolling = () => {
        clearInterval(scrollInterval);
        scrollInterval = null;
    };

    // Start/stop scroll when hovering over arrows
    leftArrow.addEventListener("mouseenter", () => startScrolling("left"));
    rightArrow.addEventListener("mouseenter", () => startScrolling("right"));
    leftArrow.addEventListener("mouseleave", stopScrolling);
    rightArrow.addEventListener("mouseleave", stopScrolling);

    // Also update visibility on native scroll
    carousel.addEventListener("scroll", updateArrowVisibility);
    updateArrowVisibility();
});
