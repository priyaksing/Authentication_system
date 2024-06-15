const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password: Npassword } = req.body;

    if (!email || !Npassword) {
        return res.json({ status: "error", error: "Please fill all the fields" })
    }
    else {
        console.log(email);
        db.query('SELECT email from authentication_system WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "Email has been already registered" })
            else {
                const password = await bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO authentication_system SET ?', { email: email, password: password }, (error, results) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "User registered successfully" })
                })
            }
        })
    }
}

module.exports = register;