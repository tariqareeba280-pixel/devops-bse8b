const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.json({ 
    message: 'DevOps Project BSE-8B',
    status: 'running',
    version: '1.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log('App running on port ' + PORT);
});
