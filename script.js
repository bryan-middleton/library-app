let myLibrary = [];

function Book(title, author, pages, read){
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
}

function addBookToLibrary(){
    const newBook = new Book(prompt('enter title'), prompt('enter author'),prompt('number of pages'),prompt('read?'));
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayLibrary(myLibrary);
}

function displayLibrary(library){
  //reset grid to display fresh array rather than append on old
 const cards = document.querySelectorAll(".libraryItem");
 cards.forEach((card) => {
   card.remove();  
  });
  //iterate through array and create div for each book
  for(let i=0;i<library.length;i++){
    const div = document.createElement("div");
    div.classList.add("libraryItem");
    cardContent(library, i, div);
    div.setAttribute("id",library[i].title);
    document.getElementById("library-cards").appendChild(div);
  }
}

addBookToLibrary.prototype = Object.create(Book.prototype);

function cardContent(bookData,index,div){
    const header = document.createElement("h3");
    const dataList = document.createElement("ul");
    dataList.setAttribute("id", bookData[index].Title+"List");
    header.textContent = bookData[index].Title;
    for(const key in bookData[index]){
        const li = document.createElement("li");
        li.setAttribute("id", dataList.id+[key])
        li.textContent = `${key}: ${bookData[index][key]}`;
        dataList.appendChild(li);
    }
    div.appendChild(header);
    div.appendChild(dataList);
    
    //Remove from DOM and array
    const removeButton = document.createElement("button");
    removeButton.textContent = 'Remove Book';
    removeButton.onclick = () =>{ 
      removeCard(div,index)};
    div.appendChild(removeButton);

    // Toggle read/unread
    const readToggle = document.createElement("button");
    
    readToggle.textContent = "Read/Unread";
    //readToggle.onclick = () => {
      //  toggleRead(div,index)};
    div.appendChild(readToggle);
}

//to do - toggle read function
function toggleRead(index){
    if(bookData[index].Read=="Yes"){
        bookData[index].Read = "No"; 
      }
      else{
        bookData[index].Read = "Yes";
      }
      console.table(myLibrary);
  }


function removeCard(index){
    //console.log(elem);
    //elem.remove();
    myLibrary.splice([index],1);
    displayLibrary(myLibrary);
    console.table(myLibrary);
}