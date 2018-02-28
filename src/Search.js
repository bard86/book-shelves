import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        query: '',
    }

    updateQuery = (query) => {
        // our argument, query will in this case be the value of the input element, which in turn will be set the state for the query property
        this.props.searchBooks(query)
        this.setState({ query })
    }
    
    render() {
        const { searchResults, updateBook } = this.props
        const { queryState } = this.state
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
                        {queryState !== '' && searchResults.sort(sortBy('title')).map((book) => (
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

Search.propTypes = {
    searchResults: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
}

export default Search