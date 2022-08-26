/*Each element is Book */
let myLibrary = [
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austin',
        pages: 273,
        genre: 'Classic',
        read: true
    },
    {
        title: 'Little Women',
        author: 'Louisa May Alcott',
        pages: 200,
        genre: 'Classic',
        read: false
    },
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        pages: 310,
        genre: 'Fiction',
        read: true
    }
];

let genreList = {
    Classic: 0,
    Fiction: 1
};

class Book {
    constructor (title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
}
}

Book.prototype.info = function() { 
    return `${this.title}, ${this.author}, ${this.pages}, ${(this.read == true)? "Read": "Not read"}`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(book);
    updateTable(book);
}

const tableBody = document.getElementsByClassName("book_table_content");

function clearTable(title, genre) {
    for(let i = 0; i < tableBody[genreList[genre]].rows.length; i++) {
        let tr = tableBody[genreList[genre]].rows[i];
        console.log(tr.firstElementChild);
        if (tr.firstElementChild.innerText === title) {
            tableBody[genreList[genre]].deleteRow(i);
        }
    }
}

function removeBookFromLibrary(title) {
    for(let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            clearTable(myLibrary[i].title, myLibrary[i].genre);
            myLibrary.splice(i, 1);
            localStorage.setItem('books', JSON.stringify(myLibrary));
            return;
        }
    }
    alert("No book found with title "+ title);
}

function changeReadStatus(title) {
    for(let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            return myLibrary[i].read = !myLibrary[i].read;
        }
    }
    return -1;
}

toggleReadStatus = function(event, title) {
    if (title.length === 0) {
        alert("Book title can not be empty");
        return;
    } 
    const read_status = changeReadStatus(title);
    if (read_status === true) {
        event.currentTarget.innerText = "Read";
    } else if (read_status === false) {
        event.currentTarget.innerText = "Unread";
    } else {
        alert("Invalid book index to change status");
    }
};

/* Display in HTML */
function updateTable(book) {
    const read_status  = (book.read === true) ? "Read" : "Unread";
    const htmlBook = `<tr>
                        <td id="title">${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>
                            <button class="book_read_status" onclick="toggleReadStatus(event, '${book.title}')">${read_status}</button>
                        </td>
                        <td>
                            <button class="book_delete" onclick="removeBookFromLibrary('${book.title}')"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>`;
    tableBody[genreList[book.genre]].insertAdjacentHTML("beforeend", htmlBook);
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function chageTab(event, book_category) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for(let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let link of tablinks) {
        link.className = link.className.replace(" active", "");
    }

    document.getElementById(book_category).style.display = "block";
    if (event) event.currentTarget.className += " active";
    else tablinks[0].className += " active";
}

function render() {
    // Local storage
    if (localStorage.getItem('books') !== null) {
        myLibrary = JSON.parse(localStorage.getItem('books'));
    }

    for(let i = 0; i < myLibrary.length; i++) {
        updateTable(myLibrary[i]);
    }
    /* Make first tab as default */
    tablinks = document.getElementsByClassName("tablinks");
    tablinks[0].onclick(null, 'Classic');
}

function openNewForm() {
    const form = document.getElementsByClassName("new_book_form");
    form[0].style.display = "block";
}

function closeForm() {
    resetErrorLog();

    const form_div = document.getElementsByClassName("new_book_form");
    form_div[0].style.display = "none";
    
    const form = document.getElementById("form_book");
    form.reset();
}

function validateForm(title, author) {
    const errorT = title.nextElementSibling;
    if (title.validity.valueMissing) {
        errorT.textContent = 'Title can\'t be empty.';
        return false;
    } else if (title.validity.tooShort) {
        errorT.textContent = `Title should be at least ${title.minLength} characters; you entered ${title.value.length}.`;
        return false;
    }
    const errorA = author.nextElementSibling;
    if (author.validity.valueMissing) {
        errorA.textContent = 'Author Name can\'t be empty.';
        return false;
    } else if (author.validity.tooShort) {
        errorA.textContent = `Title should be at least ${author.minLength} characters; you entered ${author.value.length}.`;
        return false;
    }
    return true;
}

function resetErrorLog() {
    const error_texts = document.getElementsByClassName('error_text');

    [...error_texts].forEach(e => {
        console.log(e);
        e.textContent = '';
        e.classList.remove('active');
    });
}

function submitBook() {
    const title = document.getElementById("new_book_name");
    const author = document.getElementById("new_book_author");
    const pages = parseInt(document.getElementById("new_book_pages"));
    const genre = document.getElementById("new_book_genre");
    const status = document.getElementById("new_book_status");

    if (false === validateForm(title, author)) {
        return;
    }
    const book = new Book(title.value, author.value, pages.value, genre.value, status.value === "Yes"? true : false);
    addBookToLibrary(book);
    closeForm();
}

render();



