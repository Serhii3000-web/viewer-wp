document.addEventListener('DOMContentLoaded', () => {

    // ---------- cards ----------
    const cards =
        document.querySelectorAll('.viewer-card');

    // ---------- viewers ----------
    const viewerElements =
        document.querySelectorAll('.viewer-360');

    const viewers = [];

    let activeIndex = 0;

    // ---------- init viewers ----------
    viewerElements.forEach((element) => {

        viewers.push(
            new Viewer360(element)
        );

    });

    // ---------- update ----------
    function updateActiveCard() {

        cards.forEach((card, index) => {

            card.style.display =
                index === activeIndex
                    ? 'block'
                    : 'none';

        });

        viewers.forEach((viewer, index) => {

            if (index === activeIndex) {

                viewer.activate();
                viewer.resizeCanvas();

            } else {

                viewer.deactivate();

            }

        });

    }

    updateActiveCard();

    // ---------- prev ----------
    document
        .getElementById('prevBtn')
        .addEventListener('click', () => {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

            updateActiveCard();

        });

    // ---------- next ----------
    document
        .getElementById('nextBtn')
        .addEventListener('click', () => {

            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

            updateActiveCard();

        });

});