

function signup(){
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("pass");
    var username = document.getElementById("username")
    var auth = firebase.auth();
    var errorvar;
    var email = emailInput.value;
    var pass = passwordInput.value;
    var usrname = username.value;

    firebase.auth().createUserWithEmailAndPassword(email, pass)


    .then(function(result){

        return result.updateProfile({displayName : usrname})
        .then(function(){
            console.log(result);
          //  alert("Sign Up successful");
           
            localStorage.setItem("log","1");
            localStorage.setItem("name",auth.currentUser.displayName);
            localStorage.setItem("email",auth.currentUser.email);
            var str = email;
            var str2 =str.split(".")
            console.log(str2[0]);
            localStorage.setItem("spt",str2[0]);
            location = "todo.html"; 
        })
       
       
    })
       
       /*  window.open("todo.html", "_self"); */
 
    
    
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  errorvar = errorCode + " " + errorMessage;
  printError(errorvar);
  passwordInput.value = "";
   console.log(errorCode + " "+ errorMessage);
   
  
  // ...
});
}

function login(){
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("pass");
    
    var auth = firebase.auth();
     var email = emailInput.value;
    var pass = passwordInput.value;
var errorvar;
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(result){
        console.log(result);
        
        localStorage.setItem("log","1");
        localStorage.setItem("name",auth.currentUser.displayName);
        localStorage.setItem("email",auth.currentUser.email);
        var str = email;
        var str2 =str.split(".")
        console.log(str2[0]);
        localStorage.setItem("spt",str2[0]);
     // console.log(auth.currentUser.displayName);
     //   console.log(auth.currentUser.email);

        location = "todo.html";
        /* window.open("todo.html", "_self"); */
     /*    alert("Login successful"); */
    })
    
    
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
 errorvar = errorCode + " " + errorMessage;
 printError(errorvar);

  console.log(errorCode + " "+ errorMessage);
  passwordInput.value = "";
  // ...
});

}
function printError(errorvar){
   
    
       
        document.getElementById("md-bd1").innerHTML=errorvar;
        document.getElementById("exampleModalLabel1").innerHTML = "<b>Error</b>";
        $("#exampleModal1").modal();
    
}
function setname(){
    if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('email'));
   element.appendChild(text);
   console.log(localStorage.getItem('name'));
    }
else{
    
    alert("Login First!");
    location = "index.html";
   /*  window.open("index.html", "_self"); */
}
}
function logout(){
    localStorage.setItem('log','0');
    location = "index.html";
    /* window.open("index.html", "_self"); */
    
}

function contact(){
    
    document.getElementById("md-bd1").innerHTML="<b>Muhammad Salman Tariq</b></br>Facebook:<a href='https://www.facebook.com/salmaaan.khaan' target='_blank'>Salmaan Khan</a></br>Email:<a href='mailto:salmaankhaan028@gmail.com' >Send Mail</a>";
    document.getElementById("exampleModalLabel1").innerHTML = "Contact";
    $("#exampleModal1").modal();

}

function about(){
    document.getElementById("md-bd1").innerHTML="<b>Developed by:</b> Muhammad Salman Tariq</br><b>With the help of: </b>Sir Haider, Sir Majid, Sir Hanzala, Sir Ali Mughal<b></br>Organisation: </b>Saylani Welfare Trust - Mobile Software Development Training, Batch 4.2";
    document.getElementById("exampleModalLabel1").innerHTML = "About Us";
    $("#exampleModal1").modal();
}

var database = firebase.database().ref('/');
var input = document.getElementById('input');
var unOrderList = document.getElementById('unOrderList')

function todo() {
    var todo = {
        item: input.value,
       
    }
    database.child('todo/'+localStorage.getItem("spt")+"").push(todo);
    input.value = "";
}

function remove(key){
    database.child('todo/'+localStorage.getItem("spt")+"/"+key).remove();

}
database.child('todo/'+localStorage.getItem("spt")+"").on("child_removed", function (rem) {
    var deleteobj = document.getElementById(rem.key);
    deleteobj.remove();
  

    })

database.child('todo/'+localStorage.getItem("spt")+"").on("child_added", function (snapshot) {
    var demo = snapshot.val()
    demo.id = snapshot.key

    var list = document.createElement('LI');
    list.setAttribute("class" ,"list-group-item");
    list.setAttribute("id" ,demo.id);
    var tagText = document.createTextNode(demo.item)
    list.appendChild(tagText)
    //<li>getInput</li>
    var deletebtn = document.createElement("button");
    var btntxt = document.createTextNode("Delete");
    deletebtn.setAttribute("class", "btn btn-danger float-right opc2");
    deletebtn.setAttribute("style", "opacity:0.9;");
    deletebtn.appendChild(btntxt);
    deletebtn.onclick = function(){remove(demo.id) }
    var editbtn = document.createElement("button");
    var btntxt2 = document.createTextNode("Edit");
    editbtn.setAttribute("class", "btn btn-warning float-right opc2");
    editbtn.setAttribute("style", "opacity:0.9;");
    editbtn.appendChild(btntxt2);
    editbtn.onclick = function(){edit(demo.id,demo.item) }
   
    list.appendChild(deletebtn);
    list.appendChild(editbtn);

    unOrderList.appendChild(list);


})
var kk;
function edit(key,item){
    document.getElementById("input1").value=item;
   kk= key;
    $("#exampleModal2").modal();
}



function changes(){
    var input = document.getElementById("input1").value;
    var obj = {
        item :input
    } 

    database.child('todo/'+localStorage.getItem("spt")+"/"+kk).update(obj);
    
    var old = document.getElementById(kk);

    var list = document.createElement('LI');
    list.setAttribute("class" ,"list-group-item");
    list.setAttribute("id" ,kk);
    var tagText = document.createTextNode(input)
    list.appendChild(tagText)
    //<li>getInput</li>
    var deletebtn = document.createElement("button");
    var btntxt = document.createTextNode("Delete");
    deletebtn.setAttribute("class", "btn btn-danger float-right opc2");
    deletebtn.setAttribute("style", "opacity:0.9;");
    deletebtn.appendChild(btntxt);
    deletebtn.onclick = function(){remove(kk) }
    var editbtn = document.createElement("button");
    var btntxt2 = document.createTextNode("Edit");
    editbtn.setAttribute("class", "btn btn-warning float-right opc2");
    editbtn.setAttribute("style", "opacity:0.9;");
    editbtn.appendChild(btntxt2);
    editbtn.onclick = function(){edit(kk,input) }
   
    list.appendChild(deletebtn);
    list.appendChild(editbtn);

    unOrderList.replaceChild(list,old);
}

