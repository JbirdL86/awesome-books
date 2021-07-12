/* eslint-disable no-undef */
/* eslint no-use-before-define:["error",{"functions":false}] */
let myBooks = [];

// eslint-disable-next-line no-unused-vars
function addBook() {
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  myBooks.push(book);
  displayBooks();
  saveBooks();
}

function displayBooks() {
  const booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  myBooks.map((book) => {
    const divBook = document.createElement('div');
    divBook.innerHTML = '';
    const p = document.createElement('p'); // Title
    p.innerHTML = book.title;
    const p2 = document.createElement('p'); // Author
    p2.innerHTML = book.author;
    const btn = document.createElement('button');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', () => {
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
  myBooks = myBooks.filter((book) => book.title !== title);
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

const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', addBook);