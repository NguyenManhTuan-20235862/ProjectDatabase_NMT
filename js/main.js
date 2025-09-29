// Add interactive functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }

    // Update admin info if logged in
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.name) {
        const adminAvatar = document.querySelector('.admin-avatar img');
        const adminName = document.querySelector('.admin-info h4');
        const adminRole = document.querySelector('.admin-info p');

        if (adminAvatar) {
            adminAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=1a73e8&color=fff`;
        }
        if (adminName) {
            adminName.textContent = userData.name;
        }
        if (adminRole) {
            adminRole.textContent = userData.role || 'System Administrator';
        }
    }

    // Highlight active navigation item
    const navItems = document.querySelectorAll('.sidebar nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Notifications dropdown functionality can be added here
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            // Add notification dropdown logic
            console.log('Notifications clicked');
        });
    }

    // Search functionality can be added here
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
});

function performSearch(query) {
    // Add search logic here
    console.log('Searching for:', query);
}

// Toggle profile dropdown menu
function toggleProfileMenu() {
    const profile = document.querySelector('.admin-profile');
    const dropdown = document.getElementById('profileDropdown');
    
    profile.classList.toggle('active');
    dropdown.classList.toggle('show');

    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!profile.contains(e.target)) {
            profile.classList.remove('active');
            dropdown.classList.remove('show');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Logout function
function logout() {
    // Clear user session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Modal handling
function initProfileModal() {
    const modal = document.getElementById('adminProfileModal');
    const closeBtn = modal.querySelector('.close');
    
    // Update profile info from local storage
    function updateProfileInfo() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        document.getElementById('modalAdminName').textContent = userData.name || 'Admin User';
        document.getElementById('modalAdminRole').textContent = userData.role || 'System Administrator';
        document.getElementById('modalAdminEmail').textContent = userData.email || 'admin@sakurahotel.com';
        document.getElementById('modalAdminPhone').textContent = userData.phone || '+84 123 456 789';
        document.getElementById('modalAdminAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'Admin')}&background=1a73e8&color=fff`;
    }

    // Show modal when clicking My Profile
    const profileLink = document.querySelector('.profile-dropdown a[href="#profile"]');
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            updateProfileInfo();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close modal when clicking X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Initialize modal when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProfileModal();
});
