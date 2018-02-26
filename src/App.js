import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookShelves from './BookShelves';

class BooksApp extends Component {
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
                    this.setState({
                        searchResults: books
                    })
                } else {
                    this.setState({
                        searchResults: []
                    })
                }
            } else {
                this.setState({
                    searchResults: []
                })
            }
        })
    };

    render() {
        const { books } = this.state
        return (
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
