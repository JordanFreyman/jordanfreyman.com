document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-container");
    const projectList = document.querySelector(".carousel");

    let scrollAmount = 0;
    const scrollSpeed = 20; // Speed of scrolling
    const scrollLimit = projectList.scrollWidth - carousel.clientWidth;

    function autoScroll(direction) {
        if (direction === "left") {
            scrollAmount = Math.max(scrollAmount - scrollSpeed, 0);
        } else if (direction === "right") {
            scrollAmount = Math.min(scrollAmount + scrollSpeed, scrollLimit);
        }
        projectList.style.transform = `translateX(-${scrollAmount}px)`;
    }

    carousel.addEventListener("mousemove", (e) => {
        const { left, width } = carousel.getBoundingClientRect();
        const mouseX = e.clientX - left;

        if (mouseX < width * 0.2) {
            autoScroll("left");
        } else if (mouseX > width * 0.8) {
            autoScroll("right");
        }
    });
});
