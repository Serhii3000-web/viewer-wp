class CarouselWH {

    constructor(root) {

        if (!root) {
            this.isValid = false;
            return;
        }

        this.root = root;

        /* ===================================== */
        /* cards */
        /* ===================================== */

        this.cards =
            Array.from(
                this.root.querySelectorAll(
                    '.viewer-card'
                )
            );

        /* ===================================== */
        /* viewers */
        /* ===================================== */

        this.viewers =
            this.cards.map(card => {

                const element =
                    card.querySelector(
                        '.viewer-360'
                    );

                return new Viewer360(element);
            });

        /* ===================================== */

        this.activeIndex = 0;

        this.cardInfoLength = 35;

        /* ===================================== */

        this.initButtons();

        this.initKeyboard();

        this.update();
    }

    /* ===================================== */
    /* buttons */
    /* ===================================== */

    initButtons() {

        /* PREV */

        this.root
            .querySelectorAll(
                '.carousel__button-below--prevBtn, .hud__slider-prev'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {
                        this.prev();
                    }
                );
            });

        /* NEXT */

        this.root
            .querySelectorAll(
                '.carousel__button-below--nextBtn, .hud__slider-next'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {
                        this.next();
                    }
                );
            });
    }

    /* ===================================== */
    /* keyboard */
    /* ===================================== */

    initKeyboard() {

        window.addEventListener(
            'keydown',
            (e) => {

                if (e.key === 'ArrowLeft') {
                    this.prev();
                }

                if (e.key === 'ArrowRight') {
                    this.next();
                }
            }
        );
    }

    /* ===================================== */
    /* navigation */
    /* ===================================== */

    prev() {

        this.activeIndex--;

        if (this.activeIndex < 0) {
            this.activeIndex =
                this.cards.length - 1;
        }

        this.update();
    }

    /* ===================================== */

    next() {

        this.activeIndex++;

        if (
            this.activeIndex >=
            this.cards.length
        ) {
            this.activeIndex = 0;
        }

        this.update();
    }

    /* ===================================== */
    /* update */
    /* ===================================== */

    update() {

        this.updateCards();

        this.updateViewers();
    }

    /* ===================================== */
    /* cards */
    /* ===================================== */

    updateCards() {

        this.cards.forEach(
            (card, index) => {

                this.updateCardText(card);

                const state =
                    this.calculateCardState(
                        index
                    );

                this.applyCardState(
                    card,
                    state
                );
            }
        );
    }

    /* ===================================== */
    /* text */
    /* ===================================== */

    updateCardText(card) {

        const info =
            card.querySelector(
                '.viewer-card__info'
            );

        if (!info) return;

        if (!info.dataset.fullText) {
            info.dataset.fullText =
                info.textContent;
        }

        const fullText =
            info.dataset.fullText;

        info.textContent =
            fullText.length >
            this.cardInfoLength

            ? fullText.slice(
                0,
                this.cardInfoLength
            )

            : fullText;
    }

    /* ===================================== */
    /* state */
    /* ===================================== */

    calculateCardState(index) {

        let offset =
            index - this.activeIndex;

        const total =
            this.cards.length;

        /* circular */

        if (offset > total / 2) {
            offset -= total;
        }

        if (offset < -total / 2) {
            offset += total;
        }

        const state = {
            x: 0,
            z: 0,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            zIndex: 10
        };

        /* LEFT */

        if (offset === -1) {

            state.x = -500;
            state.z = -300;
            state.scale = 0.7;
            state.opacity = 0.6;
            state.rotateY = 55;
            state.zIndex = 5;
        }

        /* RIGHT */

        else if (offset === 1) {

            state.x = 500;
            state.z = -300;
            state.scale = 0.7;
            state.opacity = 0.6;
            state.rotateY = -55;
            state.zIndex = 5;
        }

        /* HIDDEN */

        else if (offset !== 0) {

            state.opacity = 0;
            state.zIndex = 1;
        }

        return state;
    }

    /* ===================================== */
    /* apply */
    /* ===================================== */

    applyCardState(card, state) {

        card.style.transform = `
            translate(-50%, -50%)
            translateX(${state.x}px)
            translateZ(${state.z}px)
            rotateY(${state.rotateY}deg)
            scale(${state.scale})
        `;

        card.style.opacity =
            state.opacity;

        card.style.zIndex =
            state.zIndex;
    }

    /* ===================================== */
    /* viewers */
    /* ===================================== */

    updateViewers() {

        this.viewers.forEach(
            (viewer, index) => {

                let offset =
                    Math.abs(
                        index -
                        this.activeIndex
                    );

                if (
                    offset >
                    this.cards.length / 2
                ) {
                    offset =
                        this.cards.length -
                        offset;
                }

                if (offset <= 1) {

                    viewer.activate();

                } else {

                    viewer.deactivate();
                }
            }
        );

        this.viewers[
            this.activeIndex
        ].draw();
    }
}