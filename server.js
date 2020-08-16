const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  res.send({ 
    quote: getRandomElement(quotes)
  });
});

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person;
  if (person !== undefined) {
    const quotesByPerson = quotes.filter(quote => quote.person === person);
    res.send({
      quotes: quotesByPerson
    });
  } else {
    res.send({
      quotes: quotes
    });
  }
});

app.post('/api/quotes', (req, res, next) => {
  const receivedQuote = req.query;
  if (receivedQuote.quote && receivedQuote.person) {
    quotes.push(receivedQuote);
    res.status(201).send({ quote: receivedQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});