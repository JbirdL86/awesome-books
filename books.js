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
    const divListElm = document.createElement('div');
    const divBtn = document.createElement('div');
    const divBook = document.createElement('div');

    divListElm.classList.add('list-group-item');
    divListElm.classList.add('list-group-item-action');
    divListElm.classList.add('d-flex');
    divListElm.classList.add('justify-content-between');

    const bookText = document.createElement('h4');
    bookText.innerHTML = `"${book.title}" by ${book.author}`;
    const btn = document.createElement('BUTTON');
    btn.innerHTML = 'Remove';
    btn.classList.add('btn');
    btn.classList.add('btn-danger');

    btn.addEventListener('click', () => {
      removeBook(book.id);
    });

    divListElm.appendChild(divBook);
    divListElm.appendChild(divBtn);

    divBook.appendChild(bookText);
    divBtn.appendChild(btn);
    booklist.appendChild(divListElm);
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
