const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');
const clubRoutes = require('./routes/clubRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const paymentRoutes = require("./routes/paymentRoutes")
const eventRoutes = require('./routes/eventRoutes');
const accountRoutes = require('./routes/accountRoutes')
const tierRoutes = require('./routes/tierRoutes')
const dotenv = require('dotenv');

dotenv.config()

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/tier', tierRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/announcements', announcementRoutes)
app.use('/api/payments', paymentRoutes);
app.use('/api/account', accountRoutes)

const PORT = process.env.PORT || 5001;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));