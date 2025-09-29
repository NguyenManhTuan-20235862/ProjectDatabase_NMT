const router = require('express').Router();
const pool = require('../database');

// Get all guests
router.get('/', async (req, res) => {
    try {
        const allGuests = await pool.query('SELECT * FROM guests');
        res.json(allGuests.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create new guest
router.post('/', async (req, res) => {
    try {
        const {
            fullName,
            idNumber,
            email,
            phone,
            address,
            guestType
        } = req.body;

        const newGuest = await pool.query(
            `INSERT INTO guests (
                fullname, idnumber, email, phone, 
                address, guesttype
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [fullName, idNumber, email, phone, address, guestType]
        );

        res.json(newGuest.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update guest info
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, address } = req.body;
        const updateGuest = await pool.query(
            `UPDATE guests 
             SET fullname = $1, email = $2, phone = $3, address = $4 
             WHERE guestid = $5 
             RETURNING *`,
            [fullName, email, phone, address, id]
        );
        res.json(updateGuest.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;