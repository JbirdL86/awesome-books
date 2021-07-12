"use strict";

/* eslint-disable no-undef */

/* eslint no-use-before-define:["error",{"functions":false}] */
var myBooks = []; // eslint-disable-next-line no-unused-vars

function adBook() {
  var book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  myBooks.push(book);
  displayBooks();
  saveBooks();
}

function displayBooks() {
  var booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  myBooks.map(function (book) {
    var divBook = document.createElement('div');
    divBook.innerHTML = '';
    var p = document.createElement('p'); // Title

    p.innerHTML = book.title;
    var p2 = document.createElement('p'); // Author

    p2.innerHTML = book.author;
    var btn = document.createElement('button');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', function () {
      removeBook(book.title);
    });
    divBook.appendChild(p);
    divBook.appendChild(p2);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    return book;
  });
}

function removeBook(title) {
  myBooks = myBooks.filter(function (book) {
    return book.title !== title;
  });
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
  displayBooks();
  saveBooks();
}

window.onload = function () {
  myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  displayBooks();
};

function saveBooks() {
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
}