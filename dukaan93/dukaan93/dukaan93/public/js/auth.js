
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
          
          const data = await response.json();
          
          if (response.ok) {
            window.location.href = '/dashboard/home';
          } else {
            alert(data.message || 'Login failed. Please check your credentials.');
          }
        } catch (err) {
          console.error('Login error:', err);
          alert('An error occurred during login. Please try again later.');
        }
      });
    }
    
    // Google login button
    const googleLoginBtn = document.getElementById('google-login');
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', function() {
        window.location.href = '/api/auth/google';
      });
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
          });
          
          const data = await response.json();
          
          if (response.ok) {
            window.location.href = '/dashboard/home';
          } else {
            alert(data.message || 'Registration failed. Please try again.');
          }
        } catch (err) {
          console.error('Registration error:', err);
          alert('An error occurred during registration. Please try again later.');
        }
      });
    }
  });
  