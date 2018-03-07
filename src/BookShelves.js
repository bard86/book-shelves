import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

function BookShelves(props) {
    // We have three instances of the BookShelf component all using a status prop to decide which shelf books will go on
    const { books, updateBook } = props
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>Book Shelves</h1>
            </div>
            <BookShelf
                books={books}
                category={'Currently Reading'}
                status={'currentlyReading'}
                updateBook={updateBook}
            />
            <BookShelf
                books={books}
                category={'Want To Read'}
                status={'wantToRead'}
                updateBook={updateBook}
            />
            <BookShelf
                books={books}
                category={'Read'}
                status={'read'}
                updateBook={updateBook}
            />
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default BookShelves