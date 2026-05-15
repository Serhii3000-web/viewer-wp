// export class Viewer360 {
class Viewer360 {

    constructor(element) {

        // ---------- root ----------
        this.element = element;

        // ---------- data ----------
        this.folder = element.dataset.folder;
        this.totalFrames = parseInt(element.dataset.frames);

        // ---------- canvas ----------
        this.canvas = element.querySelector('.viewer-360__canvas');
        this.ctx = this.canvas.getContext('2d');

        // ---------- state ----------
        this.images = [];
        this.loaded = [];
        this.isPreloaded = false;
        this.currentFrame = 0;
        this.isDragging = false;
        this.lastX = 0;
        this.velocity = 0;

        this.animationFrame = null;

        // ---------- init ----------
        this.resizeCanvas();
        this.initEvents();
        // this.inertia();

        // ---------- resize ----------
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    // ---------- activate ------------
    activate() {
        this.isActive = true;

        if (!this.isPreloaded) {
            this.preloadImages();
            this.isPreloaded = true;
        }

        this.startInertia();
        this.draw();
    }

    // ---------- deactivate ------------
    deactivate() {
        this.isActive = false;
        this.isDragging = false;
        this.velocity = 0;

        cancelAnimationFrame(
            this.animationFrame
        );
    }

    // ---------- reset ------------
    resetInteraction() {
        this.isDragging = false;
        this.velocity = 0;
    }

    // ---------- preload ----------
    preloadImages() {
        for (let i = 0; i < this.totalFrames; i++) {
            const imagesWH = new Image();
            const num = String(i + 1).padStart(2, '0');
            imagesWH.src = `./imagesWH/${this.folder}/${num}.png`;
            this.images[i] = imagesWH;
            this.loaded[i] = false;

            imagesWH.onload = () => {
                this.loaded[i] = true;
                if (i === this.currentFrame) {
                    this.draw();
                }
            };

            imagesWH.onerror = () => {
                console.warn(`Image not loaded: ${imagesWH.src}`);
            };
        }
    }

    // ---------- resize ----------
    resizeCanvas() {

        if (this.element.offsetParent === null) {
            return;
        }

        const width = this.element.clientWidth;
        const height = this.element.clientHeight;
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.draw();
    }

    // ---------- draw ----------
    draw() {
        const imagesWH = this.images[this.currentFrame];

        if (!imagesWH || !this.loaded[this.currentFrame]) {
            return;
        }

        this.ctx.clearRect(0, 0, this.element.clientWidth, this.element.clientHeight);

        const scale = Math.min(
            this.element.clientWidth / imagesWH.width,
            this.element.clientHeight / imagesWH.height
        );
        const w = imagesWH.width * scale;
        const h = imagesWH.height * scale;
        const x = (this.element.clientWidth - w) / 2;
        const y = (this.element.clientHeight - h) / 2;

        this.ctx.drawImage(imagesWH, x, y, w, h);
    };

    // ==================================================================
    // ---------- show ----------
    show(frame) {

        const nextFrame =
            (frame + this.totalFrames) %
            this.totalFrames;

        // ---------- skip unloaded ----------
        if (!this.loaded[nextFrame]) {
            return;
        }

        this.currentFrame = nextFrame;

        this.draw();

    }

    // ---------- move ----------
    move(clientX) {
        const dx = clientX - this.lastX;

        this.velocity = dx;

        const framesPerWidth = this.totalFrames / this.element.clientWidth;
        const step = dx * framesPerWidth;

        if (Math.abs(step) >= 1) {
            this.show(this.currentFrame + Math.floor(step));
            this.lastX = clientX;
        };
    };

    // ---------- events ----------
    initEvents() {

        // mouse down
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastX = e.clientX;
        });

        // mouse up
        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        // mouse move
        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.move(e.clientX);
        });

        // touch start
        this.canvas.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.lastX = e.touches[0].clientX;
        });

        // touch end
        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // touch move
        this.canvas.addEventListener(
            'touchmove',
            (e) => {
                if (!this.isDragging) {
                    return;
                }

                e.preventDefault();

                this.move(e.touches[0].clientX);
            },
            { passive: false }
        );
    };

    // ---------- start inertia ----------
    startInertia() {
        if (this.animationFrame) {
            return;
        }
        this.inertia();
    }

    // ---------- inertia ----------
    inertia() {
        if (!this.isActive) {
            this.animationFrame = null;
            return;
        }

        if (
            !this.isDragging &&
            Math.abs(this.velocity) > 0.3
        ) {
            this.velocity *= 0.95;

            const framesPerWidth =
                this.totalFrames /
                this.element.clientWidth;

            const step =
                this.velocity * framesPerWidth;

            if (Math.abs(step) >= 1) {
                this.show(
                    this.currentFrame +
                    Math.floor(step)
                );
            }
        }

        this.animationFrame =
            requestAnimationFrame(() => {
                this.inertia();
            });
    }
};