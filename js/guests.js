// Guest Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('guestModal');
    const addGuestBtn = document.querySelector('.add-guest-btn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.modal .cancel-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const historyBtns = document.querySelectorAll('.history-btn');

    // Open modal for new guest
    if (addGuestBtn) {
        addGuestBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.querySelector('.guest-form').reset();
            document.querySelector('.modal-content h2').textContent = 'Thêm khách hàng mới';
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Edit guest
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            openEditModal(row);
        });
    });

    // View guest details
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            viewGuestDetails(row);
        });
    });

    // View guest history
    historyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            viewGuestHistory(row);
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.guest-filters select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterGuests);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchGuests(this.value);
        });
    }

    // Pagination
    const pageButtons = document.querySelectorAll('.page-numbers button');
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');

    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Add pagination logic here
        });
    });

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            // Add previous page logic
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Add next page logic
        });
    }
});

function openEditModal(row) {
    const modal = document.getElementById('guestModal');
    const form = modal.querySelector('.guest-form');
    
    // Get guest data from the row
    const name = row.querySelector('.guest-name').textContent;
    const id = row.querySelector('.guest-id').textContent;
    const phone = row.querySelector('.contact-info div:first-child').textContent;
    const email = row.querySelector('.contact-info div:last-child').textContent;
    
    // Populate form
    form.querySelector('[name="name"]').value = name;
    form.querySelector('[name="phone"]').value = phone;
    form.querySelector('[name="email"]').value = email;
    
    // Update modal title
    modal.querySelector('h2').textContent = 'Chỉnh sửa thông tin khách hàng';
    
    modal.style.display = 'block';
}

function viewGuestDetails(row) {
    // Add logic to view guest details
    console.log('Viewing guest details');
}

function viewGuestHistory(row) {
    // Add logic to view guest history
    console.log('Viewing guest history');
}

function filterGuests() {
    const typeFilter = document.querySelector('select[name="guestType"]').value;
    const statusFilter = document.querySelector('select[name="status"]').value;
    const sortFilter = document.querySelector('select[name="sort"]').value;
    
    // Add filtering logic here
    console.log('Filtering guests:', { type: typeFilter, status: statusFilter, sort: sortFilter });
}

function searchGuests(query) {
    // Add search logic here
    console.log('Searching for:', query);
}
