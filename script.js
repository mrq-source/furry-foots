
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
const testimonials = [
    { name: "Ritika Shah", img: "PETSHOP/img-4.jpeg",
      review: "Bruno used to shake the entire drive to the groomer. Now he practically drags me through the Furry Foots door. The staff learned his quirks in one visit and the boarding updates they send are the only reason I can travel without guilt." },
    { name: "Aman Kapoor", pet: "Owner of Miso, Shih Tzu", img: "PETSHOP/img-4.jpeg",
      review: "Miso has skin allergies that most groomers get nervous about. The team here actually asked for his vet notes before the first appointment, which no one else has ever done." },
    { name: "Sneha Patil", pet: "Owner of Coco, Indie", img: "PETSHOP/img-4.jpeg",
      review: "We adopted Coco off the street and she was terrified of strangers. Six months of patient grooming visits later, she wags her tail the second we turn onto the block. That's not a small thing." },
    { name: "Devansh Rao", pet: "Owner of Simba, Beagle", img: "PETSHOP/img-4.jpeg",
      review: "Boarded Simba for a 10-day trip and honestly felt more informed about his day than I do most days when he's home with me — photos, feeding notes, even a note about a new bark he picked up from another dog in the yard." },
    { name: "Farah Sheikh", pet: "Owner of Luna, Persian Cat", img: "PETSHOP/img-4.jpeg",
      review: "Not every 'pet' place knows what to do with a cat that hates water. Luna's groomer switched to a waterless routine without me even having to ask twice." },
    { name: "Kabir Mehta", pet: "Owner of Rocky, Labrador", img: "PETSHOP/img-4.jpeg",
      review: "Rocky has separation anxiety and I was nervous about boarding him for the first time. The team called me on day one just to say he'd settled in fine. Small gesture, huge relief." },
];
 
const track = document.getElementById('marqueeTrack');
 
function tCardHTML(t, idx) {
    return `
    <article class="t-card" data-idx="${idx}">
        <div class="t-card-top">
            <img class="t-pic" src="${t.img}" alt="${t.name}'s pet" data-full="${t.img}">
            <div>
                <div class="t-name">${t.name}</div>
            </div>
        </div>
        <p class="t-review">${t.review}</p>
        <button class="t-more" aria-label="Read full testimonial">&bull;&bull;&bull;</button>
    </article>`;
}
 
if (track) {
    // render twice back-to-back for a seamless loop
    track.innerHTML = testimonials.map(tCardHTML).join('') + testimonials.map(tCardHTML).join('');
 
    // scale marquee speed to content amount so pace stays consistent
    track.style.setProperty('--marquee-duration', `${testimonials.length * 7}s`);
 
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
        const pic = e.target.closest('.t-pic');
        if (pic) {
            lightboxImg.src = pic.dataset.full;
            lightboxImg.alt = pic.alt;
            openOverlay(lightbox);
            return;
        }
        const btn = e.target.closest('.t-more');
        if (btn) {
            const idx = btn.closest('.t-card').dataset.idx % testimonials.length;
            const t = testimonials[idx];
            document.getElementById('modalImg').src = t.img;
            document.getElementById('modalImg').alt = t.name;
            document.getElementById('modalName').textContent = t.name;
            document.getElementById('modalReview').textContent = t.review;
            openOverlay(cardModal);
        }
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