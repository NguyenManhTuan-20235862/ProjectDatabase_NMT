const router = require('express').Router();
const pool = require('../database');

// Get all services
router.get('/', async (req, res) => {
    try {
        const allServices = await pool.query(
            `SELECT s.*, sc.categoryname 
             FROM services s 
             JOIN servicecategories sc ON s.categoryid = sc.categoryid`
        );
        res.json(allServices.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add service to booking
router.post('/booking', async (req, res) => {
    try {
        const {
            bookingId,
            serviceId,
            quantity,
            price
        } = req.body;

        const totalAmount = quantity * price;

        const newBookingService = await pool.query(
            `INSERT INTO bookingservices (
                bookingid, serviceid, quantity, 
                price, totalamount
            ) VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [bookingId, serviceId, quantity, price, totalAmount]
        );

        res.json(newBookingService.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get services by category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const services = await pool.query(
            'SELECT * FROM services WHERE categoryid = $1',
            [categoryId]
        );
        res.json(services.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;