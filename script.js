let myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() { 
        return `${this.title}, ${this.author}, ${this.pages}, ${(this.read == true)? "Read": "Not read"}`;
    };
}

Book.prototype.changeStat = function() {
    this.read = !this.read;
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

function changeReadStatus(index) {
    if (index > myLibrary.length - 1) {
        console.log("No such book to delete");
        return;
    }
    const book = myLibrary[index];
    book.changeStat();
}

const book1 = new Book('Pride and Prejudice', 'Jane Austin', 273, true);
const book2 = new Book('Little Women', 'Louisa May Alcott', 200, false);
const book3 = new Book('Great Expectations', 'Charles Dickens', 300, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

console.log(myLibrary.map(e => e.info()));
removeBookFromLibrary(0);
console.log(myLibrary.map(e => e.info()));


changeReadStatus(0);
console.log(myLibrary.map(e => e.info()));

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