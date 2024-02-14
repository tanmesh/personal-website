document.addEventListener("DOMContentLoaded", function() {
    // DOM Element selections
    const cardWrappers = document.querySelectorAll(".expWrapper");

    // highest values for angle
    const mostX = 15; // 10 or -10
    const mostY = 15; // 10 or -10

    cardWrappers.forEach(cardWrapper => {
        const card = cardWrapper.querySelector(".timeline_content");

        cardWrapper.addEventListener("mouseenter", () => {
            cardWrapper.addEventListener("mousemove", onMouseMove);
            cardWrapper.addEventListener("mouseleave", onMouseLeave);
        });

        function onMouseMove(e) {
            // remove transition
            card.style.transition = "none";
            // highlight.style.transition = "none";

            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; // Calculate relative X position
            const y = e.clientY - rect.top; // Calculate relative Y position
            const { width, height } = rect;
            const halfWidth = width / 2;
            const halfHeight = height / 2;

            // calculate angle
            const rotationY = ((x - halfWidth) / halfWidth) * mostX;
            const rotationX = ((y - halfHeight) / halfHeight) * mostY;

            // set rotation
            card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        }

        function onMouseLeave() {
            // add transition back
            card.style.transition = "transform 0.5s ease-in-out";
            card.style.transform = `rotateY(0) rotateX(0)`;

            cardWrapper.removeEventListener("mousemove", onMouseMove);
            cardWrapper.removeEventListener("mouseleave", onMouseLeave);
        }
    });
});
