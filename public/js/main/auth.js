const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // важно для сессии
      body: JSON.stringify(data)
    });

    const dataResponse = await response.json();

    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      alert('Ошибка входа ' + dataResponse.message);
    }
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      alert('Ошибка регистрации');
    }
  });
}

const checkAuth = async () => {
    const res = await fetch('/auth/me', {
        credentials: 'include'
    })

    if (res.ok) {
        const user = await res.json();
        console.log('You authorized:', user.item.username);
        //queryModels();
    } else {
        window.location.href = 'login.html';
    }
}

const logout = async () => {
    await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
    window.location.href = 'login.html';
}

//const queryModels = async () => {
//  await fetch('/api/models', {
//    method: 'GET'
//  });
//}

window.checkAuth = checkAuth;
window.logout = logout;

if (!window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('register.html') || window.location.pathname === '/' ) 
  checkAuth();