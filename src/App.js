import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookShelves from './BookShelves';

class BooksApp extends Component {
    // we have two properties in state, books for the initial api call, and searchResults for filtered results
    state = {
        books: [],
        searchResults: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books:books })
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books: books })
            })
        })
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((books) => {

            if (books) {
                if (!books.error) {
                    // if there is no error, set the searchResults state to what is set in the books array
                    this.setState({
                        searchResults: books
                    })
                } else {
                    this.setState({
                        searchResults: []
                    })
                }
            } else {
                // this handles if the search does not return anything
                this.setState({
                    searchResults: []
                })
            }
        })
    };

    render() {
        const { books } = this.state
        return (
        // we have a main route and a search route
        <div className="app">
            <Route exact path="/" render={() => (
                <BookShelves
                    books={books}
                    updateBook={this.updateBook}
                />
            )}/>

            <Route path="/search" render={() => (
                <Search
                    searchResults={this.state.searchResults}
                    searchBooks={this.searchBooks} 
                    updateBook={this.updateBook}
                />
            )}/>
        </div>
        )
    }
}

export default BooksApp
