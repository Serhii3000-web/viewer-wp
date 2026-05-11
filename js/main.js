document.addEventListener('DOMContentLoaded', () => {

    const cards =
        document.querySelectorAll('.viewer-card');

    const viewerElements =
        document.querySelectorAll('.viewer-360');

    const viewers = [];

    let activeIndex = 0;

    viewerElements.forEach((element) => {
        viewers.push(new Viewer360(element));
    });

    function updateActiveCard() {

        cards.forEach((card, index) => {

            if (index === activeIndex) {
                card.style.opacity = '1';
                card.style.zIndex = '10';
            } else {
                card.style.opacity = '0';
                card.style.zIndex = '1';
            }

        });

    }

    updateActiveCard();

    document.getElementById('prevBtn').addEventListener('click', () => {

        activeIndex--;

        if (activeIndex < 0) {
            activeIndex = cards.length - 1;
        }

        updateActiveCard();

    });

    document.getElementById('nextBtn').addEventListener('click', () => {

        activeIndex++;

        if (activeIndex >= cards.length) {
            activeIndex = 0;
        }

        updateActiveCard();

    });

});