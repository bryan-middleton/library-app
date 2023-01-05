let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    const newBook = new Book(prompt('enter title'), prompt('enter author'),prompt('number of pages'),prompt('read?'));
    myLibrary.push(newBook);
    console.table(myLibrary);
}

Book.prototype.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
}

