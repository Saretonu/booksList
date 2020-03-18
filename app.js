const form = document.querySelector('#book-form');
const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-books');
const titleString = "Title: ";
const auhtorString = " Author: ";

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addBook);
    bookList.addEventListener('click', removeBook);
    document.addEventListener("DOMContentLoaded", restoreList);
    filter.addEventListener('keyup',filterBooks);
    clearBtn.addEventListener('click', clearBooks);
}

function addBook(event){
    if(bookTitleInput.value === '' || bookAuthorInput.value === ''){
        alert('Add a book title and author!');
        return;
    }
    addBookToList(titleString + bookTitleInput.value + "," + auhtorString + bookAuthorInput.value)
    bookTitleInput.value="";
    bookAuthorInput.value="";
}

function addBookToList(book){
    //create an li element
    const li = document.createElement('li');
    //assign a class name to the html element
    li.className = 'collection-item';
    //add text content to the li element
    li.appendChild(document.createTextNode(book));
    //create an anchor tag 
    const removeLink = document.createElement('a');
    //ad a class name to the removeLink element
    removeLink.className = 'delete-item secondary-content';
    removeLink.innerHTML = 'X';
    li.appendChild(removeLink);

    //add li element to the ul collection
    bookList.appendChild(li);
    
    //store the book in local storage
    storeInLocalStorage(book);
    event.preventDefault();
}

function addLocalStorageBookToList(book){
    //create an li element
    const li = document.createElement('li');
    //assign a class name to the html element
    li.className = 'collection-item';
    //add text content to the li element
    li.appendChild(document.createTextNode(book));
    //create an anchor tag 
    const removeLink = document.createElement('a');
    //ad a class name to the removeLink element
    removeLink.className = 'delete-item secondary-content';
    removeLink.innerHTML = 'X';
    li.appendChild(removeLink);

    //add li element to the ul collection
    bookList.appendChild(li);
    event.preventDefault();
}

function storeInLocalStorage(book){
    //declare an array to read from local storage
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    //add the user's book to the books array
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function storeOutLocalStorage(){
    if(localStorage.getItem('books') === null){
        return null;
    }else{
        temp =  JSON.parse(localStorage.getItem('books'));
        return temp;
    }
}

function restoreList(event){
    let booksList = storeOutLocalStorage();
    if(booksList != null){
        console.log(typeof(booksList));
        for(var i = 0; i < booksList.length; i++){
            if(typeof(booksList[i]) == 'string'){
                addLocalStorageBookToList(booksList[i]);
            }else{
                console.log('Expected type - String _ Actual - ',booksList[i], typeof(booksList[i]));
            }
        }
    }
}

function removeBook(event){
    //check if the area clicked contains a .delete-item element

    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the book?')){
            //remove the entire li element
            event.target.parentElement.remove(); 
            
            //Remove from local storage
            removeFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeFromLocalStorage(bookItem){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else{
        books = storeOutLocalStorage();
    }

    books.forEach(function(book, index) {
        if(bookItem.textContent.slice(0, -1) === book){
            books.splice(index,1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

function filterBooks(event){
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(book => {
        const tempValue = book.firstChild.textContent;
        const bookValue = tempValue.replace(titleString,"").replace(auhtorString,"").replace(',',' ');
        if(bookValue.toLowerCase().indexOf(text) != -1){
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

function clearBooks(){
    //removing elements with while loop and removeChild
while(bookList.firstChild){
    bookList.removeChild(bookList.firstChild);
}

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

 /*   function IDGenerator() {
    
        this.length = 8;
        this.timestamp = +new Date;
        
        var _getRandomInt = function( min, max ) {
           return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        
    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
            
        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];	 
        }
            
        return id;
    }   
} */   