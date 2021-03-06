if (localStorage.count === undefined) {
    localStorage.count = -1
}
let count = Number(localStorage.count)

//book constructor

function Book(name, author, isRead, noOfPages, status ='visible') {
    this.name = name
    this.author = author
    this.isRead = isRead
    this.noOfPages = noOfPages
    this.showInfo = `${name} by ${author} has ${noOfPages} pages, which ${isRead ? "is read." : "is unread."}`
    this.status = status
}



const book1 = new Book("mario", "alex", false, 25)


document.getElementById("book1").innerHTML = book1.name
document.getElementById("book1-author").innerHTML = book1.author
document.getElementById("book1-info").innerHTML = book1.showInfo
function sendToLocalStorage(name, author, isRead, noOfPages) {
    let bookObj = {
        "name": name,
        "author": author,
        "isRead": isRead,
        "noOfPages": noOfPages
    }
    localStorage.setItem(`book-${count + 1}`, JSON.stringify(bookObj))
    count += 1
    localStorage.setItem('count', count)
}

function userInputs() {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;
    let isRead = $('input[type=radio][name=btnradio]:checked').attr('for');
    let noOfPages = document.getElementById('bookNoOfPages').value
    sendToLocalStorage(name, author, isRead, noOfPages)
}
function userInputValidation(){
    let form = $('form')[0].checkValidity()
    if(form){
        userInputs()
    }
}

function appendNewBooks() {
    let keys = Object.keys(localStorage)
    let countIndex = keys.indexOf('count')
    keys.splice(countIndex,1)
    keys.sort()
    for (let i = 0; i < count +1; i++) {
        if(dataArr[i].status ==='hidden'){
            continue
        }else{
            let newElement = $(`
            <div id="${keys[i]}" class="card" style="width: 33.33%; height: 150px">
                <div class="card-body">
                    <div class="align-btn d-flex justify-content-between">
                    <h5 id="bk-${i}" class="card-title">Book_Name</h5>
                    <div class="2nd">
                        <button id="edit-${i}" type="button" class="btn btn-secondary edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-3" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
                        </svg>
                        </button>
                        <button type="button" id='del-btn-${i}' class="btn btn-outline-danger delete-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                        </svg>
                        Button
                        </button>
                    </div>
                    </div>
                    <h6 id="bk-${i}-author" class="card-subtitle mb-2 text-muted">Author_Name</h6>
                    <p id="bk-${i}-info" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>`)
            $(".insertion").append(newElement)
        }
 
    
        }
        
}
//function to get data from localstorage 
function getFromLocalStore() {
    let values = [],
        keys = Object.keys(localStorage)
        let cd = keys.indexOf('count')
        keys.splice(cd, 1)
        keys.sort()
    for(let i=0;i<keys.length;i++){
        values.push(localStorage.getItem(keys[i]));
    }
    let val = values;
    return val
}
let dataArr = []
//getting data back from localStorage

let bookData = getFromLocalStore()


//function who will contruct each book object
//bugfix = isRead param
function bookGen(bookData) {
    for (let i = 0; i < bookData.length; i++) {
        let data = JSON.parse(bookData[i])
        let bugFix = data.isRead
        if (bugFix === 'true') {
            bugFix = true
        } else bugFix = false

        if(data.status === 'hidden'){
            dataArr.push(new Book(data.name, data.author, bugFix, data.noOfPages,data.status))
        }    
        else dataArr.push(new Book(data.name, data.author, bugFix, data.noOfPages))
        
    }
}
bookGen(bookData)

//displaying function
let delBookArr = []
function display(dataArr) {
    for(let i=0;i<bookData.length;i++){
        let a = JSON.parse(bookData[i])
        if(a.status ==='hidden'){
            delBookArr.push(i)
        }
    }
    appendNewBooks()
    for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].status === 'hidden'){
                continue
            }else{
                document.getElementById(`bk-${i}`).innerHTML = dataArr[i].name
                document.getElementById(`bk-${i}-author`).innerHTML = dataArr[i].author
                document.getElementById(`bk-${i}-info`).innerHTML = dataArr[i].showInfo
            
            }
    }
}
display(dataArr)

//deleting a book

let delBookId = null
function bookDelete() {
    let elem = document.getElementById(`book-${delBookId}`)
    elem.remove()
    // localStorage.
    let delStat = JSON.parse(bookData[delBookId])
    delStat.status = 'hidden'
    localStorage.setItem(`book-${delBookId}`,JSON.stringify(delStat))
}

document.querySelectorAll('.delete-btn').forEach(item => {
    item.addEventListener('click', event => {
        let idName = item.id
        idName = idName.substring(8)
        idName = Number(idName)
        document.getElementById("exampleModalLabel-2").innerHTML = `Delete Book: ${dataArr[idName].name}`
        delBookId = idName
        let remBtn = document.getElementById("rem-btn")
        remBtn.addEventListener('click', bookDelete)

    })
})
function userInputsForEdit() {
    let name = document.getElementById('bookName-2').value;
    let author = document.getElementById('bookAuthor-2').value;
    let isRead = $('input[type=radio][name=btnradio]:checked').attr('for');
    let noOfPages = document.getElementById('bookNoOfPages-2').value
    console.log(name,author,isRead,noOfPages)
    obj = {
        "name":name,
        "author":author,
        "isRead": isRead,
        "noOfPages":noOfPages
    }
    localStorage.setItem(`book-${ids}`, JSON.stringify(obj))
}
function userInputValidationForEdit(){
    let form = $('form')[1].checkValidity()
    if(form){
        userInputsForEdit()
    }
}
let ids=null
document.querySelectorAll('.edit-btn').forEach(item => {
    item.addEventListener('click', event => {
        let id = item.id
        id =Number(id.substring(5))
        $('#editmodal-title').html(`Edit Book: ${dataArr[id].name}`)
        $('input[id=bookName-2]').val(dataArr[id].name)
        $('input[id=bookAuthor-2]').val(dataArr[id].author)
        $('input[id=bookNoOfPages-2]').val(dataArr[id].noOfPages)
        if(dataArr[id].isRead){
            $('#btnradio3').prop("checked", true)
        }else{
        $('#btnradio4').prop("checked", true)
        }
        ids = id
    })
})