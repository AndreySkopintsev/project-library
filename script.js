// Geneeral elements
const formContainer = document.getElementById('formContainer')
const newBook = document.getElementById('newBook')
const closeForm = document.getElementById('closeForm')
const booksContainer = document.getElementById('booksContainer')
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
    console.log(book.published)
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