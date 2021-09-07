// Geneeral elements
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const books = [{title:"Game of thrones",author:"George R. R. Martin",pages:"694",language:"English",published:"July 1 1996",status:"read"}]
const formContainer = document.getElementById('formContainer')
const newBook = document.getElementById('newBook')
const closeForm = document.getElementById('closeForm')
const booksContainer = document.getElementById('booksContainer')
const darkMode = document.getElementById('darkMode')
const container = document.querySelector('.container')

// Book related fields
const bookTitle = document.getElementById('title')
const bookAuthor = document.getElementById('author')
const bookPages = document.getElementById('pages')
const bookLanguage = document.getElementById('language')
const bookPublished = document.getElementById('date')
const bookStatus = document.getElementById('bookStatus')

// Book constructor
function Book(title,author,pages,language,published,status){
    this.title = title
    this.author = author
    this.pages = pages
    this.language = language
    this.published = published
    this.status = status
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
    console.log(div.querySelector('#readStatus'))
    div.querySelector('#readStatus').addEventListener('change',()=>{
        console.log(div.classList)
        div.classList.toggle('read')
    })
    div.querySelector('button').addEventListener('click',()=>{
        console.log('deleted')
    })
} 

renderBooks()

// Event listeners
formContainer.addEventListener('submit',(e)=>{
    e.preventDefault()
    let date = new Date(bookPublished.value)
    console.log(date.getDate())
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