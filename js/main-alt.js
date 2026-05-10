// ---------- create viewers ----------
// import { Viewer360 } from './viewer360.js';

// document.addEventListener('DOMContentLoaded', () => {

//     const viewers = document.querySelectorAll('.viewer-360');

//     viewers.forEach((viewerElement) => {

//         new Viewer360(viewerElement);

//     });

// });

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const viewerElements = document.querySelectorAll('.viewer-card');
    const viewers = [];
    let activeIndex = 0;

    // ---------- init viewers ----------
    viewerElements.forEach((el) => {
        viewers.push(new Viewer360(el));
    });

    console.log('viewerElements ', viewerElements);
    console.log('viewers ', viewers);
    console.log('viewers[0].element= ', viewers[0].element);

    // ---------- update ----------
    function updateActiveViewer() {
        viewers.forEach((viewer, index) => {

            viewer.element.style.display =
                index === activeIndex
                    ? 'block'
                    : 'none';

            console.log('viewer.element.style.display= ', viewer.element.style.display);

            viewer.resetInteraction();

            if (index === activeIndex) {
                viewer.resizeCanvas();
            }
        });
    }

    updateActiveViewer();

    // ---------- prev ----------
    document
        .getElementById('prevBtn')
        .addEventListener('click', () => {

            activeIndex--;

            if (activeIndex < 0) {
                activeIndex =
                    viewers.length - 1;
            }

            updateActiveViewer();
        });

    // ---------- next ----------
    document
        .getElementById('nextBtn')
        .addEventListener('click', () => {

            activeIndex++;

            if (
                activeIndex >= viewers.length
            ) {
                activeIndex = 0;
            }

            updateActiveViewer();

        });

});