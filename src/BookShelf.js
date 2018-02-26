import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class BookShelf extends Component {
    render() {
        const { books, category, status, updateBook} = this.props
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{category}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter(book => book.shelf === status).sort(sortBy('title')).map((book) => (
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
            </div>
        )
    }
}

export default BookShelf
