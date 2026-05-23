// config-hud.js

const HUD_LAYOUTS = {

    header: {
        image: './img/Title.png',
        controls:`
                    <button class="hud__slider-prev">◀</button>
                    <button class="hud__slider-next">▶</button>`,

        text: true,

        fields: {
            fraction: {
                x: 50,
                y: 48,
                size: 12,
                color: '#6395a9'
            },

            title: {
                x: 50,
                y: 74,
                size: 20,
                color: '#d6b35a'
            }
        }
    },

    footer: {
        image: './img/Select.png',
        controls: `
                    <button class="hud__slider-prev">◀</button>

                    <ul class="hud__list">
                        <li class="hud__item">
                            <button class="hud__btn hud__btn--chaos"></button>
                        </li>

                        <li class="hud__item">
                            <button class="hud__btn hud__btn--imperium"></button>
                        </li>

                        <li class="hud__item">
                            <button class="hud__btn hud__btn--marines"></button>
                        </li>

                        <li class="hud__item">
                            <button class="hud__btn hud__btn--xenos"></button>
                        </li>
                    </ul>

                    <button class="hud__slider-next">▶</button>`,

        text: false,
        fields: false
    }
};

/* ====================================================== */

const HUD_FRACTIONS = {

    chaos: {
        fraction: 'Fraction',
        title: 'CHAOS'
    },

    imperium: {
        fraction: 'Fraction',
        title: 'IMPERIUM'
    }
};