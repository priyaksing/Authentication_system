const express = require('express');
const db = require('./routes/db-config');
const cookie = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/js', express.static(__dirname + '/public/js'));
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(cookie());
app.use(express.json());

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
})

app.use('/', require('./routes/pages'));
app.use('/api', require('./controllers/auth'))

app.listen(PORT);