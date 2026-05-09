// ---------- create viewers ----------
// import { Viewer360 } from './viewer360.js';

document.addEventListener('DOMContentLoaded', () => {

    const viewers = document.querySelectorAll('.viewer-360');

    viewers.forEach((viewerElement) => {

        new Viewer360(viewerElement);

    });

});