// Lenis Init
const lenis = new Lenis({
    syncTouch: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Animation Code
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
