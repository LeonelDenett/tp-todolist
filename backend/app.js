require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Todo en ligne',
    endpoints: ['/api/todos']
  });
});

app.use('/api/todos', todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3009;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
  });
