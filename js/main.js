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

            const offset =
                index - activeIndex;

            // ---------- active ----------
            if (offset === 0) {

                card.style.transform =
                    'translate(-50%, -50%) scale(1)';

                card.style.opacity = '1';

                card.style.zIndex = '10';

            }

            // ---------- left ----------
            else if (offset === -1) {

                card.style.transform =
                    'translate(-120%, -50%) scale(0.7)';

                card.style.opacity = '0.5';

                card.style.zIndex = '5';

            }

            // ---------- right ----------
            else if (offset === 1) {

                card.style.transform =
                    'translate(20%, -50%) scale(0.7)';

                card.style.opacity = '0.5';

                card.style.zIndex = '5';

            }

            // ---------- hidden ----------
            else {

                card.style.transform =
                    'translate(-50%, -50%) scale(0.3)';

                card.style.opacity = '0';

                card.style.zIndex = '1';

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