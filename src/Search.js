import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {
    state = {
        query: '',
        searchedBooks: []
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((searchResults) => {

            if (searchResults) {
                // this is to make sure what is already on a shelf is has a proper default value when searched
                const getResults = searchResults.map((bookResult) => {
                    const shelfMatch = this.props.books.find((book) => book.title === bookResult.title)
                    return shelfMatch || bookResult
                })

                // if there is no error, set the searchResults state to what is returned in the getResults matching function
                if (!searchResults.error) {
                    this.setState({
                        searchedBooks: searchResults ? getResults : []
                    })
                }
            } else {
                // this handles if the search does not return anything
                this.setState({ searchedBooks: [] })
            }
        })
    };

    updateQuery = (query) => {
        // our argument, query will in this case be the value of the input element, which in turn will be set the state for the query property
        this.searchBooks(query)
        this.setState({ query })
    }

    render() {
        const { updateBook } = this.props
        const { queryState, searchedBooks } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            minLength={1}
                            debounceTimeout={1000}
                            placeholder="Search by title or author"
                            value={queryState}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queryState === '' || searchedBooks.sort(sortBy('title')).map((book) => (
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
    searchedBooks: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
}

export default Search