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

        this.isActive = true;

        this.lastDpr = window.devicePixelRatio;

        // ---------- init ----------
        this.preloadImages();

        this.resizeCanvas();

        this.initEvents();

        this.inertia(); // $$$$$$$$$$$$$$$$$$$$$$$

        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.resizeCanvas();
            });
        });
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

            img.onload = () => {

                if (i === 0) {
                    this.draw();
                }

            };

            this.images.push(img);
        }

    }

    // ---------- resize ----------
    resizeCanvas() {

        const rect =
            this.element.getBoundingClientRect();

        this.canvas.width =
            rect.width;

        this.canvas.height =
            rect.height;

        this.draw();

    }

    // ---------- draw ----------
    draw() {

        const img =
            this.images[this.currentFrame];

        if (
            !img ||
            !img.complete ||
            !img.naturalWidth
        ) return;

        const cw =
            this.element.clientWidth;

        const ch =
            this.element.clientHeight;

        this.ctx.clearRect(
            0,
            0,
            cw,
            ch
        );

        // 🔥 фиксируем единый масштаб (НЕ зависящий от кадра)
        const baseSize = 500; // или 600 — выбери один стандарт

        const scale = Math.min(
            cw / baseSize,
            ch / baseSize
        );

        const w = baseSize * scale;
        const h = baseSize * scale;

        const x = (cw - w) / 2;
        const y = (ch - h) / 2;

        this.ctx.drawImage(
            img,
            x,
            y,
            w,
            h
        );
    }

    // ==================================================================
    // ---------- show ----------
    show(frame) {
        this.currentFrame =
            (frame + this.totalFrames) % this.totalFrames;

        const img = this.images[this.currentFrame];

        if (img && img.complete && img.naturalWidth) {
            this.draw();
        }

        // console.log('frame:', this.currentFrame);
    };

    // ---------- move ----------
    move(clientX) {

        const dx = clientX - this.lastX;

        this.lastX = clientX;

        const framesPerPixel =
            this.totalFrames / this.element.clientWidth;

        this.accumulatedX += dx;

        const step =
            this.accumulatedX * framesPerPixel;

        const frameChange =
            Math.trunc(step);

        if (frameChange !== 0) {

            this.show(
                this.currentFrame + frameChange
            );

            this.accumulatedX -= frameChange / framesPerPixel;
        }

        this.velocity = dx;
    }

    // ---------- events ----------
    initEvents() {

        this.canvas.addEventListener('pointerdown', (e) => {

            this.isDragging = true;
            this.lastX = e.clientX;

        });

        window.addEventListener('pointerup', () => {

            this.isDragging = false;

        });

        window.addEventListener('pointermove', (e) => {

            if (!this.isDragging) return;

            this.move(e.clientX);

        });

    }

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
                this.totalFrames / this.element.clientWidth;

            const step =
                this.velocity * framesPerWidth;

            this.show(
                this.currentFrame + step
            );
        }

        requestAnimationFrame(() => {
            this.inertia();
        });

        // this.currentFrame += Math.round(step);
        // this.show(this.currentFrame);

    };

};