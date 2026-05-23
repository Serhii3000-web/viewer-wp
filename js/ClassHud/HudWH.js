// HudWH.js (LogoWH.js)

class HudWH {

    constructor(root) {
        if(!root){
            this.isValid = false;
            this.root = null;
            return;
        } else {
            this.isValid = true;
            this.root = root;
        }

        this.layoutName = root.dataset.layout;
        this.fractionName = root.dataset.fraction;

        this.layout = HUD_LAYOUTS[this.layoutName];
        this.fraction = HUD_FRACTIONS[this.fractionName];

        this.canvas = null;
        this.ctx = null;

        this.image = new Image();

        this.handleResize = this.handleResize.bind(this);

        this.init();
    }

    /* ====================================================== */

    init() {
        if (!this.isValid) return;

        this.build();

        this.canvas = this.root.querySelector('.hud__canvas');
        this.ctx = this.canvas.getContext('2d');

        this.image.src = this.layout.image;

        this.image.onload = () => {

            this.resize();
            this.render();

            window.addEventListener(
                'resize',
                this.handleResize
            );
        };
    }

    /* ====================================================== */

    build() {

        this.root.innerHTML = '';

        /* VIEW */
        const view = document.createElement('div');
        view.className = 'hud__view';

        const canvas = document.createElement('canvas');
        canvas.className = 'hud__canvas';

        view.append(canvas);

        this.root.append(view);

        /* CONTROLS */
        if (this.layout.controls) {
            const controls = document.createElement('div');
            controls.className = 'hud__controls';
            controls.innerHTML = this.layout.controls;
            this.root.append(controls);
        }
    }

    /* ====================================================== */

    handleResize() {

        this.resize();
        this.render();
    }

    /* ====================================================== */

    resize() {

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

    /* ====================================================== */

    render() {

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );

        /* IMAGE */

        this.ctx.drawImage(
            this.image,
            0,
            0,
            width,
            height
        );

        /* TEXT */
        if(this.layout.text){
            for (const [fieldName, field] of Object.entries(this.layout.fields)) {

                let text = '';

                if (fieldName === 'fraction') {
                    text = this.fraction.fraction;
                }

                if (fieldName === 'title') {
                    text = this.fraction.title;
                }

                const scaledSize =
                    height * field.size / 100;

                this.ctx.fillStyle = field.color;

                this.ctx.font =
                    `${scaledSize}px Arial`;

                this.ctx.textAlign = 'center';

                this.ctx.textBaseline = 'middle';

                this.ctx.fillText(
                    text,
                    width * field.x / 100,
                    height * field.y / 100
                );
            }
        }
    }
}