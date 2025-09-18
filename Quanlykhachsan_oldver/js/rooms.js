// Room Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('roomModal');
    const addRoomBtn = document.querySelector('.add-room-btn');
    const closeBtn = document.querySelector('.close');
    const editBtns = document.querySelectorAll('.edit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Open modal when clicking "Thêm phòng mới"
    if (addRoomBtn) {
        addRoomBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            // Clear form when adding new room
            document.querySelector('.room-form').reset();
        });
    }

    // Close modal when clicking X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking cancel button
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

    // Edit room functionality
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const roomCard = this.closest('.room-card');
            openEditModal(roomCard);
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.room-filters select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterRooms);
    });

    // Room form submission
    const roomForm = document.querySelector('.room-form');
    if (roomForm) {
        roomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveRoom();
        });
    }
});

function openEditModal(roomCard) {
    const modal = document.getElementById('roomModal');
    const form = modal.querySelector('.room-form');
    
    // Get room data from the card
    const roomNumber = roomCard.querySelector('h3').textContent.replace('Phòng ', '');
    const roomType = roomCard.querySelector('.room-info p:nth-child(1)').textContent;
    const floor = roomCard.querySelector('.room-info p:nth-child(2)').textContent;
    const price = roomCard.querySelector('.room-info p:nth-child(3)').textContent;
    
    // Populate form
    form.querySelector('[name="roomNumber"]').value = roomNumber;
    form.querySelector('[name="roomType"]').value = roomType.toLowerCase();
    form.querySelector('[name="floor"]').value = floor.replace('Tầng ', '');
    form.querySelector('[name="price"]').value = price.replace(/[^0-9]/g, '');
    
    // Check amenities
    const amenities = roomCard.querySelectorAll('.room-amenities span');
    amenities.forEach(amenity => {
        const amenityName = amenity.textContent.trim().toLowerCase();
        const checkbox = form.querySelector(`[name="${amenityName}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    modal.style.display = 'block';
}

function filterRooms() {
    const status = document.querySelector('select[name="status"]').value;
    const type = document.querySelector('select[name="type"]').value;
    const floor = document.querySelector('select[name="floor"]').value;
    
    const rooms = document.querySelectorAll('.room-card');
    
    rooms.forEach(room => {
        let show = true;
        
        // Filter by status
        if (status !== 'all') {
            const roomStatus = room.querySelector('.room-status').textContent.toLowerCase();
            show = show && roomStatus === status;
        }
        
        // Filter by type
        if (type !== 'all') {
            const roomType = room.querySelector('.room-info p:nth-child(1)').textContent.toLowerCase();
            show = show && roomType.includes(type);
        }
        
        // Filter by floor
        if (floor !== 'all') {
            const roomFloor = room.querySelector('.room-info p:nth-child(2)').textContent;
            show = show && roomFloor.includes(floor);
        }
        
        room.style.display = show ? 'block' : 'none';
    });
}

function saveRoom() {
    // Get form data
    const formData = new FormData(document.querySelector('.room-form'));
    
    // Here you would typically send this data to a server
    // For now, we'll just close the modal
    document.getElementById('roomModal').style.display = 'none';
    
    // Optionally, refresh the room list or add the new room to the grid
    // This would depend on your backend implementation
    console.log('Room saved:', Object.fromEntries(formData));
}
