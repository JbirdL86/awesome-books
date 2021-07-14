/* eslint-disable no-undef */
/* eslint no-use-before-define:["error",{"functions":false}] */
/* eslint-disable max-classes-per-file */
// eslint-disable-next-line no-unused-vars

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  static init() {
    const myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
    // displayBooks();
    return myBooks;
  }

  static id = 0;

  static addBook(book) {
    const myBooks = Library.init();
    // book.title = document.getElementById('title').value;
    // book.author = document.getElementById('author').value;
    this.id += 1;
    book.id = this.id + 1;
    myBooks.push(book);
    // displayBooks();
    // saveBooks();
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
  }

  static removeBook(title) {
    myBooks = myBooks.filter((book) => book.title !== title);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    displayBooks();
  }
}

function displayBooks() {
  const booklist = document.getElementById('booklist');
  const myBooks = Library.init();
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

const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const book = new Book(document.getElementById('title').value, document.getElementById('author').value);
  Library.addBook(book);
  // displayBooks();
});

/*  window.onload = function () {
  myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  displayBooks();
};  */
/*  function saveBooks() {
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
}  */
