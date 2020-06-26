const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
