const router = require('express').Router();
const pool = require('../database');

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const allRooms = await pool.query(
            'SELECT r.*, rt.typename, rt.baseprice FROM rooms r JOIN roomtypes rt ON r.typeid = rt.typeid'
        );
        res.json(allRooms.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific room
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const room = await pool.query('SELECT * FROM rooms WHERE roomid = $1', [id]);
        res.json(room.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update room status
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateRoom = await pool.query(
            'UPDATE rooms SET status = $1 WHERE roomid = $2 RETURNING *',
            [status, id]
        );
        res.json(updateRoom.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;