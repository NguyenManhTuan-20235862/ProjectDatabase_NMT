const API_BASE_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorAlert = document.getElementById('errorAlert');
    const loadingSpinner = document.querySelector('.loading');

    // Function to show error message
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 5000);
    }

    // Function to handle login
    async function handleLogin(e) {
        e.preventDefault();

        // Show loading spinner
        loadingSpinner.style.display = 'inline-block';
        
        // Get form data
        const formData = new FormData(loginForm);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Đăng nhập thất bại');
            }

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard
            window.location.href = 'index.html';

        } catch (error) {
            showError(error.message);
        } finally {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';
        }
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);

    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = 'index.html';
    }
    // Xử lý hiệu ứng input fields
    const inputs = document.querySelectorAll('.input-field input');
    inputs.forEach(input => {
        if (input.value) {
            input.parentElement.classList.add('active');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('active');
            }
        });
    });

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('.remember input').checked;

        // Hiệu ứng loading
        const loginBtn = document.querySelector('.login-btn');
        const originalContent = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;

        // Giả lập API call
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                // Lưu trạng thái đăng nhập
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Chuyển hướng với hiệu ứng
                loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => {
                    window.location.href = 'admin-profile.html';
                }, 500);
            } else {
                // Hiển thị lỗi
                loginBtn.innerHTML = originalContent;
                loginBtn.disabled = false;
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid username or password';
                
                const form = document.getElementById('loginForm');
                form.insertBefore(errorMessage, loginBtn);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        }, 1000);
    });

    // Kiểm tra remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const usernameInput = document.getElementById('username');
        const rememberCheckbox = document.querySelector('.remember input');
        
        usernameInput.value = rememberedUser;
        usernameInput.parentElement.classList.add('active');
        rememberCheckbox.checked = true;
    }
});