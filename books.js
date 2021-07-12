let myBooks = [];

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
    divBook.appendChild(p);
    divBook.appendChild(p2);
    divBook.appendChild(btn);
    booklist.appendChild(divBook);
    return book;
  });
}

window.onload = function() {
  myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  displayBooks();
};

function saveBooks() {
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
}