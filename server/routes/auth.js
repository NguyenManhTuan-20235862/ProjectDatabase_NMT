const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập không tồn tại'
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu không chính xác'
            });
        }

        // Update last login time
        await pool.query(
            'UPDATE users SET lastlogin = NOW() WHERE userid = $1',
            [user.rows[0].userid]
        );

        // Return user info without password
        const { password: _, ...userInfo } = user.rows[0];
        res.json({
            success: true,
            user: userInfo
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

module.exports = router;