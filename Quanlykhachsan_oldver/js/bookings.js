// Booking Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('bookingModal');
    const newBookingBtn = document.querySelector('.new-booking-btn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.modal .cancel-btn');

    // Calendar functionality
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const monthYearDisplay = document.querySelector('.calendar-header h2');

    let currentDate = new Date();

    // Open modal
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.querySelector('.booking-form').reset();
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

    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });
    }

    // Initialize calendar
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month-year display
        const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                       'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        monthYearDisplay.textContent = `${months[month]}, ${year}`;

        // Clear existing calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();

        // Add empty cells for days before first of month
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Add current day indicator
            if (day === new Date().getDate() && 
                month === new Date().getMonth() && 
                year === new Date().getFullYear()) {
                dayElement.classList.add('current-day');
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    // Room type change handler
    const roomTypeSelect = document.querySelector('select[name="roomType"]');
    const roomNumberSelect = document.querySelector('select[name="roomNumber"]');

    if (roomTypeSelect && roomNumberSelect) {
        roomTypeSelect.addEventListener('change', function() {
            updateAvailableRooms(this.value);
        });
    }

    // Update available rooms based on room type
    function updateAvailableRooms(roomType) {
        // Clear existing options
        roomNumberSelect.innerHTML = '<option value="">Chọn số phòng</option>';

        // Add room numbers based on type (this would normally come from a database)
        let rooms;
        switch(roomType) {
            case 'single':
                rooms = ['101', '102', '103', '104'];
                break;
            case 'double':
                rooms = ['201', '202', '203', '204'];
                break;
            case 'suite':
                rooms = ['301', '302'];
                break;
            case 'luxury':
                rooms = ['401'];
                break;
            default:
                rooms = [];
        }

        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = `Phòng ${room}`;
            roomNumberSelect.appendChild(option);
        });
    }

    // Form submission handler
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Form submitted');
            // Here you would typically send the data to a server
            modal.style.display = 'none';
        });
    }

    // Filter functionality
    const statusFilter = document.querySelector('.status-filter');
    const dateFilter = document.querySelector('.date-filter');

    if (statusFilter) {
        statusFilter.addEventListener('change', filterBookings);
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', filterBookings);
    }

    function filterBookings() {
        // Add your filtering logic here
        console.log('Filtering bookings');
    }

    // Initialize calendar on page load
    updateCalendar();
});
