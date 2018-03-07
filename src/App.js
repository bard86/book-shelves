import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookShelves from './BookShelves';

class BooksApp extends Component {
    // we have two properties in state, books for the initial api call, and searchResults for filtered results
    state = {
        books: []
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
                    searchBooks={this.searchBooks} 
                    updateBook={this.updateBook}
                    books={books}
                />
            )}/>
        </div>
        )
    }
}

export default BooksApp
