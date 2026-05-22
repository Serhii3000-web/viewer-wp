// app.js

document.addEventListener('DOMContentLoaded', () => {

    const huds = document.querySelectorAll('.hud');

    huds.forEach(hud => {
        new LogoWH(hud);
    });

});