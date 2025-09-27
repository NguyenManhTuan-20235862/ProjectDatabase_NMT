// Reports Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();

    // Period selector change handlers
    const periodSelectors = document.querySelectorAll('.period-selector');
    periodSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            updateChart(this.closest('.stat-card').querySelector('canvas').id, this.value);
        });
    });

    // Chart type selector handler
    const chartTypeSelector = document.querySelector('.chart-type-selector');
    if (chartTypeSelector) {
        chartTypeSelector.addEventListener('change', function() {
            updateRevenueAnalysisChart(this.value);
        });
    }

    // Analytics type selector handler
    const analyticsTypeSelector = document.querySelector('.analytics-type');
    if (analyticsTypeSelector) {
        analyticsTypeSelector.addEventListener('change', function() {
            updateGuestAnalytics(this.value);
        });
    }

    // Export button handlers
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            exportReport(this.closest('.report-card').querySelector('canvas').id);
        });
    });

    // Date range picker
    const dateRangeBtn = document.querySelector('.date-range-btn');
    if (dateRangeBtn) {
        dateRangeBtn.addEventListener('click', function() {
            // Implement date range picker functionality
            console.log('Opening date range picker');
        });
    }
});

function initializeCharts() {
    // Quick Stats Charts
    initializeQuickStatChart('revenueChart', 'line', '#3498db');
    initializeQuickStatChart('occupancyChart', 'line', '#2ecc71');
    initializeQuickStatChart('bookingsChart', 'line', '#f1c40f');
    initializeQuickStatChart('servicesChart', 'line', '#9b59b6');

    // Revenue Analysis Chart
    initializeRevenueAnalysisChart();

    // Room Type Performance Chart
    initializeRoomTypeChart();

    // Service Revenue Chart
    initializeServiceRevenueChart();

    // Guest Analytics Charts
    initializeGuestAnalyticsCharts();
}

function initializeQuickStatChart(canvasId, type, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, color + '20');
    gradient.addColorStop(1, color + '05');

    new Chart(ctx, {
        type: type,
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: color,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            maintainAspectRatio: false
        }
    });
}

function initializeRevenueAnalysisChart() {
    const ctx = document.getElementById('revenueAnalysisChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Doanh thu phòng',
                data: [120, 190, 300, 250, 280, 320, 350, 280, 300, 270, 310, 330],
                borderColor: '#3498db',
                backgroundColor: '#3498db20'
            },
            {
                label: 'Doanh thu dịch vụ',
                data: [45, 60, 75, 70, 85, 90, 100, 95, 80, 85, 90, 95],
                borderColor: '#2ecc71',
                backgroundColor: '#2ecc7120'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'tr';
                        }
                    }
                }
            }
        }
    });
}

function initializeRoomTypeChart() {
    const ctx = document.getElementById('roomTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Phòng đơn', 'Phòng đôi', 'Phòng Suite', 'Phòng Luxury'],
            datasets: [{
                data: [30, 40, 20, 10],
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#9b59b6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeServiceRevenueChart() {
    const ctx = document.getElementById('serviceRevenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ăn uống', 'Spa', 'Giặt ủi', 'Đưa đón', 'Giải trí'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeGuestAnalyticsCharts() {
    // Age Chart
    const ageCtx = document.getElementById('ageChart').getContext('2d');
    new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
            datasets: [{
                data: [15, 35, 25, 15, 10],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Source Chart
    const sourceCtx = document.getElementById('sourceChart').getContext('2d');
    new Chart(sourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Website', 'OTA', 'Đối tác', 'Trực tiếp'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#9b59b6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Purpose Chart
    const purposeCtx = document.getElementById('purposeChart').getContext('2d');
    new Chart(purposeCtx, {
        type: 'pie',
        data: {
            labels: ['Du lịch', 'Công tác', 'Hội nghị', 'Khác'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#95a5a6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateChart(chartId, period) {
    // Update chart data based on selected period
    console.log(`Updating ${chartId} for period: ${period}`);
}

function updateRevenueAnalysisChart(chartType) {
    // Update revenue analysis chart type
    console.log(`Changing chart type to: ${chartType}`);
}

function updateGuestAnalytics(type) {
    // Update guest analytics based on selected type
    console.log(`Updating guest analytics for: ${type}`);
}

function exportReport(reportId) {
    // Export report functionality
    console.log(`Exporting report: ${reportId}`);
}
