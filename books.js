/* eslint no-use-before-define:["error",{"functions":false}] */
class Booklist {
  constructor() {
    this.booklist = JSON.parse(localStorage.getItem('booklist') || '[]');
    this.id = (Math.random() + 1).toString(27).substring(4);
  }

  addBook(book) {
    this.id += 1;
    book.id = this.id;
    this.booklist.push(book);
  }

  removeBook(id) {
    this.booklist = this.booklist.filter((book) => book.id !== id);
  }

  saveLibrary() {
    localStorage.setItem('booklist', JSON.stringify(this.booklist));
  }
}

const myBooklist = new Booklist();

// eslint-disable-next-line no-unused-vars
function addBook() {
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  myBooklist.addBook(book);
  displayBooks();
  SaveBooks();
}

function removeBook(id) {
  myBooklist.removeBook(id);
  displayBooks();
  SaveBooks();
}

function displayBooks() {
  const booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  myBooklist.booklist.map((book) => {
    const divBook = document.createElement('div');
    const p = document.createElement('p'); // Title
    p.innerHTML = book.title;
    const p2 = document.createElement('p'); // Author
    p2.innerHTML = book.author;
    const btn = document.createElement('BUTTON');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', () => {
      removeBook(book.id);
    });
    divBook.appendChild(p);
    divBook.appendChild(p2);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    return book;
  });
}

// eslint-disable-next-line func-names
window.onload = function () {
  displayBooks();
};

function SaveBooks() {
  myBooklist.saveLibrary();
}

const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', addBook);
