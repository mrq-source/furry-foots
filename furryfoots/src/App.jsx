import { useEffect, useRef, useState } from 'react'
import './App.css'
import siteContent from './content/gallary.json'

import aboutImage from '../../PETSHOP/img-1.jpeg'
import contactImage from '../../PETSHOP/img-2.jpeg'
import logoImage from '../../PETSHOP/logo.jpeg'
import logoMark from '../../PETSHOP/edited-photo (2).png'
import logoText from '../../PETSHOP/edited-photo (9).png'
import cover1 from '../../PETSHOP/cover-1.png'
import cover2 from '../../PETSHOP/cover-2.png'
import cover3 from '../../PETSHOP/cover-3.png'
import cover4 from '../../PETSHOP/cover-4.png'
import cover5 from '../../PETSHOP/cover-5.png'
import cover6 from '../../PETSHOP/cover-6.png'
import cover7 from '../../PETSHOP/cover-7.png'
import cover8 from '../../PETSHOP/cover-8.png'

const services = [
  {
    title: 'Spa Bath & Fluff Dry',
    description: 'A gentle spa bath followed by a soft, fluffy blow-dry finish.',
    image: cover1,
  },
  {
    title: 'Medicated Bath',
    description: 'Specialised bath treatment for skin conditions and allergies.',
    image: cover2,
  },
  {
    title: 'Tick & Flea Treatment',
    description: 'Thorough treatment to keep your pet tick and flea free.',
    image: cover3,
  },
  {
    title: 'Nail Trim & File',
    description: 'Safe nail trimming and filing for comfortable paws.',
    image: cover4,
  },
  {
    title: 'Breed Specific Haircuts',
    description: "Haircuts styled to suit your pet's breed standard.",
    image: cover5,
  },
  {
    title: 'Under Paws & Sanitary Trim',
    description: 'Trimming of paw pads and sanitary areas for hygiene and comfort.',
    image: cover6,
  },
  {
    title: 'Ear Cleaning',
    description: 'Gentle cleaning to keep ears healthy and infection-free.',
    image: cover7,
  },
  {
    title: 'Luxury Cologne Spray',
    description: 'A light, pet-safe fragrance finish after grooming.',
    image: cover8,
  },
]

const { gallery: galleryImages } = siteContent

const mediaUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const navigation = [
  ['Home', '#hero'],
  ['About Us', '#about-us'],
  ['Our Services', '#services'],
  ["Our Pet's Room", '#pet-room'],
  ['Testimonials', '#testimonials'],
  ['Contact Us', '#contact'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overlay, setOverlay] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const galleryRef = useRef(null)
  const testimonialTrackRef = useRef(null)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}content/testimonial.json`)
        if (!response.ok) throw new Error('Unable to load testimonials')
        const items = await response.json()
        setTestimonials(items.filter((testimonial) => testimonial.visible))
      } catch {
        setTestimonials([])
      }
    }

    loadTestimonials()
  }, [])

  useEffect(() => {
    const track = testimonialTrackRef.current
    if (!track) return undefined

    const updateOverflowButtons = () => {
      track.querySelectorAll('.t-card').forEach((card) => {
        const review = card.querySelector('.t-review')
        const button = card.querySelector('.t-more')
        button.classList.toggle('show', review.scrollHeight > review.clientHeight + 1)
      })
    }

    updateOverflowButtons()
    window.addEventListener('resize', updateOverflowButtons)
    return () => window.removeEventListener('resize', updateOverflowButtons)
  }, [testimonials])

  useEffect(() => {
    if (!overlay) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOverlay(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [overlay])

  const openGalleryImage = (event) => {
    const { imageUrl, imageAlt } = event.currentTarget.dataset

    if (imageUrl) {
      setOverlay({ type: 'image', imageUrl, imageAlt })
    }
  }

  const scrollGallery = (direction) => {
    const container = galleryRef.current
    if (!container) return

    const card = container.querySelector('.p-card')
    const styles = window.getComputedStyle(container)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 12
    const cardWidth = card?.getBoundingClientRect().width || 170
    container.scrollBy({ left: direction * (cardWidth + gap) * 2, behavior: 'smooth' })
  }

  const testimonialCards = (copy) =>
    testimonials.map((testimonial, index) => (
      <article className="t-card" key={`${copy}-${index}`}>
        <div className="t-card-top">
          <div className="t-name">{testimonial.name}</div>
        </div>
        <p className="t-review">{testimonial.review}</p>
        <button
          className="t-more"
          type="button"
          aria-label={`Read the full testimonial from ${testimonial.name}`}
          onClick={() => setOverlay({ type: 'testimonial', testimonial })}
        >
          &bull;&bull;&bull;
        </button>
      </article>
    ))

  return (
    <>
      <nav aria-label="Main navigation">
        <a className="logo" href="#hero" aria-label="Furry Foots home">
          <img id="logo1" src={logoMark} alt="" />
          <img id="logo2" src={logoText} alt="Furry Foots" />
        </a>

        <button
          className="hamburger"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
        </button>

        <div className={`sidebar${menuOpen ? ' active' : ''}`}>
          <ul className="links">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <a
        className="floating-btn"
        href="https://wa.me/919867884536"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
      </a>

      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <img className="hero-logo" src={logoImage} alt="Furry Foots Logo" />
            <h1>Welcome to Furry Foots - Pet Grooming Studio &amp; Academy</h1>
          </div>
        </section>

        <section className="about-us" id="about-us">
          <div className="aboutus">
            <img className="side-pic" src={aboutImage} alt="Pet Grooming" />
            <div id="text">
              <h2 id="text1">About Us</h2>
              <p>
                At Furry Foots Pet Grooming Studio, we believe every pet deserves a safe,
                comfortable, and stress-free grooming experience. Our skilled groomers combine
                expert techniques with premium-quality products to provide personalized care that
                keeps your furry family members clean, healthy, and looking their best.
              </p>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="services__inner">
            <h2 className="services__heading">OUR SERVICES</h2>
            <div className="services__grid">
              {services.map((service) => (
                <article className="service" key={service.title}>
                  <div className="service__image">
                    <img src={service.image} alt="" />
                  </div>
                  <div className="service__text">
                    <h3 className="service__title">{service.title}</h3>
                    <p className="service__desc">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pet-room" className="pet-room">
          <div className="p-text">
            <h2>OUR PET&apos;S ROOM</h2>
          </div>
          <div className="p-scroller-wrap">
            <button
              className="p-scroll-btn p-scroll-prev"
              type="button"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery(-1)}
            >
              &#10094;
            </button>
            <div className="p-img-container" ref={galleryRef}>
              {galleryImages.map((image) => (
                <div
                  className="p-card"
                  key={image.image}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${image.alt}`}
                  data-image-url={mediaUrl(image.image)}
                  data-image-alt={image.alt}
                  style={{
                    backgroundImage: `url("${mediaUrl(image.image)}")`,
                    backgroundPosition: image.position || 'center',
                  }}
                  onClick={openGalleryImage}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openGalleryImage(event)
                    }
                  }}
                />
              ))}
            </div>
            <button
              className="p-scroll-btn p-scroll-next"
              type="button"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery(1)}
            >
              &#10095;
            </button>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <div className="testimonials-head">
            <h2>
              Testimonials
              <svg viewBox="0 0 150 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M2 10c20-12 30 6 50-4s30 6 50-4 30 6 46-2"
                  stroke="#1b7a9e"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </h2>
            <p>Real words from real pet parents who trust us with their best friends.</p>
          </div>
          <div className="marquee-viewport">
            <div
              className="marquee-track"
              ref={testimonialTrackRef}
              style={{ '--marquee-duration': `${Math.max(20, testimonials.length * 4)}s` }}
            >
              {testimonialCards('first')}
              {testimonialCards('second')}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="c-text">
            <h1>Get In Touch?</h1>
          </div>
          <div className="contact-wrap">
            <div className="c-sub-text">
              <p className="c-intro">
                We&apos;d love to hear from you! Whether you want to book a grooming session, ask
                about our services, or simply have a question, we&apos;re here to help.
              </p>
              <div className="c-row">
                <i className="fa-solid fa-map-pin" aria-hidden="true" />
                <div>
                  <span className="c-label">Address</span>
                  <a
                    className="c-value c-link"
                    href="https://maps.app.goo.gl/2utxqFBoZzMQpuL17"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A-40, Vasant Marvel Glory CHSL, Near Magathane Metro Station, Borivali (East),
                    Mumbai-400066.
                  </a>
                </div>
              </div>
              <div className="c-row">
                <i className="fa-solid fa-at" aria-hidden="true" />
                <div>
                  <span className="c-label">Email</span>
                  <a className="c-value c-link" href="mailto:furryfoots99@gmail.com">
                    furryfoots99@gmail.com
                  </a>
                </div>
              </div>
              <div className="c-row">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <div>
                  <span className="c-label">Phone</span>
                  <a className="c-value c-link" href="tel:+919136930520">
                    +91-91369-30520
                  </a>
                </div>
              </div>
              <div className="c-row">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <div>
                  <span className="c-label">WhatsApp</span>
                  <a
                    className="c-value c-link"
                    href="https://wa.me/919867884536"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 98678 84536
                  </a>
                </div>
              </div>
            </div>
            <div
              className="c-img"
              role="img"
              aria-label="A happy pet after grooming"
              style={{ backgroundImage: `url("${contactImage}")` }}
            />
          </div>
        </section>

        <section className="social" id="social">
          <div className="social-inner">
            <h2>Follow Along</h2>
            <p>Grooming transformations, happy tails, and behind-the-scenes at the studio.</p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/furryfoots_india?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/share/1Eo6MLjN5g/?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/919867884536"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              </a>
              <a
                href="https://share.google/wBf7sIn7nmPJaO5kF"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
              >
                <i className="fa-brands fa-google" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logoText} alt="Furry Foots" className="footer-logo" />
            <p>
              Pet Grooming Studio 🐾
              <br />
              Where Every Paw Deserves Luxury🐶
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              {navigation.slice(0, 5).map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Get In Touch</h3>
            <ul>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/2utxqFBoZzMQpuL17">Location</a>
              </li>
              <li>
                <a href="mailto:furryfoots99@gmail.com">furryfoots99@gmail.com</a>
              </li>
              <li>
                <a href="tel:+919136930520">+91-9136930520</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Furry Foots. All rights reserved.</span>
        </div>
      </footer>

      {overlay?.type === 'image' && (
        <div
          className="overlay open visible"
          role="dialog"
          aria-modal="true"
          aria-label="Pet gallery image"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOverlay(null)
          }}
        >
          <button
            className="overlay-close"
            type="button"
            aria-label="Close image"
            onClick={() => setOverlay(null)}
          >
            &times;
          </button>
          <img src={overlay.imageUrl} alt={overlay.imageAlt} />
        </div>
      )}

      {overlay?.type === 'testimonial' && (
        <div
          className="overlay open visible"
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${overlay.testimonial.name}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOverlay(null)
          }}
        >
          <button
            className="overlay-close"
            type="button"
            aria-label="Close testimonial"
            onClick={() => setOverlay(null)}
          >
            &times;
          </button>
          <div className="modal-card">
            <div className="modal-body">
              <div className="t-name">{overlay.testimonial.name}</div>
              <p className="t-review">{overlay.testimonial.review}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
