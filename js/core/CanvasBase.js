class CanvasBase {

    constructor(canvas) {
        if (!canvas) {
            this.isValid = false;
            return;
        }

        this.isValid = true;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.handleResize = this.resize.bind(this);

        window.addEventListener('resize', this.handleResize);

        this.resize();
    }

    /* ====================================== */
    resize() {
        if (!this.isValid) return;

        const dpr = window.devicePixelRatio || 1;

        const rect =
            this.canvas.getBoundingClientRect();

        this.canvas.width =
            Math.round(rect.width * dpr);

        this.canvas.height =
            Math.round(rect.height * dpr);

        this.ctx.resetTransform();

        this.ctx.scale(dpr, dpr);
    }

    /* ====================================== */
    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );
    }

    /* ====================================== */

    destroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}