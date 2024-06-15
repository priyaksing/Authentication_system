const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('../routes/db-config')

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: "error", error: "Please fill all the required details" })
    }
    else {
        db.query('SELECT * FROM authentication_system WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;

            if (!result.length || !await bcrypt.compare(password, result[0].password)) {
                return res.json({ status: "error", error: "Incorrect email or password" })
            }
            else {
                const token = jwt.sign({ id: result[0].username }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })

                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "User has been logged in" })
            }
        })
    }
}

module.exports = login;