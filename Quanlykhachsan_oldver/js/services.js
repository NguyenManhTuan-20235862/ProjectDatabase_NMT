// Service Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('serviceModal');
    const addServiceBtn = document.querySelector('.add-service-btn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.modal .cancel-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const manageBtns = document.querySelectorAll('.manage-btn');

    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Open modal for new service
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.querySelector('.service-form').reset();
            document.querySelector('.modal-content h2').textContent = 'Thêm dịch vụ mới';
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

    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter services
            filterServices(this.dataset.category);
        });
    });

    // Edit service
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            openEditModal(serviceCard);
        });
    });

    // Manage service
    manageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            openManageModal(serviceCard);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchServices(this.value);
        });
    }

    // Image upload preview
    const imageUpload = document.querySelector('.image-upload input');
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const placeholder = document.querySelector('.upload-placeholder');
                    placeholder.innerHTML = '<img src="' + e.target.result + '" style="max-width: 100%; max-height: 200px;">';
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Form submission
    const serviceForm = document.querySelector('.service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveService();
        });
    }
});

function filterServices(category) {
    const services = document.querySelectorAll('.service-card');
    services.forEach(service => {
        const serviceCategory = service.querySelector('.service-badge').classList[1];
        if (category === 'all' || serviceCategory === category) {
            service.style.display = 'block';
        } else {
            service.style.display = 'none';
        }
    });
}

function searchServices(query) {
    const services = document.querySelectorAll('.service-card');
    query = query.toLowerCase();
    
    services.forEach(service => {
        const title = service.querySelector('h3').textContent.toLowerCase();
        const description = service.querySelector('.service-description').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            service.style.display = 'block';
        } else {
            service.style.display = 'none';
        }
    });
}

function openEditModal(serviceCard) {
    const modal = document.getElementById('serviceModal');
    const form = modal.querySelector('.service-form');
    
    // Get service data from the card
    const title = serviceCard.querySelector('h3').textContent;
    const description = serviceCard.querySelector('.service-description').textContent;
    const price = serviceCard.querySelector('.service-price').textContent;
    const category = serviceCard.querySelector('.service-badge').classList[1];
    
    // Populate form
    form.querySelector('[name="serviceName"]').value = title;
    form.querySelector('[name="serviceDescription"]').value = description;
    form.querySelector('[name="servicePrice"]').value = price.replace(/[^0-9]/g, '');
    form.querySelector('[name="serviceCategory"]').value = category;
    
    // Update modal title
    modal.querySelector('h2').textContent = 'Chỉnh sửa dịch vụ';
    
    modal.style.display = 'block';
}

function openManageModal(serviceCard) {
    // Add management functionality here
    console.log('Opening management modal for:', serviceCard.querySelector('h3').textContent);
}

function saveService() {
    // Get form data
    const formData = new FormData(document.querySelector('.service-form'));
    
    // Here you would typically send this data to a server
    console.log('Saving service:', Object.fromEntries(formData));
    
    // Close modal
    document.getElementById('serviceModal').style.display = 'none';
}
