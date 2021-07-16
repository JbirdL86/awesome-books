"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-undef */

/* eslint no-use-before-define:["error",{"functions":false}] */
var Booklist =
/*#__PURE__*/
function () {
  function Booklist() {
    _classCallCheck(this, Booklist);

    this.booklist = JSON.parse(localStorage.getItem('booklist') || '[]');
    this.id = (Math.random() + 1).toString(27).substring(4);
  }

  _createClass(Booklist, [{
    key: "addBook",
    value: function addBook(book) {
      this.id += 1;
      book.id = this.id;
      this.booklist.push(book);
    }
  }, {
    key: "removeBook",
    value: function removeBook(id) {
      this.booklist = this.booklist.filter(function (book) {
        return book.id !== id;
      });
    }
  }, {
    key: "saveLibrary",
    value: function saveLibrary() {
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
    }
  }]);

  return Booklist;
}();

var myBooklist = new Booklist(); // eslint-disable-next-line no-unused-vars

function addBook() {
  var book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  myBooklist.addBook(book);
  displayBooks();
  SaveBooks(); // eslint-disable-next-line no-multi-assign

  book.title = document.getElementById('title').value = ''; // eslint-disable-next-line no-multi-assign

  book.author = document.getElementById('author').value = '';
}

function removeBook(id) {
  myBooklist.removeBook(id);
  displayBooks();
  SaveBooks();
}

function displayBooks() {
  var booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  var i = 0;
  myBooklist.booklist.map(function (book) {
    var divBook = document.createElement('div');
    divBook.classList.add('book-div');
    var divTitle = document.createElement('div');
    divTitle.classList.add('title-container');

    if (i % 2 === 0) {
      divBook.classList.add('alternate');
    } else {
      divBook.classList.remove('alternate');
    }

    var p = document.createElement('p'); // Title

    p.innerHTML = "\"".concat(book.title, "\" by ").concat(book.author, " ");
    var btn = document.createElement('BUTTON');
    btn.classList.add('remove-button');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', function () {
      removeBook(book.id);
    });
    divTitle.appendChild(p);
    divBook.appendChild(divTitle);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    i += 1;
    return book;
  });
} // eslint-disable-next-line func-names


window.onload = function () {
  displaySection('list');
  dateTime();
  displayBooks();
};

function SaveBooks() {
  myBooklist.saveLibrary();
}

var addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addBook);

function displaySection(section) {
  var listSection = document.getElementById('listSection');
  var formSection = document.getElementById('formSection');
  var contactSection = document.getElementById('contactSection');

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

    default:
      break;
  }
}

function dateTime() {
  var currentDate = document.querySelector('.nav-date'); // eslint-disable-next-line no-unused-vars

  var _luxon = luxon,
      DateTime = _luxon.DateTime;
  currentDate.innerHTML = DateTime.now().toFormat('MMM dd yyyy, t');
}