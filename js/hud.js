// hud.js

document.addEventListener('DOMContentLoaded', () => {

    const huds = document.querySelectorAll('.hud');

    huds.forEach(root => {
        new HudWH(root);
        HudManagerCSS.apply(root, root.dataset.faction);
    });

});