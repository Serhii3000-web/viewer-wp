document.addEventListener('DOMContentLoaded', () => {

    // ---------- cards ----------
    const cards =
        document.querySelectorAll('.viewer-card');

    // ---------- viewers ----------
    const viewerElements =
        document.querySelectorAll('.viewer-360');

    const viewers = [];

    let activeIndex = 0;

    let imgInfoLength = 35;

    // ---------- init viewers ----------
    viewerElements.forEach((element) => {
        viewers.push(
            new Viewer360(element)
        );
    });

    // ---------- update ----------
    function updateActiveCard(imgInfoLength = 35) {

        cards.forEach((card, index) => {

        // iewer-card--img-info
        const imgInfoElement =
            card.querySelector('.viewer-card--img-info');
        
        if (!imgInfoElement.dataset.fullText) {
            imgInfoElement.dataset.fullText =
                imgInfoElement.textContent;
        }

        const imgInfoText =
            imgInfoElement.dataset.fullText;

        const trimmed =
            imgInfoText.length > imgInfoLength 
                ? imgInfoText.slice(0, imgInfoLength )
                : imgInfoText;

        imgInfoElement.textContent = trimmed;

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

    updateActiveCard(imgInfoLength);

    // ---------- prev Btn-Below ----------
    document
        .querySelector('.prevBtn-Below')
        .addEventListener('click', () => {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

        updateActiveCard(imgInfoLength);
    });

    // ---------- next Btn-Below ----------
    document
        .querySelector('.nextBtn-Below')
        .addEventListener('click', () => {
            
            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

        updateActiveCard(imgInfoLength);
    });


    // ---------- prev Btn-Bottom ----------
    document
        .querySelector('.prevBtn-Bottom')
        .addEventListener('click', () => {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

        updateActiveCard(imgInfoLength);
    });

    // ---------- next Btn-Bottom----------
    document
        .querySelector('.nextBtn-Bottom')
        .addEventListener('click', () => {
            
            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

        updateActiveCard(imgInfoLength);
    });




    // ================ Keyboard ====================
    window.addEventListener('keydown', (e) => {

        // left
        if (e.key === 'ArrowLeft') {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex = cards.length - 1;
            }

            updateActiveCard(imgInfoLength);
        }

        // right
        if (e.key === 'ArrowRight') {

            activeIndex++;

            if (activeIndex >= cards.length) {
                activeIndex = 0;
            }

            updateActiveCard(imgInfoLength);
        }
    });
    // =================================================

});