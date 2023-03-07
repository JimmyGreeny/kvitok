// Load Book model
import Book from '../models/Book.js'


// @route GET api/books/test
// @description tests books route
// @access Public
const test = (req, res) => {
    return res.send('book route testing!');
}


// @route GET api/books
// @description Get all books
// @access Public
const list = (req, res) => {
    Book.find()
      .then((books) => res.json(books))
      .catch((err) => res.status(404).json({ nobooksfound: 'No Books found' }));
}


// @route GET api/books
// @description add/save book
// @access Public
const create = (req, res) => {
  Book.create(req.body)
    .then((book) => res.json({ msg: 'Book added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this book' }));
}


// @route GET api/books/:id
// @description Update book
// @access Public
const update = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
      .then((book) => res.json({ msg: 'Updated successfully' }))
      .catch((err) =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
}


// @route GET api/books/:id
// @description Delete book by id
// @access Public
const remove = (req, res) => {
    Book.findByIdAndRemove(req.params.id, req.body)
      .then((book) => res.json({ mgs: 'Book entry deleted successfully' }))
      .catch((err) => res.status(404).json({ error: 'No such a book' }));
  }

  export default {
    test,
    list,
    create,
    update,
    remove
}