document.addEventListener(
    'DOMContentLoaded',
    () => {

        document
            .querySelectorAll('.carousel')
            .forEach(root => {

                new CarouselWH(root);
            });
    }
);