/* ==========================================================================
   LitLore Academy - Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header Effect
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Program Tabs Filtering System
  const tabButtons = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 3. Modal Overlay System
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close, [data-close-modal]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);

      // If program modal, update program title in modal
      if (modalId === 'modal-program' && trigger.hasAttribute('data-program-name')) {
        const progTitle = trigger.getAttribute('data-program-name');
        const modalTitle = targetModal.querySelector('.modal-program-title');
        if (modalTitle) modalTitle.textContent = progTitle;
      }

      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlays.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. Form Submission Handling with Toast Notifications
  const contactForms = document.querySelectorAll('.contact-form, .modal-form');
  const toast = document.getElementById('toast-notification');

  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show toast
      showToast('Thank you! Your enquiry has been received. Our academic team will contact you shortly.');

      // Reset form
      form.reset();

      // Close open modals if any
      modalOverlays.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  function showToast(message) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-message') || toast;
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
