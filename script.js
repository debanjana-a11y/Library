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
}

function removeBookFromLibrary(index) {
    if (index > myLibrary.length - 1) {
        console.log("No such book to delete");
        return;
    }
    myLibrary.splice(index, 1);
}

function changeReadStatus(title) {
    for(let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            return myLibrary[i].read = !myLibrary[i].read;
        }
    }
    return -1;
}

toggle_status = function(event, title) {
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
    const tableBody = document.getElementsByClassName("book_table_content");
    const read_status  = (book.read === true) ? "Read" : "Unread";
    const htmlBook = `<tr>
                        <td id="title">${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>
                            <button class="book_read_status" onclick="toggle_status(event, '${book.title}')">${read_status}</button>
                        </td>
                        <td>
                            <button class="book_delete">Delete</button>
                        </td>
                    </tr>`;
    tableBody[genreList[book.genre]].insertAdjacentHTML("beforeend", htmlBook);
}

// const book1 = new Book('Pride and Prejudice', 'Jane Austin', 273, true);
// const book2 = new Book('Little Women', 'Louisa May Alcott', 200, false);
// const book3 = new Book('Great Expectations', 'Charles Dickens', 300, true);

// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);

// console.log(myLibrary.map(e => e.info()));
// removeBookFromLibrary(0);
// console.log(myLibrary.map(e => e.info()));

// changeReadStatus(0);
// console.log(myLibrary.map(e => e.info()));

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
    event.currentTarget.className += " active";
}

function render() {
    for(let i = 0; i < myLibrary.length; i++) {
        updateTable(myLibrary[i]);
    }
}

render();
console.log(myLibrary);
