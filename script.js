
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
const testimonials = [
    { name: "Namya Gala", img: "PETSHOP/img-4.jpeg",
      review: "Loved the service by both brothers.Loki enjoyed the environment of the studio. Its very calm.Will visit again" },
    { name: "Mehul Gosalia", pet: "Owner of Miso, Shih Tzu", img: "PETSHOP/img-4.jpeg",
      review: "I had a great experience at Furry Foots dog grooming center! The place was very clean and well-maintained, which shows how seriously they take hygiene. My pet Max came back looking and smelling fantastic. The owner was especially helpful and clearly cares about both the pets and the customers. Highly recommended for all pet lovers." },
    { name: "Neha mangtani", pet: "Owner of Coco, Indie", img: "PETSHOP/img-4.jpeg",
      review: "Staff is very friendly & service was amazing" },
    { name: "Rohan Shah", pet: "Owner of Simba, Beagle", img: "PETSHOP/img-4.jpeg",
      review: "Furry Foots has been amazing! Super sweet and genuine people who really take care of the pets. You can tell they truly care and it makes a huge difference." },
    { name: "Jaiswal roma", pet: "Owner of Luna, Persian Cat", img: "PETSHOP/img-4.jpeg",
      review: "The service was very good, the way everything is explained is commendable, my Gucci is very happy" },
    { name: "Shrushti manwar", pet: "Owner of Rocky, Labrador", img: "PETSHOP/img-4.jpeg",
      review: "Just took my dog to get groomed. The staff were super friendly. He's usually a little nervous with grooming, but they were so patient and gentle with him.He came out looking and smelling amazing....and clean, fluffy.Really happy with the whole experience. You can tell they genuinely care about the animals. Definitely going back!." },
    { name: "Aarshik", pet: "Owner of Rocky, Labrador", img: "PETSHOP/img-4.jpeg",
      review: "Excellent grooming service! The team is professional, caring, and ensures every pet feels comfortable. The owner themself take utmost care and attention to provide a stress free grooming to our fur baby. The studio is spotless and hygienic. Highly recommended!" },
    { name: "Anjum Khan", pet: "Owner of Rocky, Labrador", img: "PETSHOP/img-4.jpeg",
      review: "Impressive, great service, the staff handle my babies very nicely" },
];
 
const track = document.getElementById('marqueeTrack');
 
function tCardHTML(t, idx) {
    return `
    <article class="t-card" data-idx="${idx}">
        <div class="t-card-top">
            <div>
                <div class="t-name">${t.name}</div>
                ${t.pet ? `<div class="t-pet">${t.pet}</div>` : ''}
            </div>
        </div>
        <p class="t-review">${t.review}</p>
        <button class="t-more" aria-label="Read full testimonial">&bull;&bull;&bull;</button>
    </article>`;
}
 
if (track) {
    // render twice back-to-back for a seamless loop
    track.innerHTML = testimonials.map(tCardHTML).join('') + testimonials.map(tCardHTML).join('');
 
    // speed the testimonial marquee up a bit
    track.style.setProperty('--marquee-duration', `${Math.max(20, testimonials.length * 4)}s`);
 
    // show the ••• button only where the review text is actually clipped
    function checkTestimonialOverflow() {
        track.querySelectorAll('.t-card').forEach(card => {
            const p = card.querySelector('.t-review');
            const btn = card.querySelector('.t-more');
            btn.classList.toggle('show', p.scrollHeight > p.clientHeight + 1);
        });
    }
    window.addEventListener('load', checkTestimonialOverflow);
    window.addEventListener('resize', checkTestimonialOverflow);
 
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const cardModal = document.getElementById('cardModal');
 
    function openOverlay(el) {
        el.classList.add('open');
        requestAnimationFrame(() => el.classList.add('visible'));
    }
    function closeOverlay(el) {
        el.classList.remove('visible');
        setTimeout(() => el.classList.remove('open'), 220);
    }
 
    track.addEventListener('click', e => {
        const btn = e.target.closest('.t-more');
        if (!btn) return;

        const idx = btn.closest('.t-card').dataset.idx % testimonials.length;
        const t = testimonials[idx];
        document.getElementById('modalName').textContent = t.name;
        document.getElementById('modalReview').textContent = t.review;
        openOverlay(cardModal);
    });
 
    document.querySelectorAll('[data-close-lightbox]').forEach(b =>
        b.addEventListener('click', () => closeOverlay(lightbox)));
    document.querySelectorAll('[data-close-modal]').forEach(b =>
        b.addEventListener('click', () => closeOverlay(cardModal)));
 
    [lightbox, cardModal].forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeOverlay(overlay);
        });
    });
 
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeOverlay(lightbox);
            closeOverlay(cardModal);
        }
    });
}

    const petGallery = document.querySelector('.p-img-container');
    
    if (petGallery) {
        petGallery.addEventListener('click', e => {
            const card = e.target.closest('.p-card');
            if (!card) return;
    
            const bg = getComputedStyle(card).backgroundImage; // e.g. url("PETSHOP/img-5.jpeg")
            const match = bg.match(/url\(["']?(.*?)["']?\)/);
            if (!match) return;
    
            lightboxImg.src = match[1];
            lightboxImg.alt = "Furry Foots gallery photo";
            openOverlay(lightbox);
        });
    }

const footerYear = document.getElementById('footerYear');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('petImgContainer');
  const prevBtn = document.querySelector('.p-scroll-prev');
  const nextBtn = document.querySelector('.p-scroll-next');

  const scrollAmount = () => {
    const card = container.querySelector('.p-card');
    const cardWidth = card ? card.getBoundingClientRect().width : 170;
    const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap) || 12;
    return (cardWidth + gap) * 2; // scroll ~2 cards per click, tweak as you like
  };

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
});