const VALID_USER = 'admin';
const VALID_PASS = '1234';

function isAuthenticated() {
  return localStorage.getItem('loggedIn') === 'true';
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.replace('./components/login/login.html');
  }
}

function login(username, password) {
  return username === VALID_USER && password === VALID_PASS;
}

function logout() {
  localStorage.removeItem('loggedIn');
  window.location.replace('./components/login/login.html');
}

function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const errorMsg = document.getElementById('error-msg');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando...';

    setTimeout(() => {
      if (login(username, password)) {
        localStorage.setItem('loggedIn', 'true');

        errorMsg.textContent = '✅ Acceso correcto. Redirigiendo...';
        errorMsg.style.color = '#4caf50';
        errorMsg.style.marginTop = '12px';
        errorMsg.style.padding = '10px';
        errorMsg.style.backgroundColor = '#e8f5e9';
        errorMsg.style.borderRadius = '4px';

        setTimeout(() => {
          window.location.replace('../../index.html');
        }, 500);
      } else {
        errorMsg.textContent = '❌ Usuario o contraseña incorrectos';
        errorMsg.style.color = '#d32f2f';
        errorMsg.style.marginTop = '12px';
        errorMsg.style.padding = '10px';
        errorMsg.style.backgroundColor = '#ffebee';
        errorMsg.style.borderRadius = '4px';

        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
      }
    }, 500);
  });
}

