// Lenis Init
const lenis = new Lenis({
    syncTouch: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Prevent Right Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Image Animation
const elems = document.querySelectorAll(".elem");
elems.forEach((elem) => {
    const image = elem.querySelector("img");

    const tl = gsap.timeline();

    tl.set(image, {
        transformOrigin: `${gsap.utils.random(0, 100)}% 0`,
    }, 0)
        .to(
            image,
            {
                scale: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: elem,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            },
            0
        )
        .to(
            elem,
            {
                xPercent: window.innerWidth < 768 ? gsap.utils.random(-300, 300) : gsap.utils.random(-110, 110),
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            },
            0
        );
});

// Color Animation on Para
function colorAnimation() {
    const para = document.querySelector(".para");
    para.innerHTML = para.textContent.split(" ")
        .map(word => `<span class='word'>${word}</span>`)
        .join(" ");

    let hue = 0;
    const hueIncrement = 0.1;

    function generateColor(hue) {
        return `hsl(${hue}, 90%, 70%)`;
    }

    function getNextColor() {
        hue = (hue + hueIncrement) % 360;
        return generateColor(hue);
    }

    function animate() {
        const color = getNextColor();
        document.documentElement.style.setProperty('--bg-color', color);
        requestAnimationFrame(animate);
    }

    animate();
}

colorAnimation();

// Cursor Animation
gsap.set(".custom-cursor", {
    display: window.innerWidth > 768 ? 'block' : 'none',
})

document.addEventListener('mousemove', (e) => {
    const progressBar = document.querySelector('.progress-container')
    const rect = progressBar.getBoundingClientRect()

    if (Math.abs(e.clientX - rect.left) < 40 && e.clientY > rect.top && e.clientY < rect.bottom){
        gsap.to(".custom-cursor", {
            left: rect.left + rect.width/2,
            top: e.clientY,
            ease: 'expo.out',
        })
    } else{
        gsap.to(".custom-cursor", {
            left: e.clientX,
            top: e.clientY,
            ease: 'expo.out',
        })
    }
})
