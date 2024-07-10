const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');
const clubRoutes = require('./routes/clubRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/clubs', clubRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
s