// Add interactive functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navigation item
    const navItems = document.querySelectorAll('.sidebar nav a');
    navItems.forEach(item => {
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
