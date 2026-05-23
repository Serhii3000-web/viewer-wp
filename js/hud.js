// hud.js

document.addEventListener('DOMContentLoaded', () => {

    const huds = document.querySelectorAll('.hud');

    huds.forEach(root => {
        new HudWH(root);
    });

});