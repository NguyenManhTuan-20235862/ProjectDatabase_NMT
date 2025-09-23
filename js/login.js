document.addEventListener('DOMContentLoaded', function() {
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