/* eslint-disable no-undef */
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
  // eslint-disable-next-line no-multi-assign
  book.title = document.getElementById('title').value = '';
  // eslint-disable-next-line no-multi-assign
  book.author = document.getElementById('author').value = '';
}

function removeBook(id) {
  myBooklist.removeBook(id);
  displayBooks();
  SaveBooks();
}

function displayBooks() {
  const booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  let i = 0;
  myBooklist.booklist.map((book) => {
    const divBook = document.createElement('div');
    divBook.classList.add('book-div');
    const divTitle = document.createElement('div');
    divTitle.classList.add('title-container');
    if (i % 2 === 0) {
      divBook.classList.add('alternate');
    } else {
      divBook.classList.remove('alternate');
    }
    const p = document.createElement('p'); // Title
    p.innerHTML = `"${book.title}" by ${book.author} `;
    const btn = document.createElement('BUTTON');
    btn.classList.add('remove-button');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', () => {
      removeBook(book.id);
    });
    divTitle.appendChild(p);
    divBook.appendChild(divTitle);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    i += 1;
    return book;
  });
}

// eslint-disable-next-line func-names
window.onload = function () {
  displaySection('list');
  dateTime();
  displayBooks();
};

function SaveBooks() {
  myBooklist.saveLibrary();
}

const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', addBook);

function displaySection(section) {
  const listSection = document.getElementById('listSection');
  const formSection = document.getElementById('formSection');
  const contactSection = document.getElementById('contactSection');

  switch (section) {
    case 'list':
      listSection.classList.remove('d-none');
      formSection.classList.add('d-none');
      contactSection.classList.add('d-none');
      break;

    case 'new':
      listSection.classList.add('d-none');
      formSection.classList.remove('d-none');
      contactSection.classList.add('d-none');
      break;

    case 'contact':
      listSection.classList.add('d-none');
      formSection.classList.add('d-none');
      contactSection.classList.remove('d-none');
      break;

    default: break;
  }
}

function dateTime() {
  const currentDate = document.querySelector('.nav-date');
  // eslint-disable-next-line no-unused-vars
  const { DateTime } = luxon;
  currentDate.innerHTML = DateTime.now().toFormat('MMM dd yyyy, t');
}
