// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const staffModal = document.getElementById('staffModal');
const addStaffBtn = document.querySelector('.add-staff-btn');
const closeBtn = document.querySelector('.close');
const staffForm = document.querySelector('.staff-form');
const staffTable = document.querySelector('.staff-table tbody');
const searchInput = document.querySelector('.search-bar input');
const roleFilter = document.querySelector('.filter-group select:nth-child(2)');
const statusFilter = document.querySelector('.filter-group select:nth-child(3)');
const sortSelect = document.querySelector('.filter-group select:last-child');

// Fetch and display staff statistics
async function loadStaffStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/staff/stats`);
        const stats = await response.json();
        
        document.querySelector('.stat-card:nth-child(1) .stat-info p').textContent = stats.total_staff;
        document.querySelector('.stat-card:nth-child(2) .stat-info p').textContent = stats.active_staff;
        document.querySelector('.stat-card:nth-child(3) .stat-info p').textContent = stats.admin_count;
        document.querySelector('.stat-card:nth-child(4) .stat-info p').textContent = stats.new_staff;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Fetch and display staff list
async function loadStaffList() {
    try {
        const response = await fetch(`${API_BASE_URL}/staff`);
        const staffList = await response.json();
        
                staffTable.innerHTML = staffList.map(staff => `
                    <tr>
                        <td>
                            <div class="staff-info">
                                <img src="images/user-avatar.png" alt="Staff">
                                <div>
                                    <span class="staff-name">${staff.fullname}</span>
                                    <span class="staff-id">${staff.userid}</span>
                                </div>
                            </div>
                        </td>
                        <td><span class="staff-role role-${staff.role.toLowerCase()}">${staff.role}</span></td>
                        <td>${staff.email}</td>
                        <td>${staff.phone}</td>
                        <td>${new Date(staff.createdat).toLocaleDateString('vi-VN')}</td>
                        <td><span class="status-badge status-${staff.status.toLowerCase()}">${staff.status}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="edit-btn" title="Chỉnh sửa" onclick="editStaff('${staff.userid}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="delete-btn" title="Xóa" onclick="deleteStaff('${staff.userid}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error loading staff list:', error);
            }
        }

// Show Modal
function showModal() {
    staffModal.style.display = 'block';
}

// Hide Modal
function hideModal() {
    staffModal.style.display = 'none';
    staffForm.reset();
}

// Event Listeners
addStaffBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === staffModal) {
        hideModal();
    }
});

// Handle Form Submit
staffForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Get form data
        const formData = new FormData(staffForm);
        const staffData = {
            fullName: formData.get('fullName'),
            username: formData.get('username'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            status: formData.get('status'),
            password: formData.get('password')
        };

        // Validate passwords match
        if (formData.get('password') !== formData.get('confirmPassword')) {
            alert('Mật khẩu không khớp!');
            return;
        }

        const method = staffForm.dataset.editing ? 'PUT' : 'POST';
        const url = staffForm.dataset.editing 
            ? `${API_BASE_URL}/staff/${staffForm.dataset.editing}`
            : `${API_BASE_URL}/staff`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staffData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Có lỗi xảy ra');
        }

        // Refresh staff list and stats
        await Promise.all([loadStaffList(), loadStaffStats()]);
        
        // Close modal after successful submission
        hideModal();
    } catch (error) {
        alert(error.message);
    }
});

// Filter staff list
function filterStaff() {
    const searchTerm = searchInput.value.toLowerCase();
    const roleValue = roleFilter.value;
    const statusValue = statusFilter.value;
    
    const rows = staffTable.querySelectorAll('tr');
    
    rows.forEach(row => {
        const name = row.querySelector('.staff-name').textContent.toLowerCase();
        const role = row.querySelector('.staff-role').textContent.toLowerCase();
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        
        const matchesSearch = name.includes(searchTerm);
        const matchesRole = !roleValue || role.includes(roleValue.toLowerCase());
        const matchesStatus = !statusValue || status.includes(statusValue.toLowerCase());
        
        row.style.display = matchesSearch && matchesRole && matchesStatus ? '' : 'none';
    });
}

// Sort staff list
function sortStaff(criteria) {
    const rows = Array.from(staffTable.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        let valueA, valueB;
        
        switch(criteria) {
            case 'name':
                valueA = a.querySelector('.staff-name').textContent;
                valueB = b.querySelector('.staff-name').textContent;
                break;
            case 'role':
                valueA = a.querySelector('.staff-role').textContent;
                valueB = b.querySelector('.staff-role').textContent;
                break;
            case 'status':
                valueA = a.querySelector('.status-badge').textContent;
                valueB = b.querySelector('.status-badge').textContent;
                break;
            case 'date':
                valueA = new Date(a.querySelector('td:nth-child(5)').textContent);
                valueB = new Date(b.querySelector('td:nth-child(5)').textContent);
                break;
            default:
                return 0;
        }
        
        return valueA > valueB ? 1 : -1;
    });
    
    rows.forEach(row => staffTable.appendChild(row));
}

// Event listeners for filtering and sorting
searchInput.addEventListener('input', filterStaff);
roleFilter.addEventListener('change', filterStaff);
statusFilter.addEventListener('change', filterStaff);
sortSelect.addEventListener('change', (e) => sortStaff(e.target.value));

// Handle Edit Staff
async function editStaff(staffId) {
    try {
        const response = await fetch(`${API_BASE_URL}/staff/${staffId}`);
        const staff = await response.json();
        
        // Populate form with staff data
        const form = document.querySelector('.staff-form');
        form.dataset.editing = staffId;
        
        form.fullName.value = staff.fullname;
        form.username.value = staff.username;
        form.email.value = staff.email;
        form.phone.value = staff.phone;
        form.role.value = staff.role;
        form.status.value = staff.status;
        
        // Clear password fields
        form.password.value = '';
        form.confirmPassword.value = '';
        
        showModal();
    } catch (error) {
        alert('Không thể tải thông tin nhân viên');
        console.error(error);
    }
}

// Handle Delete Staff
async function deleteStaff(staffId) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/staff/${staffId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Có lỗi xảy ra khi xóa nhân viên');
            }
            
            // Refresh staff list and stats
            await Promise.all([loadStaffList(), loadStaffStats()]);
        } catch (error) {
            alert(error.message);
        }
    }
}

// Add click handlers to action buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn')) {
        const row = e.target.closest('tr');
        const staffId = row.querySelector('.staff-id').textContent;
        editStaff(staffId);
    }
    
    if (e.target.closest('.delete-btn')) {
        const row = e.target.closest('tr');
        const staffId = row.querySelector('.staff-id').textContent;
        deleteStaff(staffId);
    }
});

// Reset form when showing modal for new staff
function resetForm() {
    staffForm.reset();
    delete staffForm.dataset.editing;
}

// Show Modal with form reset for new staff
function showModalForNew() {
    resetForm();
    showModal();
}

// Update event listener for add staff button
addStaffBtn.addEventListener('click', showModalForNew);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    Promise.all([loadStaffList(), loadStaffStats()]).catch(error => {
        console.error('Error loading initial data:', error);
        alert('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    });
});