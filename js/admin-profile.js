// Kiểm tra xác thực
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || userRole !== 'admin') {
        window.location.href = 'login.html';
    }
}

// Hiển thị thời gian và ngày hiện tại
function updateDateTime() {
    const now = new Date();
    
    // Cập nhật thời gian
    const timeElement = document.getElementById('currentTime');
    timeElement.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Cập nhật ngày
    const dateElement = document.getElementById('currentDate');
    dateElement.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Toggle Profile Dropdown
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('active');
    
    // Click outside to close
    document.addEventListener('click', function closeDropdown(e) {
        const profile = document.querySelector('.admin-profile');
        if (!profile.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Tạo thông báo toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

// Tạo dữ liệu mẫu cho Recent Bookings
function loadRecentBookings() {
    const bookings = [
        {
            guestName: 'John Doe',
            roomNumber: '301',
            checkIn: '2025-09-23',
            checkOut: '2025-09-25',
            status: 'confirmed'
        },
        {
            guestName: 'Jane Smith',
            roomNumber: '205',
            checkIn: '2025-09-24',
            checkOut: '2025-09-26',
            status: 'pending'
        },
        // Thêm các booking khác nếu cần
    ];
    
    const bookingList = document.querySelector('.booking-list');
    if (!bookingList) return;
    
    bookingList.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.guestName}</h4>
                <p>Room ${booking.roomNumber}</p>
                <span class="booking-dates">
                    ${new Date(booking.checkIn).toLocaleDateString()} - 
                    ${new Date(booking.checkOut).toLocaleDateString()}
                </span>
            </div>
            <span class="booking-status ${booking.status}">
                ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
        </div>
    `).join('');
}

// Tạo dữ liệu mẫu cho Notifications
function loadNotifications() {
    const notifications = [
        {
            type: 'info',
            message: 'New booking request from Room 301',
            time: '5 minutes ago'
        },
        {
            type: 'warning',
            message: 'Room 205 checkout in 1 hour',
            time: '30 minutes ago'
        },
        // Thêm các thông báo khác nếu cần
    ];
    
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;
    
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.type}">
            <div class="notification-content">
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
        </div>
    `).join('');
}

// Xử lý đăng xuất
function logout() {
    showToast('Logging out...', 'success');
    setTimeout(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    }, 1000);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    loadRecentBookings();
    loadNotifications();
    
    // Hiển thị toast chào mừng
    showToast('Welcome back to the dashboard!', 'success');
});