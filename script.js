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

function Book (title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
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
                            <button class="book_delete" onclick="removeBookFromLibrary('${book.title}')">Delete</button>
                        </td>
                    </tr>`;
    tableBody[genreList[book.genre]].insertAdjacentHTML("beforeend", htmlBook);
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
    const form_div = document.getElementsByClassName("new_book_form");
    form_div[0].style.display = "none";
    
    const form = document.getElementById("form_book");
    form.reset();
}

function submitBook() {
    const title = document.getElementById("new_book_name").value;
    const author = document.getElementById("new_book_author").value;
    const pages = parseInt(document.getElementById("new_book_pages").value);
    const genre = document.getElementById("new_book_genre").value;
    const status = document.getElementById("new_book_status").value;

    const book = new Book(title, author, pages, genre, status === "Yes"? true : false);
    addBookToLibrary(book);
    closeForm();
}

render();



