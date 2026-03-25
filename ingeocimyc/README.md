# INGEOCIMYC - Laboratorio de Geotecnia y Concretos

Sistema web modular con autenticación, carga dinámica de componentes y gestión de productos.

## Características Principales

- Autenticación obligatoria con credenciales hardcodeadas (solo educativo)
- Carga dinámica de fragmentos HTML para componentes reutilizables
- Web Components personalizados para tarjetas de productos
- Diseño responsive con CSS modular
- Gestión de productos desde archivo JSON

## Credenciales de Acceso

```
Usuario: admin
Contraseña: 1234
```

---

## Explicación de Conceptos Técnicos

### 1. Fragmentos HTML (HTML Fragments)

Los fragmentos son archivos HTML independientes que se cargan dinámicamente en la página principal sin recargar toda la página.

**¿Cómo funcionan?**
- Se almacenan en `components/` (ej: `header/header.html`, `footer/footer.html`)
- Se cargan con `fetch()` en `script.js`
- Se insertan en contenedores específicos con `innerHTML`

**Ventajas:**
- Reutilización de código
- Mantenimiento más fácil
- Carga asíncrona sin recarga de página
- Separación de responsabilidades

**Ejemplo de implementación:**
```javascript
// script.js
async function loadFragment(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Carga el header
await loadFragment('site-header', 'components/header/header.html');
```

### 2. Plantillas HTML (`<template>`)

Las plantillas definen estructuras HTML reutilizables que se clonan dinámicamente.

**Características:**
- No se renderizan hasta ser usadas
- Se clonan múltiples veces con `cloneNode()`
- Ideales para listas de elementos dinámicos

**Ejemplo:**
```html
<template id="product-template">
  <article class="card">
    <h3></h3>
    <p class="description"></p>
    <button>Comprar</button>
  </article>
</template>
```

### 3. Web Components

Elementos HTML personalizados con encapsulación completa usando Shadow DOM.

**¿Qué son?**
- **Custom Elements:** Tags propios (ej: `<product-card>`)
- **Shadow DOM:** Estilos y estructura encapsulados
- **HTML Templates:** Reutilización de estructura
- Estándar web moderno

**Implementación en el proyecto:**
```javascript
// components/product-card/product-card.js
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Shadow DOM
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos encapsulados */
      </style>
      <div class="card">
        <h3>${name}</h3>
        <!-- contenido -->
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);
```

**Uso:**
```html
<!-- index.html -->
<product-card name="Ensayo de Suelos" price="120000"></product-card>
```

---

## Implementación del Formulario de Inicio de Sesión

### Arquitectura de Autenticación

**1. Verificación Inicial (index.html)**
```javascript
// Se ejecuta ANTES de cargar cualquier contenido
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.replace('./components/login/login.html');
}
```

**2. Formulario de Login (login.html)**
- Campos: usuario y contraseña
- Validación en cliente con JavaScript
- Mensajes de error dinámicos
- Redirección automática al éxito

**3. Lógica de Autenticación (auth.js)**
```javascript
const VALID_USER = 'admin';
const VALID_PASS = '1234';

function login(username, password) {
  return username === VALID_USER && password === VALID_PASS;
}

function initLoginPage() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (login(username, password)) {
      localStorage.setItem('loggedIn', 'true');
      window.location.replace('../../index.html');
    } else {
      // Mostrar error
    }
  });
}
```

### Flujo Completo

```
1. Usuario accede a index.html
   ↓
2. Script verifica localStorage['loggedIn']
   ↓
   - NO → Redirige a login.html
   - SÍ → Carga página principal
   ↓
3. En login: usuario ingresa admin/1234
   ↓
4. Validación correcta → localStorage['loggedIn'] = 'true'
   ↓
5. Redirección a index.html
```

---

## Buenas Prácticas Aplicadas

### 1. **Separación de Responsabilidades**
- **HTML:** Solo estructura
- **CSS:** Solo estilos (modular por componente)
- **JavaScript:** Solo lógica

### 2. **Nomenclatura Consistente**
- **camelCase:** `loadFragment()`, `initLoginPage()`
- **kebab-case:** `product-card`, `site-header`
- **PascalCase:** `ProductCard` (clases JS)
- **SCREAMING_SNAKE_CASE:** `VALID_USER` (constantes)

### 3. **Código Modular**
- Archivos pequeños y específicos
- Funciones reutilizables
- Imports organizados en `styles.css`

### 4. **Accesibilidad (A11y)**
- Labels asociados a inputs
- Atributos `alt` en imágenes
- Navegación por teclado
- Aria-live para mensajes dinámicos

### 5. **Responsive Design**
- Media queries para móviles
- Flexbox/Grid para layouts
- Menú hamburguesa adaptativo

### 6. **Gestión de Errores**
- Try/catch en funciones asíncronas
- Mensajes de error informativos
- Fallbacks para recursos faltantes

### 7. **Optimización de Rendimiento**
- Carga asíncrona de componentes
- Shadow DOM para encapsulación
- Imágenes con lazy loading

---

## Cómo Ejecutar el Proyecto

### Opción 1: Servidor Local (Python)
```bash
cd ingeocimyc
python -m http.server 8000
# Acceder a http://localhost:8000/login.html
```

### Opción 2: VS Code Live Server
- Click derecho en `login.html`
- "Open with Live Server"

### Opción 3: Navegador Directo
- Abrir `login.html` en navegador moderno
- Ingresar credenciales: `admin` / `1234`

---

## Estructura del Proyecto

```
ingeocimyc/
├── index.html              # Página principal
├── login.html              # Redirección a login
├── script.js               # Lógica principal
├── auth.js                 # Autenticación
├── styles.css              # Imports de CSS
├── README.md               # Esta documentación
├── components/             # Fragmentos HTML
│   ├── header/            # Cabecera
│   ├── footer/            # Pie de página
│   ├── services/          # Servicios
│   ├── product-card/      # Web Component
│   └── ...                # Otros componentes
├── data/
│   └── products.json      # Datos de productos
└── assets/                # Recursos estáticos
```

---

## Notas Importantes

**Este proyecto es educativo.** Las credenciales están hardcodeadas y NO debe usarse en producción.

**Para producción requeriría:**
- Backend con validación segura
- Tokens JWT
- HTTPS obligatorio
- Protección CSRF/XSS
- Base de datos real

---

**Proyecto:** INGEOCIMYC - Laboratorio de Geotecnia y Concretos  
**Tipo:** Aplicación Web Educativa Modular  
**Fecha:** Marzo 2026  
**Estado:** Completo y Funcional

### Opción 1: Servidor Local (Python)
```bash
cd ingeocimyc
python -m http.server 8000

```

### Opción 2: VS Code Live Server
- Click derecho en `login.html`
- "Open with Live Server"

### Opción 3: Navegador Directo
- Abrir `login.html` en navegador moderno
- Ingresar credenciales: `admin` / `1234`

---

## Estructura del Proyecto

```
ingeocimyc/
├── index.html              # Página principal
├── login.html              # Redirección a login
├── script.js               # Lógica principal
├── auth.js                 # Autenticación
├── styles.css              # Imports de CSS
├── README.md               # Esta documentación
├── components/             # Fragmentos HTML
│   ├── header/            # Cabecera
│   ├── footer/            # Pie de página
│   ├── services/          # Servicios
│   ├── product-card/      # Web Component
│   └── ...                # Otros componentes
├── data/
│   └── products.json      # Datos de productos
└── assets/                # Recursos estáticos
```

---

## Notas Importantes

**Este proyecto es educativo.** Las credenciales están hardcodeadas y NO debe usarse en producción.

**Para producción requeriría:**
- Backend con validación segura
- Tokens JWT
- HTTPS obligatorio
- Protección CSRF/XSS
- Base de datos real

---

**Proyecto:** INGEOCIMYC - Laboratorio de Geotecnia y Concretos  
**Tipo:** Aplicación Web Educativa Modular  
**Fecha:** Marzo 2026  
**Estado:** Completo y Funcional