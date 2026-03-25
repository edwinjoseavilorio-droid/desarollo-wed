class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'price', 'description', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || '';
    const price = this.getAttribute('price') || '';
    const description = this.getAttribute('description') || '';
    const image = this.getAttribute('image') || '';

    const formattedPrice = price ? `$${Number(price).toLocaleString('es-CO')}` : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--card, #ffffff);
          border-radius: var(--radius, 8px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        :host(:hover) {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .card-content {
          padding: 16px;
        }
        h3 {
          margin: 0 0 8px 0;
          font-size: 1.2em;
          color: var(--primary, #034f84);
        }
        .product-desc {
          color: var(--muted, #6b7280);
          margin: 0 0 12px 0;
          font-size: 0.9em;
          line-height: 1.4;
          display: none;
        }
        :host(:hover) .product-desc {
          display: block;
        }
        .product-price {
          font-weight: bold;
          color: var(--accent, #012a4a);
          margin: 0 0 16px 0;
        }
        .btn {
          background: var(--primary, #034f84);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.2s ease;
        }
        .btn:hover {
          background: var(--accent, #012a4a);
        }
      </style>
      <div class="card-content">
        <h3>${name}</h3>
        <p class="product-desc">${description}</p>
        <p class="product-price">${formattedPrice}</p>
        <button class="btn primary">Más info</button>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);