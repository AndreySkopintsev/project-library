// Geneeral elements
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const formContainer = document.getElementById('formContainer')
const newBook = document.getElementById('newBook')
const closeForm = document.getElementById('closeForm')
const booksContainer = document.getElementById('booksContainer')
const darkMode = document.getElementById('darkMode')
const container = document.querySelector('.container')
const inputBoxes = document.querySelectorAll('.input-box')


// Book related fields
const bookTitle = document.getElementById('title')
const bookAuthor = document.getElementById('author')
const bookPages = document.getElementById('pages')
const bookLanguage = document.getElementById('language')
const bookPublished = document.getElementById('date')
const bookStatus = document.getElementById('bookStatus')

// Book count 
const totalBooks = document.getElementById('totalCount')
const totalRead = document.getElementById('totalRead')
const totalUnread = document.getElementById('totalUnread')

//Books array
let books = [{title:"Game of thrones",author:"George R. R. Martin",pages:"694",language:"English",published:"July 1 1996",status:"read"},
                {title:"The Hobbit",
                 author:"J. R. R. Tolkien",
                 pages:"310",
                 language:"English",
                 published:"21 September 1937",
                 status:"read"}]

// Book constructor
function Book(title,author,pages,language,published,status){
    this.title = title
    this.author = author
    this.pages = pages
    this.language = language
    this.published = published
    this.status = status
}

//Render total numbers
function totalNumbers(array){
    totalBooks.textContent = array.length
    totalRead.textContent = array.filter(item => item.status == 'read').length
    totalUnread.textContent = array.filter(item => item.status == 'unread').length
}

//Rendering books
function renderBooks(){
    booksContainer.innerHTML = ''
    books.forEach(book => {
        let div = document.createElement('div')
        div.classList.add('single-book')
        if(book.status == 'read'){
            div.classList.add('read')
        }
        div.innerHTML = book.status == 'read' ? `
        <button><i class="fas fa-times"></i></button>
        <h2>${book.title}</h2>
        <p>By: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Language: ${book.language}</p>
        <p>Published: ${book.published}</p>
        <input checked type="checkbox" id="readStatus">
        `
        :
        `
        <button><i class="fas fa-times"></i></button>
        <h2>${book.title}</h2>
        <p>By: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Language: ${book.language}</p>
        <p>Published: ${book.date}</p>
        <input type="checkbox" id="readStatus">
        `
        booksContainer.appendChild(div)
        singleBookBtns(div)
    })
}

//Hooking up single book's buttons
function singleBookBtns(div){
    // Change status button
    div.querySelector('#readStatus').addEventListener('change',()=>{
        changeStatus(div)
        totalNumbers(books)
        div.classList.toggle('read')
    })
    // Delete button
    div.querySelector('button').addEventListener('click',()=>{
        let title = div.querySelector('h2').textContent
        books = books.filter(book => book.title !== title)
        renderBooks()
        totalNumbers(books)
    })
} 

// Changing book status in array
function changeStatus(book){
    let title = book.querySelector('h2').textContent
    let foundBook = books.find(book => book.title == title)
    let index = books.indexOf(foundBook)
    foundBook.status = foundBook.status == 'read' ? 'unread' : 'read'
    books[index] = foundBook
}

// Form validation
function formValidation(){
    inputBoxes.forEach(box => {
        if(box.querySelector('input')){
            if(box.querySelector('input').value == ''){
                box.classList.add('error')
            }else{
                return
            }
        }
    })
}

renderBooks()
totalNumbers(books)

// Event listeners
formContainer.addEventListener('submit',(e)=>{
    e.preventDefault()
    formValidation()
    const inputs = (formContainer.querySelectorAll('input')).values()
    for(input of inputs){
        if(!input.value){
            break
        }else{
            let date = new Date(bookPublished.value)
            let fullDate = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
            let book = new Book(
                                bookTitle.value,
                                bookAuthor.value,
                                bookPages.value,
                                bookLanguage.value,
                                fullDate,
                                bookStatus.value)
            books.push(book)
            renderBooks()
            formContainer.classList.remove('visible')
            bookTitle.value = ''
            bookAuthor.value = ''
            bookPages.value = ''
            bookLanguage.value = ''
            bookPublished.value = ''
            bookStatus.value = ''
            inputBoxes.forEach(box => {
                if(box.querySelector('input')){
                    box.classList.remove('error')
                }
            })
        }
    }
    
})

newBook.addEventListener('click',()=>{
    formContainer.classList.add('visible')
})

closeForm.addEventListener('click',(e)=>{
    e.preventDefault()
    formContainer.classList.remove('visible')
})

darkMode.addEventListener('change',()=>{
    container.classList.toggle('night')
})