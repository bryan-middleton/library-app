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

  //open modal form when buton is clicked

  addBookButton.addEventListener("click", ()=>{
    inputForm.showModal();
  });


  inputForm.addEventListener("close", (e) =>{
    //if pressing cancel, does nothing and displays current library
    buttonPressed == "cancel"
    ? displayLibrary(myLibrary)//do nothing
    : addBookToLibrary(titleInput.value,authorInput.value,pagesInput.value,readSelect.value);
    console.table(titleInput.value,authorInput.value,pagesInput.value,readSelect.value);
    document.getElementById("modalForm").reset(); //resets form for next use
  });


confirmBtn.addEventListener("click", (event) =>{ 
  
  //check for valid inputs before allowing form to submit
  if(titleInput.validity.valueMissing || authorInput.validity.valueMissing || pagesInput.validity.valueMissing || readSelect.value == "default"){
  if(titleInput.validity.valueMissing){
    titleInput.setCustomValidity("Title cannot be blank");
  }
  else{
    titleInput.setCustomValidity("");
  }
  if(authorInput.validity.valueMissing){
    authorInput.setCustomValidity("Author cannot be blank");
  }
  else{
    authorInput.setCustomValidity("");
  }
  if(pagesInput.validity.valueMissing){
    pagesInput.setCustomValidity("Pages cannot be blank");
  }
  else{
    pagesInput.setCustomValidity("");
  }
  if(readSelect.value == "default"){
    readSelect.setCustomValidity("Must select yes or no");
  }
  else{
    readSelect.setCustomValidity("");
    }
  }  
  else{
    event.preventDefault();
    //transfer values to close event
    inputForm.close(titleInput.value,authorInput.value,pagesInput.value,readSelect.value);
  }
 });

 cancelBtn.addEventListener("click", (event) =>{
  event.preventDefault();
  buttonPressed="cancel";
   inputForm.close();
});

 
function validate(input){
  const validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity("You gotta fill this out, yo!");
  } else if (validityState.rangeUnderflow) {
    input.setCustomValidity("We need a higher number!");
  } else if (validityState.rangeOverflow) {
    input.setCustomValidity("That's too high!");
  } else {
    input.setCustomValidity("");
  }

  input.reportValidity();
}

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