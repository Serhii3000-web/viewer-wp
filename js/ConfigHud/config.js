// config.js

const HUD_LAYOUTS = {

    header: {
        image: './img/Title.png',
        controls: false,

        fields: {
            faction: {
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
        controls: true,

        fields: {
            faction: false,
            title: false,

            buttons: {                
                btnPrev: {hudBtnPrevTop: 52},
                btnNext: {},
                btnChaos: {},
                btnImperium: {},
                btnMarienes: {},
                btnXenos: {}
            }
        }
    }
};

/* ====================================================== */

const HUD_FACTIONS = {

    chaos: {
        faction: 'Faction',
        title: 'CHAOS'
    },

    imperium: {
        faction: 'Faction',
        title: 'IMPERIUM'
    }
};