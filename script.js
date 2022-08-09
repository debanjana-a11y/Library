// const Book = {
//     title: "Pride and Prejudice",
//     author: "Jane Austin",
//     pages: 150,
//     read: false
// };

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() { 
        return this.title + ", " + this.author + " "+ this.pages + " " + this.read;
    };
}

const book = new Book("Pride and Prejudice", "Jane Austin", 150, false);
