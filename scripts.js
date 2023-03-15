let myLibrary = [];
const shelf = document.querySelector(".book-shelf")

function Book(title, author, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function createBookElement(book, index){
    const bookElement = document.createElement("div")
    bookElement.classList.add("book")
    const title = document.createElement("div")
    title.textContent = book.title
    const author = document.createElement("div")
    author.textContent = book.author
    const pages = document.createElement("div")
    pages.textContent = book.pages
    const read = document.createElement("div")
    read.textContent = book.read
    const exit = document.createElement("button")
    exit.textContent = "✖"
    exit.classList.add("exit-button")
    exit.addEventListener("click", e => {
        removeBook(index)
    })
    bookElement.appendChild(exit)
    bookElement.appendChild(title)
    bookElement.appendChild(author)
    bookElement.appendChild(pages)
    bookElement.appendChild(read)
    bookElement.id = `book-${index}`
    shelf.insertBefore(bookElement, shelf.firstChild)
}

function removeBook(id) {
    myLibrary.splice(id, 1);
    shelf.replaceChildren()
    myLibrary.forEach((book, index) => createBookElement(book, index))
}

function addError(element) {
    const error = document.createElement("div");
    error.textContent = `Please enter a valid ${element.name}`
    error.setAttribute("style","color: red")
    error.classList.add("invalid-text")
    element.after(error)

    element.classList.add("invalid")
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const validateInput = () => {
    if(title.value == "" && !title.classList.contains("invalid")) addError(title)
    if(author.value == "" && !author.classList.contains("invalid")) addError(author)

    if(title.value != "") {
        title.classList.remove("invalid")
        if(title.nextSibling) title.nextSibling.remove();
    }

    if(author.value != "") {
        author.classList.remove("invalid")
        if(author.nextSibling) author.nextSibling.remove();
    }

    if(title.value == "" || author.value == "") return false;
    return true;

}

const submit = document.querySelector(".submit-button");

submit.addEventListener("click", event => {
    if(validateInput()) {
        title.classList.remove("invalid")
        author.classList.remove("invalid")
        const errorText = document.querySelectorAll(".invalid-text")
        errorText.forEach(element => element.remove())

        myLibrary.push(new Book(title.value, author.value, pages.value, read.value));
        console.log(myLibrary)

        shelf.replaceChildren()
        myLibrary.forEach((book, index) => createBookElement(book, index))
    };
})
