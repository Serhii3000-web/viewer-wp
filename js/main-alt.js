document.addEventListener('DOMContentLoaded', ()=>{

    const canvas = document.getElementById('viewerCanvas');
    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    const totalFrames = 48;
    const images = [];

    const urlFolder='Abaddon the Despoiler';

    let currentFrame = 0;
    let isDragging = false;
    let lastX = 0;
    let velocity = 0;

    // ---------- загрузка с fallback JPG -> PNG ----------
    function loadImage(index) {
        const num = String(index + 1).padStart(2, '0');

        const img = new Image();

        const jpgPath = `img/${urlFolder}/${num}.jpg`;
        const pngPath = `img/${urlFolder}/png/${num}.png`;

        img.src = jpgPath;

        img.onerror = () => {
            img.src = pngPath;
        };

        return img;
    }

    // ---------- preload ----------
    for (let i = 0; i < totalFrames; i++) {
        const img = loadImage(i);
        images.push(img);

        img.onload = () => {
            if (i === 0) draw();
        };
    }

    // ---------- resize canvas ----------
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        draw();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ---------- draw ----------
    function draw() {
        const img = images[currentFrame];
        if (!img || !img.complete) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
        );

        const w = img.width * scale;
        const h = img.height * scale;

        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.drawImage(img, x, y, w, h);
    }

    // ---------- loop ----------
    function show(frame) {
        currentFrame = (frame + totalFrames) % totalFrames;
        draw();
    }

    // ---------- движение ----------
    function move(clientX) {
        const dx = clientX - lastX;
        velocity = dx;

        const framesPerWidth = totalFrames / container.offsetWidth;
        const step = dx * framesPerWidth;

        if (Math.abs(step) >= 1) {
            show(currentFrame + Math.floor(step));
            lastX = clientX;
        }
    }

    // ---------- mouse ----------
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // ---------- touch ----------
    canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        lastX = e.touches[0].clientX;
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        move(e.touches[0].clientX);
    });

    // ---------- mouse move ----------
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        move(e.clientX);
    });

    // ---------- inertia ----------
    function inertia() {
        if (!isDragging && Math.abs(velocity) > 0.3) {
            velocity *= 0.95;

            const framesPerWidth = totalFrames / container.offsetWidth;
            const step = velocity * framesPerWidth;

            if (Math.abs(step) >= 1) {
                show(currentFrame + Math.floor(step));
            }
        }

        requestAnimationFrame(inertia);
    }

    inertia();

});