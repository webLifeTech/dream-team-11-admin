const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const app = express();
const port = 3000;

// mongodb+srv://parasgogdani027:XzQzcGudIXgIBM77@dreamteam11.m6qmld1.mongodb.net/test
mongoose.connect('mongodb://localhost:27017/dreamteam11', {
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 6000000
}).then(() => {
    console.log('Connection to Database Successful');
}).catch((err) => {
    console.error(err);
});

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "static")))
app.use(session({ secret: 'cats' }))
// JSON Parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.get('/image/:filename', function(req, res) {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads/', filename);

  console.log("filepath >>>",filepath);
  fs.readFile(filepath, function(err, data) {
    console.log("data >>>",data);
    if (err) {
      res.status(404).send('Image not found!');
    } else {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data);
    }
  });
});

// Require routes
const usersRoutes = require('./app/routes/users.routes');
const appdetailsRoutes = require('./app/routes/appdetails.routes');
const uploadFilesRoutes = require('./app/routes/upload_files.routes');
const commonRoutes = require('./app/routes/common.routes');
const categoriesRoutes = require('./app/routes/categories.routes');
const tournamentsRoutes = require('./app/routes/tournaments.routes');
const teamsRoutes = require('./app/routes/teams.routes');
const matchsRoutes = require('./app/routes/matchs.routes');

// Use routes
app.use('/appv1/apimasterv1/users', usersRoutes);
app.use('/appv1/apimasterv1/appdetails', appdetailsRoutes);
app.use('/appv1/apimasterv1/upload_files', uploadFilesRoutes);
app.use('/appv1/apimasterv1', commonRoutes);
app.use('/appv1/apimasterv1/categories', categoriesRoutes);
app.use('/appv1/apimasterv1/tournaments', tournamentsRoutes);
app.use('/appv1/apimasterv1/teams', teamsRoutes);
app.use('/appv1/apimasterv1/matchs', matchsRoutes);

const server = http.createServer(app);
server.listen(port, () => {
    console.log("App Run ..........",port);
})
