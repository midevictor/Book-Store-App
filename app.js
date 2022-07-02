//ES5 standard
//Book Constructor handles the book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui constructor handles the object methods

function UI() {
    UI.prototype.addBookToList = function(book) {
        list = document.getElementById('book-list');
        //create tr element
        var row = document.createElement('tr');
        //insert cols
        row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
        // clear the input fields
        UI.prototype.clearFields = function() {
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('isbn').value = '';
        }
        UI.prototype.showError = function(message, className) {
                //create div
                var div = document.createElement('div');
                //add class
                div.className = `alert ${className}`;
                //add text
                div.appendChild(document.createTextNode(message));
                //get parent
                const container = document.querySelector('.container');
                //get form
                const form = document.querySelector('#book-form');
                //insert alert
                container.insertBefore(div, form);
                //remove alert
                setTimeout(function() {
                    document.querySelector('.alert').remove();
                }, 3000);
            }
            //delete book
        UI.prototype.deleteBook = function(target) {
            if (target.className === 'delete') {
                target.parentElement.parentElement.remove();
            }
        }
    }
}

//Event listeners 
document.getElementById('book-form').addEventListener('submit', function(e) {


    //get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //create book object
    const book = new Book(title, author, isbn);

    //add book to UI
    const ui = new UI();


    if (title === '' || author === '' || isbn === '') {
        ui.showError('Please fill in all fields', 'error');

    } else {
        ui.addBookToList(book);

        ui.showError('Book added', 'success');
        //clear form
        ui.clearFields();
        //delete book from list

    }


    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showError('Book deleted', 'success');
});