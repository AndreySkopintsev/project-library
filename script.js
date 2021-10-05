const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const formContainer = document.getElementById('formContainer')
const closeBtn = document.getElementById('closeForm')
const newBtn = document.getElementById('newBook')
const booksContainer = document.getElementById('booksContainer')
const nightModeBtn = document.getElementById('darkMode')
const container = document.querySelector('.container')
const submitBtn = document.getElementById('submit')
const clearFields = document.getElementById('clearFields')

let books = [{title:"Game of thrones",author:"George R. R. Martin",pages:"694",language:"English",date:"July 1 1996",status:"read"},
                {title:"The Hobbit",
                 author:"J. R. R. Tolkien",
                 pages:"310",
                 language:"English",
                 date:"21 September 1937",
                 status:"read"}]

// Functions
const Book = (title,author,pages,language,date,status) =>{
    return {title,author,pages,language,date,status}
}

function cleanUpForm(){
    formContainer.querySelector('#title').value = ''
    formContainer.querySelector('#author').value = ''
    formContainer.querySelector('#pages').value = ''
    formContainer.querySelector('#language').value = ''
    formContainer.querySelector('#date').value = ''
}

function arrayRender(){
    booksContainer.innerHTML = ''
    books.forEach(book => {
       let div = document.createElement('div')
       div.classList.add('single-book')
       div.setAttribute('data-title',book.title)
       if(book.status == 'read'){
           div.classList.add('read')
       }
       div.innerHTML = book.status == 'read' ? `
        <button><i class="fas fa-times"></i></button>
        <h2>${book.title}</h2>
        <p>By: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Language: ${book.language}</p>
        <p>Published: ${book.date}</p>
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
        div.querySelector('.fa-times').addEventListener('click',(e)=>{
            console.log(div.getAttribute('data-title'))
            books = books.filter(book => book.title != div.getAttribute('data-title'))
            arrayRender()
        })
        div.querySelector('#readStatus').addEventListener('input',()=>{
            div.classList.toggle('read')
        })
        booksContainer.appendChild(div)
    })
}

arrayRender()

// Event listners
newBtn.addEventListener('click',()=>{
    formContainer.classList.toggle('visible')
})

closeBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    formContainer.classList.remove('visible')
})

nightModeBtn.addEventListener('input',()=>{
    container.classList.toggle('night')
})

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('submitted')
    let title = formContainer.querySelector('#title').value
    let author = formContainer.querySelector('#author').value
    let pages = formContainer.querySelector('#pages').value
    let language = formContainer.querySelector('#language').value
    let date = new Date(formContainer.querySelector('#date').value)
    let fullDate = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    let status = formContainer.querySelector('#bookStatus').value

    let newBook = Book(title,author,pages,language,fullDate,status)
    formContainer.classList.remove('visible')
    cleanUpForm()
    books.push(newBook)
    arrayRender()
    
    console.log(newBook)
})

clearFields.addEventListener('click',(e)=>{
    e.preventDefault()
    cleanUpForm()
})