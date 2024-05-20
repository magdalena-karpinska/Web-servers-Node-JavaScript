const express = require('express');
const app = express();

const db = [
    {
        id: 1,
        name: 'Magdalena Karpinska',
        email: 'magdalena.karpinska13@gmail.com'
    },
    {
        id: 2,
        name: 'Ignacio Monge',
        email: 'ignaciomonge@gmail.com'
    },
    {
        id: 3,
        name: 'Uttejh Reddy',
        email: 'uttejhreddy@gmail.com'
    }
];

app.use(express.json());

app.get('/api/developers/:id', (req, res) => {
    const dev = db.find(dev => dev.id == req.params.id); //'==' allows for a comparison between a string (route params) and a numbern (id)
    if(!dev) {
        res.status(404).end();
        return;
    }
    res.json(dev);
});

app.post('/api/developers/', (req, res) => {
    const newDeveloper = {
        id: db.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    db.push(newDeveloper);

    res
        .status(201)
        .setHeader('location', `api/developers/${newDeveloper.id}`)
        .json(newDeveloper);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});