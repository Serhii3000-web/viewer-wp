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

            let offset =
                index - activeIndex;

            const total =
                cards.length;

            // ---------- circular ----------
            if (offset > total / 2) {
                offset -= total;
            }

            if (offset < -total / 2) {
                offset += total;
            }

            // ---------- state ----------
            let x = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            let rotateY = 0;
            let z = 0;

            // ---------- left ----------
            if (offset === -1) {

                x = -450;
                z = -300;
                scale = 0.7;
                opacity = 0.6;
                zIndex = 5;
                rotateY = 55;

            }

            // ---------- right ----------
            else if (offset === 1) {

                x = 450;
                z = -300;
                scale = 0.7;
                opacity = 0.6;
                zIndex = 5;
                rotateY = -55;

            }

            // ---------- hidden ----------
            else if (offset !== 0) {

                opacity = 0;
                zIndex = 1;

            }

            // ---------- apply ----------
            card.style.transform =
                `
                translate(-50%, -50%)
                translateX(${x}px)
                translateZ(${z}px)
                rotateY(${rotateY}deg)
                scale(${scale})
                `;

            card.style.opacity =
                opacity;

            card.style.zIndex =
                zIndex;

        });

        viewers[activeIndex]
            .resizeCanvas();

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