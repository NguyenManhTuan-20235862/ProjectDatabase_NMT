const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

// Get all staff members
router.get('/', async (req, res) => {
    try {
        const allStaff = await pool.query(
            'SELECT userid, username, fullname, email, phone, role, status, createdat, lastlogin FROM users'
        );
        res.json(allStaff.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get staff statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await pool.query(`
            SELECT 
                COUNT(*) as total_staff,
                COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_staff,
                COUNT(CASE WHEN role = 'Admin' THEN 1 END) as admin_count,
                COUNT(CASE WHEN createdat >= NOW() - INTERVAL '30 days' THEN 1 END) as new_staff
            FROM users
        `);
        res.json(stats.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create new staff member
router.post('/', async (req, res) => {
    try {
        const {
            username,
            password,
            fullName,
            email,
            phone,
            role,
            status
        } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate new UserID
        const lastUser = await pool.query('SELECT userid FROM users ORDER BY userid DESC LIMIT 1');
        const newUserId = lastUser.rows.length > 0 
            ? 'U' + String(Number(lastUser.rows[0].userid.substring(1)) + 1).padStart(3, '0')
            : 'U001';

        const newStaff = await pool.query(
            `INSERT INTO users (
                userid, username, password, fullname, 
                email, phone, role, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING userid, username, fullname, email, phone, role, status, createdat`,
            [newUserId, username, hashedPassword, fullName, email, phone, role, status]
        );

        res.json(newStaff.rows[0]);
    } catch (err) {
        console.error(err.message);
        if (err.constraint === 'users_username_key') {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }
        res.status(500).send('Server Error');
    }
});

// Update staff member
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fullName,
            email,
            phone,
            role,
            status,
            password
        } = req.body;

        let updateQuery = `
            UPDATE users 
            SET fullname = $1, 
                email = $2, 
                phone = $3, 
                role = $4, 
                status = $5
        `;
        let queryParams = [fullName, email, phone, role, status];

        // If password is provided, update it too
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateQuery += ', password = $6';
            queryParams.push(hashedPassword);
        }

        updateQuery += ' WHERE userid = $' + (queryParams.length + 1) + ' RETURNING userid, username, fullname, email, phone, role, status';
        queryParams.push(id);

        const updateStaff = await pool.query(updateQuery, queryParams);

        if (updateStaff.rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }

        res.json(updateStaff.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete staff member
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE userid = $1', [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }

        // Delete user
        await pool.query('DELETE FROM users WHERE userid = $1', [id]);
        
        res.json({ message: 'Đã xóa nhân viên thành công' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;