class Viewer360 {

    constructor(element) {

        // ---------- root ----------
        this.element = element;

        // ---------- data ----------
        this.folder = element.dataset.folder;
        this.totalFrames = parseInt(element.dataset.frames);

        // ---------- canvas ----------
        this.canvas = element.querySelector('.viewer-canvas');
        this.ctx = this.canvas.getContext('2d');

        // ---------- state ----------
        this.images = [];
        this.currentFrame = 0;

        // ---------- init ----------
        this.preloadImages();

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        this.resizeCanvas();
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

};

// ---------- create viewers ----------
document.addEventListener('DOMContentLoaded', () => {

    const viewers = document.querySelectorAll('.viewer-360');

    viewers.forEach((viewerElement) => {

        new Viewer360(viewerElement);

    });

});