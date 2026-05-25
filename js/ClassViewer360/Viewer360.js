// export class Viewer360 {
class Viewer360 {

    constructor(element) {

        // ---------- root ----------
        this.element = element;

        // ---------- data ----------
        this.folder = element.dataset.folder;
        this.totalFrames = parseInt(element.dataset.frames);

        // ---------- canvas ----------
        this.canvasElement = element.querySelector('.viewer-360__canvas');
        this.canvas = new CanvasBase(this.canvasElement);
        this.ctx = this.canvas.ctx;

        // ---------- state ----------
        this.images = [];
        this.loaded = [];
        this.isPreloaded = false;
        this.currentFrame = 0;
        this.isDragging = false;
        this.lastX = 0;
        this.velocity = 0;

        this.animationFrame = null;

        this.canvas.resize();

        // ---------- init ----------
        this.initEvents();

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

    // ---------- resize Canvas ----------
    resizeCanvas() {

        if (this.element.offsetParent === null) {
            return;
        }

        this.canvas.resize();

        this.draw();
    }

    // ---------- draw ----------
    draw() {

        const imagesWH =
            this.images[this.currentFrame];

        if (
            !imagesWH ||
            !this.loaded[this.currentFrame]
        ) {
            return;
        }

        const width =
            this.canvas.canvas.clientWidth;

        const height =
            this.canvas.canvas.clientHeight;

        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );

        const scale = Math.min(
            width / imagesWH.width,
            height / imagesWH.height
        );

        const w = imagesWH.width * scale;
        const h = imagesWH.height * scale;

        const x = (width - w) / 2;
        const y = (height - h) / 2;

        this.ctx.drawImage(
            imagesWH,
            x,
            y,
            w,
            h
        );
    }

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
        this.canvas.canvas.addEventListener('mousedown', (e) => {
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
        this.canvas.canvas.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.lastX = e.touches[0].clientX;
        });

        // touch end
        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // touch move
        this.canvas.canvas.addEventListener(
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