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
        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
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