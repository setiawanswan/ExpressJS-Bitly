let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/routes.js')
let app = express();
let cors = require('cors');
let auth = require('./routes/auth');
let redirect = require('./routes/redirect');
require('dotenv').config()
const passport = require('passport')

app.use(passport.initialize());
app.use(passport.session());
// app.use('/auth',auth);

app.use(express.static('public'))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/auth', auth)
app.use('/',routes)
app.use('/redirect',redirect)

let server = app.listen(process.env.PORT || 3000, function () {
    console.log("app running on port.", server.address().port);
});

