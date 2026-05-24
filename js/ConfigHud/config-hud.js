// config-hud.js

const HUD_LAYOUTS = {

    header: {
        image: './img/Title.png',
        controls: {
            enabled: true,
            html:   `
                    <button class="hud__slider-setting">◀</button>
                    <button class="hud__card-setting">▶</button>
                    `},

        fieldsText: {
            enabled: true,
            faction: {
                x: 50,
                y: 50,
                size: 12,
                color: '#6395a9'
            },

            title: {
                x: 50,
                y: 76,
                size: 20,
                color: '#d70909'
            }
        }
    },

    footer: {
        image: './img/Select.png',
        controls: {
            enabled: true,
            html:   `
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
                    <button class="hud__slider-next">▶</button>
                    `},

        fieldsText: {enabled: false}
    }
};

/* ====================================================== */

const HUD_FACTIONS = {

    chaos: {
        faction: 'Fraction',
        title: 'CHAOS'
    },
 
    imperium: {
        faction: 'Fraction',
        title: 'IMPERIUM'
    }
};

/* ====================================================== */

const HUD_CSS = {

    chaos: {
        '--hud-width': 'min(600px, 100%)',
        '--hud-aspect': '6 / 1',
        '--hud_list-gap': '10px',
        '--hud_btn-width': 'clamp(53px, 5vw, 66px)',
        '--hud_btn-aspect': '2 / 1',
        '--hud_btn-bakground-color': 'rgba(255,255,255,.1)',
        '--hud_btn-border': '1px solid rgba(255,255,255,.3)',
        '--hud_btn-radius': '10%',
        '--hud_btn-color-text': 'white',
        '--hud-btn-prev-top': '52%',
        '--hud-btn-prev-left': '11%',
        '--hud-btn-prev-right': '11%'
    },

    imperium: {
        '--hud-width': 'min(600px, 100%)',
        '--hud-aspect': '6 / 1',
        '--hud_list-gap': '10px',
        '--hud_btn-width': 'clamp(53px, 5vw, 66px)',
        '--hud_btn-aspect': '2 / 1',
        '--hud_btn-bakground-color': 'rgba(255,255,255,.1)',
        '--hud_btn-border': '1px solid rgba(255,255,255,.3)',
        '--hud_btn-radius': '10%',
        '--hud_btn-color-text': 'white',
        '--hud-btn-prev-top': '52%',
        '--hud-btn-prev-left': '11%',
        '--hud-btn-prev-right': '11%'
    }
};