import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import sortBy from 'sort-by'

class Search extends Component {
    state = {
        query: '',
    }

    updateQuery = (query) => {
        this.props.searchBooks(query)
        this.setState({ query })
    }
    
    render() {
        const { searchResults, updateBook } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.sort(sortBy('title')).map((book) => (
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
        )
    }
}

export default Search