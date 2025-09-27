// settings.js
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý tải ảnh
    const avatarUploadBtn = document.querySelector('.upload-btn');
    const currentAvatar = document.getElementById('current-avatar');

    avatarUploadBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentAvatar.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });

    // Xử lý đổi mật khẩu
    const passwordForm = {
        current: document.getElementById('current-password'),
        new: document.getElementById('new-password'),
        confirm: document.getElementById('confirm-password')
    };

    function validatePassword() {
        if (passwordForm.new.value !== passwordForm.confirm.value) {
            alert('Mật khẩu xác nhận không khớp!');
            return false;
        }
        return true;
    }

    // Lưu cài đặt
    window.saveSettings = function() {
        // Kiểm tra mật khẩu nếu có thay đổi
        if (passwordForm.new.value || passwordForm.confirm.value) {
            if (!validatePassword()) {
                return;
            }
        }

        // Lưu các cài đặt
        const settings = {
            profile: {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            },
            security: {
                twoFactor: document.getElementById('two-factor').checked
            },
            system: {
                language: document.getElementById('language').value,
                timezone: document.getElementById('timezone').value,
                currency: document.getElementById('currency').value
            }
        };

        // Giả lập lưu cài đặt thành công
        setTimeout(() => {
            alert('Đã lưu thay đổi thành công!');
        }, 500);
    };
});
