/* ============================
   DOM ELEMENTS
============================ */

const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

const track = document.getElementById("marqueeTrack");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const cardModal = document.getElementById("cardModal");
const modalName = document.getElementById("modalName");
const modalReview = document.getElementById("modalReview");

const footerYear = document.getElementById("footerYear");

const petGallery = document.querySelector(".p-img-container");


/* ============================
   TESTIMONIAL DATA
============================ */

const testimonials = [
    {
        name: "Namya Gala",
        img: "PETSHOP/img-4.jpeg",
        review:
            "Loved the service by both brothers. Loki enjoyed the environment of the studio. It's very calm. Will visit again."
    },

    {
        name: "Mehul Gosalia",
        img: "PETSHOP/img-4.jpeg",
        review:
            "I had a great experience at Furry Foots dog grooming center! The place was very clean and well-maintained, which shows how seriously they take hygiene..."
    },

    // Remaining testimonials...
];


/* ============================
   SIDEBAR
============================ */

hamburger?.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});


/* ============================
   OVERLAY HELPERS
============================ */

function openOverlay(element) {
    element.classList.add("open");

    requestAnimationFrame(() => {
        element.classList.add("visible");
    });
}

function closeOverlay(element) {
    element.classList.remove("visible");

    setTimeout(() => {
        element.classList.remove("open");
    }, 220);
}


/* ============================
   TESTIMONIALS
============================ */

function testimonialCard(testimonial, index) {

    return `
        <article class="t-card" data-idx="${index}">
            <div class="t-card-top">

                <div>
                    <div class="t-name">${testimonial.name}</div>
                </div>

            </div>

            <p class="t-review">${testimonial.review}</p>

            <button
                class="t-more"
                aria-label="Read full testimonial">
                &bull;&bull;&bull;
            </button>
        </article>
    `;
}

function renderTestimonials() {

    if (!track) return;

    const cards = testimonials.map(testimonialCard).join("");

    track.innerHTML = cards + cards;

    track.style.setProperty(
        "--marquee-duration",
        `${Math.max(20, testimonials.length * 4)}s`
    );
}

function updateOverflowButtons() {

    track.querySelectorAll(".t-card").forEach(card => {

        const review = card.querySelector(".t-review");
        const button = card.querySelector(".t-more");

        button.classList.toggle(
            "show",
            review.scrollHeight > review.clientHeight + 1
        );
    });
}

function openTestimonial(index) {

    const testimonial = testimonials[index];

    modalName.textContent = testimonial.name;
    modalReview.textContent = testimonial.review;

    openOverlay(cardModal);
}


/* ============================
   TESTIMONIAL EVENTS
============================ */

if (track) {

    renderTestimonials();

    window.addEventListener("load", updateOverflowButtons);
    window.addEventListener("resize", updateOverflowButtons);

    track.addEventListener("click", event => {

        const button = event.target.closest(".t-more");

        if (!button) return;

        const index =
            button.closest(".t-card").dataset.idx % testimonials.length;

        openTestimonial(index);
    });
}


/* ============================
   LIGHTBOX
============================ */

if (petGallery) {

    petGallery.addEventListener("click", event => {

        const card = event.target.closest(".p-card");

        if (!card) return;

        const background =
            getComputedStyle(card).backgroundImage;

        const match =
            background.match(/url\(["']?(.*?)["']?\)/);

        if (!match) return;

        lightboxImg.src = match[1];
        lightboxImg.alt = "Furry Foots Gallery";

        openOverlay(lightbox);
    });
}


/* ============================
   OVERLAY EVENTS
============================ */

document.querySelectorAll("[data-close-lightbox]")
    .forEach(button =>
        button.addEventListener("click",
            () => closeOverlay(lightbox))
    );

document.querySelectorAll("[data-close-modal]")
    .forEach(button =>
        button.addEventListener("click",
            () => closeOverlay(cardModal))
    );

[lightbox, cardModal].forEach(overlay => {

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {
            closeOverlay(overlay);
        }
    });

});

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeOverlay(lightbox);
    closeOverlay(cardModal);

});


/* ============================
   FOOTER
============================ */

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


/* ============================
   PET SCROLLER
============================ */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("petImgContainer");
    const prev = document.querySelector(".p-scroll-prev");
    const next = document.querySelector(".p-scroll-next");

    if (!container || !prev || !next) return;

    const scrollAmount = () => {

        const card = container.querySelector(".p-card");

        const width =
            card?.getBoundingClientRect().width ?? 170;

        const gap =
            parseFloat(
                getComputedStyle(container).gap
            ) || 12;

        return (width + gap) * 2;
    };

    prev.addEventListener("click", () => {

        container.scrollBy({
            left: -scrollAmount(),
            behavior: "smooth"
        });

    });

    next.addEventListener("click", () => {

        container.scrollBy({
            left: scrollAmount(),
            behavior: "smooth"
        });

    });

});