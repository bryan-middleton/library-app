let myLibrary = [];

function Book(title, author, pages, read){
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
}

//Create variables for new book input form 

  const addBookButton = document.getElementById("displayForm");
  const inputForm = document.getElementById("inputForm");
  const titleInput = inputForm.querySelector("#bookTitle");
  const authorInput = inputForm.querySelector("#author");
  const pagesInput = inputForm.querySelector("#pages");
  const readSelect = inputForm.querySelector("select")
  const confirmBtn = inputForm.querySelector("#confirmBtn");
  const cancelBtn = inputForm.querySelector("#cancelBtn");
  let buttonPressed = "";
  let title = "";
  let author = "";
  let pages = "";
  let read = "";

  //open modal form when buton is clicked

  addBookButton.addEventListener("click", ()=>{
    inputForm.showModal();
  });
//set title based on input
  titleInput.addEventListener("input", (e)=>{
    title = e.target.value;
    console.log(title);
  });
//set author based on input
  authorInput.addEventListener("input", (e)=>{
    author = e.target.value;
    console.log(author);
  });
//set pages based on input
  pagesInput.addEventListener("input", (e)=>{
    pages = e.target.value;
    console.log(pages);
  });
//set read based on drop down selection
  readSelect.addEventListener("change", (e)=>{
    read = e.target.value;
    console.log(read);
  });

  inputForm.addEventListener("close", (e) =>{
    buttonPressed == "cancel" || title == "" || author == "" || pages == "" || read == "default"
    ? displayLibrary(myLibrary)//do nothing
    : addBookToLibrary(title,author,pages,read);
    document.getElementById("modalForm").reset(); //resets form for next use
  });

confirmBtn.addEventListener("click", (event) =>{
   event.preventDefault();
    inputForm.close(title,author,pages,read);
 });

 cancelBtn.addEventListener("click", (event) =>{
  event.preventDefault();
  buttonPressed="cancel";
   inputForm.close();
});

 


function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
  
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
    readToggle.onclick = () => {
    toggleRead(index)};
    div.appendChild(readToggle);
}

//to do - toggle read function
function toggleRead(index){
  console.log(index); 
  console.table(myLibrary);
  if(myLibrary[index].Read=="Yes"){
        myLibrary[index].Read = "No"; 
      }
      else{
        myLibrary[index].Read = "Yes";
      }
      displayLibrary(myLibrary);
    }


function removeCard(index){
    console.log(index);
    myLibrary.splice([index],1);
    displayLibrary(myLibrary);
    console.table(myLibrary);
}