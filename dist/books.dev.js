"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  SaveBooks();
}

function removeBook(id) {
  myBooklist.removeBook(id);
  displayBooks();
  SaveBooks();
}

function displayBooks() {
  var booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  myBooklist.booklist.map(function (book) {
    var divBook = document.createElement('div');
    var p = document.createElement('p'); // Title

    p.innerHTML = book.title;
    var p2 = document.createElement('p'); // Author

    p2.innerHTML = book.author;
    var btn = document.createElement('BUTTON');
    btn.innerHTML = 'Remove';
    btn.addEventListener('click', function () {
      removeBook(book.id);
    });
    divBook.appendChild(p);
    divBook.appendChild(p2);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    return book;
  });
} // eslint-disable-next-line func-names


window.onload = function () {
  displayBooks();
};

function SaveBooks() {
  myBooklist.saveLibrary();
}

var addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addBook);