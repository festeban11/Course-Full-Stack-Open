const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require("./models/person");

app.use(cors())

app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));

// Configurar morgan
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        console.log(result)
        response.json(result)
    })
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(result => {
        response.send(
            `<p>Phonebook has info for ${result.length} people</p>
            <p>${date}</p>`
        )
    })
})

app.get('/api/person/:id', (request, response) => {
    Person.findById(request.params.id).then(result => {
        response.json(result)
    }) 
})

app.delete('/api/person/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.json(result)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    const contact = new Person({
        name: body.name,
        number: body.number,
    });

    contact
        .save()
        .then(savedContact => res.json(savedContact))
        .catch(error => {
            console.error('Error saving contact:', error.message);
            res.status(500).json({ error: 'Failed to save the contact' });
        });
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})