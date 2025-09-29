document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorAlert = document.getElementById('errorAlert');
    const loginButton = document.querySelector('.login-btn');
    
    // Function to show error message
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.add('show');
        setTimeout(() => {
            errorAlert.classList.remove('show');
        }, 5000);
    }

    // Function to handle login
    async function handleLogin(e) {
        e.preventDefault();

        // Check if already loading
        if (loginButton.classList.contains('loading')) {
            return;
        }

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('input[name="remember"]').checked;

        // Simple validation
        if (!username || !password) {
            showError('Vui lòng điền đầy đủ thông tin đăng nhập');
            return;
        }

        // Show loading state
        loginButton.classList.add('loading');
        loginButton.disabled = true;

        try {
            // Giả lập API call - thay thế bằng API thật sau này
            if (username === 'NMT' && password === '12345') {
                // Lưu thông tin đăng nhập
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                
                // Xử lý remember me
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Redirect to dashboard with success message
                loginButton.innerHTML = 'Đăng nhập thành công';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            } else {
                throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (error) {
            showError(error.message || 'Đã xảy ra lỗi khi đăng nhập');
            loginButton.innerHTML = 'Đăng nhập';
        } finally {
            // Reset loading state after delay
            setTimeout(() => {
                loginButton.classList.remove('loading');
                loginButton.disabled = false;
            }, 500);
        }
    }

    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }

    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const usernameInput = document.getElementById('username');
        const rememberCheckbox = document.querySelector('input[name="remember"]');
        
        usernameInput.value = rememberedUser;
        rememberCheckbox.checked = true;
    }

    // Event listener for form submission
    loginForm.addEventListener('submit', handleLogin);
});