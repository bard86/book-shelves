import React, { Component } from 'react'

class Book extends Component {
    render() {
        const { book, updateBook } = this.props
        const thumbnail = book.imageLinks ? book.imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) => updateBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(' and ') : ""}</div>
            </div>
        )
    }
}

export default Book