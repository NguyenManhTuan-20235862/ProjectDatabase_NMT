const router = require('express').Router();
const pool = require('../database');

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const allBookings = await pool.query(
            `SELECT b.*, g.fullname, r.roomnumber 
             FROM bookings b 
             JOIN guests g ON b.guestid = g.guestid 
             JOIN rooms r ON b.roomid = r.roomid`
        );
        res.json(allBookings.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create new booking
router.post('/', async (req, res) => {
    try {
        const {
            guestId,
            roomId,
            checkInDate,
            checkOutDate,
            adults,
            children,
            totalAmount
        } = req.body;

        const newBooking = await pool.query(
            `INSERT INTO bookings (
                guestid, roomid, checkindate, checkoutdate, 
                adults, children, totalamount, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending') 
            RETURNING *`,
            [guestId, roomId, checkInDate, checkOutDate, adults, children, totalAmount]
        );

        res.json(newBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update booking status
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateBooking = await pool.query(
            'UPDATE bookings SET status = $1 WHERE bookingid = $2 RETURNING *',
            [status, id]
        );
        res.json(updateBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;