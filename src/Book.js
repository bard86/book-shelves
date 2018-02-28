import React, { Component } from 'react'

class Book extends Component {
    render() {
        // updateBook will take the argument of a book prop and the shelf parameter in this case will be the value of the input element
        const { book, updateBook } = this.props
        
        // we have this to handle if there is no imageLinks property of book
        let thumbnailHandler
        if (book.imageLinks) {
            thumbnailHandler = book.imageLinks.smallThumbnail
        } else {
            thumbnailHandler = 'http://via.placeholder.com/128x193?text=No%20Book%20Cover'
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnailHandler}")` }}></div>
                    <div className="book-shelf-changer">
                    <select defaultValue={book.shelf || "none"} onChange={(event) => updateBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(' and ') : "No author credited"}</div>
            </div>
        )
    }
}

export default Book