const express = require('express');
const exphbs = require('express-handlebars');

const pool = require('./db/conn');

console.log(pool);

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', (req, res) => {
  const { title } = req.body;
  const { pageqty } = req.body;

  const query = 'INSERT INTO books (??, ??) VALUES (?, ?)';
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(query, data, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
});

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';

  pool.query(query, (err, data) => {
    if (err) {
      console.log(err);
    }

    const books = data;

    console.log(data);

    res.render('books', { books });
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM books WHERE ?? = ?';
  const data = ['id', id];

  pool.query(query, data, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    console.log(data[0]);

    res.render('book', { book });
  });
});

app.get('/books/edit/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM books WHERE ?? = ?';
  const data = ['id', id];

  pool.query(query, data, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    console.log(data[0]);

    res.render('editbook', { book });
  });
});

app.post('/books/updatebook', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { pageqty } = req.body;

  const query = 'UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?';
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(query, data, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect(`/books/edit/${id}`);
  });
});

app.post('/books/remove/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM books WHERE ?? = ?';
  const data = ['id', id];

  pool.query(query, data, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

app.listen(3000);
