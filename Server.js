const express = require('express');
const passport = require('passport');
const cors = require('cors');
const config = require('./Src/Config/config.js');
const db = require('./Src/Models/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload =multer()

const app = express();



// CORS configuration
app.options('*', cors());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Middleware for parsing application/json
app.use(bodyParser.json({ limit: '10mb' }));
// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use(upload.single('recordFile'))

// Static files
app.use('/', express.static(path.join(__dirname, 'Src/public/records')));

// Passport initialization
app.use(passport.initialize());

// Passport strategies
require('./Src/Config/passport.js').principleAuth(passport);
require('./Src/Config/passport.js').adminAuth(passport);
require('./Src/Config/passport.js').hodAuth(passport);
require('./Src/Config/passport.js').monthlyExecutorAuth(passport);

// Database connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database', err);
  });

// Routes
require('./Src/Routers/general/department.js')(app);
require('./Src/Routers/general/usertype.js')(app);
require('./Src/Routers/general/user.js')(app);

require('./Src/Routers/common/eventtype.js')(app);
require('./Src/Routers/common/login.js')(app);
require('./Src/Routers/common/inputtype.js')(app);

require('./Src/Routers/principal/usertype.js')(app);
require('./Src/Routers/principal/department.js')(app);
require('./Src/Routers/principal/user.js')(app);
require('./Src/Routers/principal/criteriatype.js')(app);
require('./Src/Routers/principal/inputtype.js')(app);
require('./Src/Routers/principal/inputfield.js')(app);
require('./Src/Routers/principal/eventtype.js')(app);
require('./Src/Routers/principal/event.js')(app);
require('./Src/Routers/principal/eventData.js')(app);
require("./Src/Routers/principal/updateprofile.js")(app)

require('./Src/Routers/admin/user.js')(app);
require('./Src/Routers/admin/usertype.js')(app);
require('./Src/Routers/admin/department.js')(app);
require('./Src/Routers/admin/criteriatype.js')(app);
require('./Src/Routers/admin/inputtype.js')(app);
require('./Src/Routers/admin/inputfield.js')(app);
require('./Src/Routers/admin/eventtype.js')(app);

require('./Src/Routers/hod/user.js')(app);
require('./Src/Routers/hod/usertype.js')(app);
require('./Src/Routers/hod/event.js')(app);

require('./Src/Routers/montlyexecutor/user.js')(app);
require('./Src/Routers/montlyexecutor/usertype.js')(app);

// Server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome To the Kumaraguru Data On Time');
});
