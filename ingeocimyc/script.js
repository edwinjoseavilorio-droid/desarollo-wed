async function loadFragment(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    const html = await res.text();
    
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn('Error cargando:', url, err);
  }
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = msg;
  toast.classList.add('show');
  
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    const products = await res.json();
    
    const container = document.querySelector('#products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
      const card = document.createElement('product-card');
      card.setAttribute('name', product.name);
      card.setAttribute('price', product.price);
      card.setAttribute('description', product.description);
      card.setAttribute('image', product.image);
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error cargando productos:', err);
  }
}

function initUI() {
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  const sidebar = document.querySelector('.sidebar-inner');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      if (sidebar) sidebar.classList.toggle('open');

      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Mensaje enviado!');
      contactForm.reset();
    });
  }

  loadProducts();
}

const components = [
  { id: 'site-header', url: 'components/header/header.html' },
  { id: 'site-hero', url: 'components/hero/hero.html' },
  { id: 'site-cert', url: 'components/cert/cert.html' },
  { id: 'site-services', url: 'components/services/services.html' },
  { id: 'site-projects', url: 'components/projects/projects.html' },
  { id: 'site-contact', url: 'components/contact/contact.html' },
  { id: 'site-clients', url: 'components/clients/clients.html' },
  { id: 'site-sidebar', url: 'components/sidebar/sidebar.html' },
  { id: 'site-footer', url: 'components/footer/footer.html' }
];

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all(components.map(c => loadFragment(c.id, c.url)));
  
  initUI();
});

