document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-container");
    const projectList = document.querySelector(".carousel");
    const projectTiles = document.querySelectorAll(".project-tile");

    let scrollAmount = 0;
    const scrollSpeed = 50; // Increased to smooth the scroll speed

    // Function to calculate the total scrollable width
    const getScrollLimit = () => {
        // Calculate the total width of all project tiles
        const totalTilesWidth = Array.from(projectTiles).reduce((total, tile) => {
            return total + tile.offsetWidth;
        }, 0);

        // Scroll limit is the total width minus the carousel's visible width
        // Add a small buffer (e.g., 10px) to ensure the last tile isn't cut off
        return totalTilesWidth - carousel.clientWidth + 10; 
    };

    // Function to handle scrolling with bounds checking
    function autoScroll(direction) {
        const scrollLimit = getScrollLimit(); // Recalculate scrollLimit on each scroll action
        if (direction === "left") {
            // Stop scrolling if we're at the leftmost position
            scrollAmount = Math.max(scrollAmount - scrollSpeed, 0);
        } else if (direction === "right") {
            // Stop scrolling if we've reached the rightmost position
            scrollAmount = Math.min(scrollAmount + scrollSpeed, scrollLimit);
        }
        projectList.style.transform = `translateX(-${scrollAmount+10}px)`; // Move carousel
    }

    // Check if there are tiles to scroll into view
    function canScroll(direction) {
        const firstVisibleTile = projectTiles[0].getBoundingClientRect().left;
        const lastVisibleTile = projectTiles[projectTiles.length - 1].getBoundingClientRect().right;

        if (direction === "left" && firstVisibleTile < 0) {
            return true; // There are still tiles to scroll to the left
        } else if (direction === "right" && lastVisibleTile > carousel.getBoundingClientRect().right) {
            return true; // There are still tiles to scroll to the right
        }
        return false; // No more tiles to scroll in this direction
    }

    // Handle mouse move to scroll left or right based on where the mouse is
    carousel.addEventListener("mousemove", (e) => {
        const { left, width } = carousel.getBoundingClientRect();
        const mouseX = e.clientX - left;

        if (mouseX < width * 0.2 && canScroll("left")) {
            autoScroll("left");
        }
        else if (mouseX > width * 0.8 && canScroll("right")) {
            autoScroll("right");
        }
    });

    // Prevent scrolling beyond limits using touch/mouse wheel or any other way
    carousel.addEventListener("wheel", (e) => {
        if (e.deltaX > 0 && canScroll("right")) {
            autoScroll("right");
        } else if (e.deltaX < 0 && canScroll("left")) {
            autoScroll("left");
        }
        e.preventDefault(); // Prevent default scrolling behavior
    });

    // Add event listeners for arrow clicks
    // document.querySelector(".arrow.left").addEventListener("click", () => autoScroll("left"));
    // document.querySelector(".arrow.right").addEventListener("click", () => autoScroll("right"));
});
