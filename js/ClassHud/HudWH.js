class HudWH {

    constructor(root) {

        if (!root) {
            this.isValid = false;
            return;
        }

        this.root = root;
        this.layoutName = root.dataset.layout;
        this.factionName = root.dataset.faction;

        this.layout = HUD_LAYOUTS[this.layoutName];
        this.faction = HUD_FACTIONS[this.factionName];

        if (!this.layout || !this.faction) {
            this.isValid = false;
            return;
        }

        this.build();

        this.canvasElement = this.root.querySelector('.hud__canvas');
        this.canvas = new CanvasBase(this.canvasElement);
        this.ctx = this.canvas.ctx;
        this.image = new Image();

        this.image.onload = () => {
            this.render();
        };

        this.image.src = this.layout.image;
    }

    /* ====================================== */

    build() {
        this.root.replaceChildren();

        /* VIEW */
        const view = document.createElement('div');
        view.className = 'hud__view';

        const canvas = document.createElement('canvas');
        canvas.className = 'hud__canvas';

        view.append(canvas);

        this.root.append(view);

        /* CONTROLS */
        if (this.layout.controls?.enabled) {
            const controls = document.createElement('div');
            controls.className = 'hud__controls';
            controls.innerHTML = this.layout.controls.html;

            this.root.append(controls);
        }
    }

    /* ====================================== */

    render() {
        const width = this.canvas.canvas.clientWidth;
        const height = this.canvas.canvas.clientHeight;
        this.canvas.clear();

        /* IMAGE */
        this.ctx.drawImage(
            this.image,
            0,
            0,
            width,
            height
        );

        /* TEXT */
        if (!this.layout.fieldsText?.enabled) return;
        const fields = this.layout.fieldsText.fields;

        Object.entries(fields).forEach(([fieldName, field]) => {
                const text = this.faction[fieldName];
                if (!text) return;
                const scaledSize = height * field.size / 100;
                this.ctx.fillStyle = field.color;
                this.ctx.font = `${scaledSize}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                this.ctx.fillText(
                    text,
                    width * field.x / 100,
                    height * field.y / 100
                );
            }
        );
    }

    /* ====================================== */

    destroy() {
        this.canvas.destroy();
    }
}