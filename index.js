let count = 1;
// *****************Normal Functions***************************
AddBooks();
function AddBooks(){
    if(localStorage.getItem('BookName')===null){
        localStorage.setItem('BookName',"[]");
        localStorage.setItem('Author',"[]");
        localStorage.setItem('Type',"[]");
    }
    let BookName=JSON.parse(localStorage.getItem('BookName'));
    let Author=JSON.parse(localStorage.getItem('Author'));
    let Type=JSON.parse(localStorage.getItem('Type'));
    let html=tbody.innerHTML;
    for(let i=0;i<BookName.length;i+=1){
        html+= `
        <tr>
        <th scope="row">${count}</th>
        <td>${BookName[i]}</td>
        <td>${Author[i]}</td>
        <td>${Type[i]}</td>
        <td><button type="button" class="btn btn-primary" id="${count}" onclick=Delete(this.id)>Delete</button></td>
        </tr>
        `;
        count+=1;
    }
    tbody.innerHTML=html;
}

function AddBook(BookName,Author,Type){
    let html=tbody.innerHTML;
        html+= `
        <tr>
        <th scope="row">${count}</th>
        <td>${BookName}</td>
        <td>${Author}</td>
        <td>${Type}</td>
        <td><button type="button" class="btn btn-primary" id="${count}" onclick=Delete(this.id)>Delete</button></td>
        </tr>
        `;
        count+=1;
    tbody.innerHTML=html;
}

function Delete(Id){
    let ele=document.getElementById(Id);
    let BookName=JSON.parse(localStorage.getItem('BookName'));
    let Author=JSON.parse(localStorage.getItem('Author'));
    let Type=JSON.parse(localStorage.getItem('Type'));
    BookName.splice(Id-1,1);
    Author.splice(Id-1,1);
    Type.splice(Id-1,1);
    localStorage.setItem('BookName',JSON.stringify(BookName));
    localStorage.setItem('Author',JSON.stringify(Author));
    localStorage.setItem('Type',JSON.stringify(Type));
    count=1;
    tbody.innerHTML="";
    AddBooks();
}

// *****************Object Orientation***************************
function gen_Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

gen_Book.prototype.add = function () {
    let BookName=JSON.parse(localStorage.getItem('BookName'));
    let Author=JSON.parse(localStorage.getItem('Author'));
    let Type=JSON.parse(localStorage.getItem('Type'));
    BookName.push(this.name);
    Author.push(this.author);
    Type.push(this.type);
    localStorage.setItem('BookName',JSON.stringify(BookName));
    localStorage.setItem('Author',JSON.stringify(Author));
    localStorage.setItem('Type',JSON.stringify(Type));
    AddBook(this.name,this.author,this.type);
};
gen_Book.prototype.clear = function () {
  libraryForm.reset();
};
gen_Book.prototype.show=function(msg,color){
    let html=message.innerHTML;
    html+=`
    <div class="alert alert-${color}" role="alert">
    ${msg}
    </div>
    `;
    message.innerHTML=html;
    setTimeout(()=>{
        message.innerHTML="";
    },2000);
}
gen_Book.prototype.valid=function(){
    if(this.name!=0 || this.author!=0){
        this.add();
        this.clear();
        this.show("Your book has been successfully! added.","primary")
    }else{
        this.show("Sorry! your book cannot be added, Please enter valid book and author name.","danger");
    }
}

// ***************** Events ***************************

libraryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let type;
    if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book = new gen_Book(bookName.value, author.value, type);
  book.valid();
});
