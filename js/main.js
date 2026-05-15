document.addEventListener('DOMContentLoaded', () => {

    // ---------- cards ----------
    const cards = document.querySelectorAll('.viewer-card');

    // ---------- viewers ----------
    const viewerElements = document.querySelectorAll('.viewer-360');
    const viewers = [];
    let activeIndex = 0;
    let cardInfoLength = 35;

    // ---------- init viewers ----------
    viewerElements.forEach((element) => {
        viewers.push(
            new Viewer360(element)
        );
    });

    // ---------- update ----------
    function updateActiveCard(cardInfoLength = 35) {

        cards.forEach((card, index) => {
            const cardInfoElement  = card.querySelector('.viewer-card__info');
            const cardTitleElement  = card.querySelector('.viewer-card__title');

            const cardLeftElement  = card.querySelector('.viewer-card__left');
            const cardRightElement  = card.querySelector('.viewer-card__right');
            
            if (!cardInfoElement .dataset.fullText) {
                cardInfoElement .dataset.fullText = cardInfoElement .textContent;
            }

            const cardInfoText = cardInfoElement .dataset.fullText;
            const trimmed = cardInfoText.length > cardInfoLength 
                            ? cardInfoText.slice(0, cardInfoLength )
                            : cardInfoText;

            cardInfoElement .textContent = trimmed;

            let offset = index - activeIndex;
            const total = cards.length;

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
                x = -500;
                z = -300;
                scale = 0.7;
                opacity = 0.6;
                zIndex = 5;
                rotateY = 55;
            }

            // ---------- right ----------
            else if (offset === 1) {
                x = 500;
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
            const styleTransform =
                `
                translate(-50%, -50%)
                translateX(${x}px)
                translateZ(${z}px)
                rotateY(${rotateY}deg)
                scale(${scale})
                `;

            card.style.transform = styleTransform;
            // cardLeftElement.style.transform = styleTransform;
            // cardRightElement.style.transform = styleTransform;

            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
        });

        // ---------- activate visible viewers ----------
        viewers.forEach((viewer, index) => {
            let offset = Math.abs(index - activeIndex);
            
            // circular
            if (offset > cards.length / 2) {
                offset = cards.length - offset;
            }

            if (offset <= 1) {
                viewer.activate();
            } else {
                viewer.deactivate();
            }

console.log('cards.length = ', cards.length);
        });

        viewers[activeIndex].resizeCanvas();
    }

    updateActiveCard(cardInfoLength);

    // ---------- prev Btn-Below ----------
    document
        .querySelector('.carousel__button-below--prevBtn')
        .addEventListener('click', () => {
            
            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

        updateActiveCard(cardInfoLength);
    });

    // ---------- next Btn-Below ----------
    document
        .querySelector('.carousel__button-below--nextBtn')
        .addEventListener('click', () => {
            
            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

        updateActiveCard(cardInfoLength);
    });


    // ---------- prev Btn-Bottom ----------
    document
        .querySelector('.carousel__button-bottom--prevBtn')
        .addEventListener('click', () => {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

        updateActiveCard(cardInfoLength);
    });

    // ---------- next Btn-Bottom----------
    document
        .querySelector('.carousel__button-bottom--nextBtn')
        .addEventListener('click', () => {
            
            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

        updateActiveCard(cardInfoLength);
    });

    // ================ Keyboard ====================
    window.addEventListener('keydown', (e) => {
        // left
        if (e.key === 'ArrowLeft') {
            activeIndex--;
            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }
            updateActiveCard(cardInfoLength);
        }

        // right
        if (e.key === 'ArrowRight') {
            activeIndex++;
            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }
            updateActiveCard(cardInfoLength);
        }
    });
    // =================================================
});