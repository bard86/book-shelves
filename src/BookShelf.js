import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class BookShelf extends Component {
    render() {
        // the status prop is passed down execute filter logic matching the shelf property with the status prop
        const { books, category, status, updateBook} = this.props
        return (
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{category}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter((book) => book.shelf === status).sort(sortBy('title')).map((book) => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        updateBook={updateBook}
                                    />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
}

export default BookShelf
