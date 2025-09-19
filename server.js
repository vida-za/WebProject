const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const recyclingPointRoutes = require('./server/routes/recyclingPointsRoutes');
const wasteTypesRoutes = require('./server/routes/wasteTypesRoutes');
const achievementsRoutes = require('./server/routes/achievementsRoutes');
const reportRoutes = require('./server/routes/reportRoutes');
const authRoutes = require('./server/routes/authRoutes');
const chatRoutes = require('./server/routes/chatRoutes');

app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));

app.use('/api', recyclingPointRoutes);
app.use('/api', wasteTypesRoutes);
app.use('/api', achievementsRoutes);
app.use('/api', reportRoutes);
app.use('/auth', authRoutes);
app.use('/api', chatRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});