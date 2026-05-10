// export class Viewer360 {
class Viewer360 {

    constructor(element) {

        // ---------- root ----------
        this.element = element;

        // ---------- data ----------
        this.folder =
            element.dataset.folder;

        this.totalFrames =
            parseInt(
                element.dataset.frames
            );

        // ---------- canvas ----------
        this.canvas =
            element.querySelector(
                '.viewer-canvas'
            );

        this.ctx =
            this.canvas.getContext('2d');

        // ---------- state ----------
        this.images = [];

        this.currentFrame = 0;

        this.isDragging = false;

        this.lastX = 0;

        this.velocity = 0;

        // ---------- init ----------
        this.preloadImages();

        this.resizeCanvas();

        this.initEvents();

        this.inertia();

        // ---------- resize ----------
        window.addEventListener(
            'resize',
            () => {
                this.resizeCanvas();
            }
        );

    }

    // ---------- activate ------------
    activate() {
        this.isActive = true;
    }

    // ---------- deactivate ------------
    deactivate() {
        this.isActive = false;

        this.isDragging = false;
        this.velocity = 0;
    }

    // ---------- reset ------------
    resetInteraction() {
        this.isDragging = false;
        this.velocity = 0;
    }

    // ---------- preload ----------
    preloadImages() {

        for (let i = 0; i < this.totalFrames; i++) {

            const img = new Image();

            const num = String(i + 1).padStart(2, '0');

            img.src = `./img/${this.folder}/${num}.png`;

            this.images.push(img);

            img.onload = () => {

                if (i === 0) {
                    this.draw();
                };

            };

        };

    };

    // ---------- resize ----------
    resizeCanvas() {

        if (this.element.offsetParent === null) {
            return;
        }

        const rect = this.element.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        this.draw();

    };

    // ---------- draw ----------
    draw() {

        const img = this.images[this.currentFrame];

        if (!img || !img.complete) return;

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        const scale = Math.min(
            this.canvas.width / img.width,
            this.canvas.height / img.height
        );

        const w = img.width * scale;
        const h = img.height * scale;

        const x = (this.canvas.width - w) / 2;
        const y = (this.canvas.height - h) / 2;

        this.ctx.drawImage(img, x, y, w, h);

    };

    // ==================================================================
        // ---------- show ----------
        show(frame) {

            this.currentFrame =
                (frame + this.totalFrames) % this.totalFrames;

            this.draw();

        };

        // ---------- move ----------
        move(clientX) {

            const dx = clientX - this.lastX;

            this.velocity = dx;

            const framesPerWidth = 
                this.totalFrames / this.element.clientWidth;

            const step = dx * framesPerWidth;

            if (Math.abs(step) >= 1) {

                this.show(
                    this.currentFrame + Math.floor(step)
                );

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
            this.canvas.addEventListener('touchmove', (e) => {

                if (!this.isDragging) return;

                this.move(e.touches[0].clientX);

            });

        };

        // ---------- inertia ----------
        inertia() {

            if (!this.isActive) {

                requestAnimationFrame(() => {
                    this.inertia();
                });

                return;
            }

            if (
                !this.isDragging &&
                Math.abs(this.velocity) > 0.3
            ) {

                this.velocity *= 0.95;

                const framesPerWidth =
                    this.totalFrames / this.element.offsetWidth;

                const step =
                    this.velocity * framesPerWidth;

                if (Math.abs(step) >= 1) {

                    this.show(
                        this.currentFrame + Math.floor(step)
                    );

                };

            };

            requestAnimationFrame(() => {
                this.inertia();
            });

        };
    // ==================================================================

};