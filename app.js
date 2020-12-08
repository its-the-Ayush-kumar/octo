const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const taskRoutes = require('./routes/task');

const app = express()
app.use(bodyParser.json());

// Implementing CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    return next(); // this will not block the incoming request;
});

// Implementing Routes
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/task', taskRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({
      msg : 'Server started!'
    });
});

// 404s
app.use((req, res, next) => {
    return next(404);
});

// Error control
app.use((error, req, res, next) => {
    console.log(error);

    let errorList = {
        "350": "few parameters missing",
        "360": "Email is already registered",
        "361": "Email is not registered",
        "362": "Password is wrong",
        "370": "Event does not exist",
    }

    if(!isNaN(error)) return res.status(error).json({ message: errorList[error]});
    else return res.status(500).json({
        error: error
    });
});

module.exports = app;