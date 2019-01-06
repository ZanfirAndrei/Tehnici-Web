




window.onload = () =>{
    //console.log("hello");
    manageData( "GET", "online", 0, "");
    //console.log(statusul);
}



function clearInputs(){
    let nume = document.getElementById("iNume");
    let email = document.getElementById("iEmail");
    let parola = document.getElementById("iParola");
    let err = document.getElementById("err");

    nume.value ="";
    email.value ="";
    parola.value ="";
    err.innerHTML ="";
}


function togglePage(){
    var state = document.getElementById("hidField").value;
    document.getElementById("indexContainer").style.display = "block";
    //console.log( state);
    //console.log("am intrat3");
    switch( state ){
        
        case 'Default':
        
            document.getElementById("formContainer").style.display = "block";
            document.getElementById("aboutUs").style.display = "none";

            document.getElementById("divEasy").style.display = "flex";
            document.getElementById("divNume").style.display = "none";
            document.getElementById("divEmail").style.display = "flex";
            document.getElementById("divParola").style.display = "flex";
            document.getElementById("divToken").style.display = "none";

            document.getElementById("btnToken").innerHTML = "I have a token";
            document.getElementById("btnCont").innerHTML = "I don't have an account";

            clearInputs();
            break;


        case 'Autentification':
            document.getElementById("formContainer").style.display = "block";
            document.getElementById("aboutUs").style.display = "none";

            document.getElementById("divEasy").style.display = "flex";
            document.getElementById("divNume").style.display = "none";
            document.getElementById("divEmail").style.display = "flex";
            document.getElementById("divParola").style.display = "flex";
            document.getElementById("divToken").style.display = "none";


            document.getElementById("btnToken").innerHTML = "I have a token";
            document.getElementById("btnCont").innerHTML = "I don't have an account";
            

            clearInputs();
            break;


        case 'Unautentification':
            document.getElementById("formContainer").style.display = "block";
            document.getElementById("aboutUs").style.display = "none";

            document.getElementById("divEasy").style.display = "flex";
            document.getElementById("divNume").style.display = "flex";
            document.getElementById("divEmail").style.display = "flex";
            document.getElementById("divParola").style.display = "flex";
            document.getElementById("divToken").style.display = "none";

            document.getElementById("btnToken").innerHTML = "I have a token";
            document.getElementById("btnCont").innerHTML = "I have an account";

            clearInputs();
            break;


        case 'Token':

            document.getElementById("formContainer").style.display = "block";
            document.getElementById("aboutUs").style.display = "none";

            document.getElementById("divEasy").style.display = "flex";
            document.getElementById("divEmail").style.display = "none";
            document.getElementById("divNume").style.display = "none";
            document.getElementById("divParola").style.display = "none";
            document.getElementById("divToken").style.display = "flex";

            document.getElementById("btnToken").innerHTML = "I have an account";
            document.getElementById("btnCont").innerHTML = "I don't have an account";

            
            clearInputs();
            break;
        case 'About':
            document.getElementById("formContainer").style.display = "none";
            document.getElementById("divEasy").style.display = "none";
            document.getElementById("aboutUs").style.display = "flex";
            
        

        default:
            console.log("Status gresit: '" + state + "'");

    }
    return true;
}


function setPageMode( ){
    //console.log(myData);
    state = myData.state;
    //state ="";
    //console.log("am intrat2");
    if( state ==="")
        console.log("Empty state setPage:");
    //updateStateUser();
    else if( state === "Offline" ){
        //set default page
        document.getElementById("hidField").value = 'Default';
        togglePage();
    }
    else if( state === "Online" ){
        //redirect next page
        window.location.href = "file:///D:/Faculate/Anul%20III/Info/Tehnici%20web/Proiect/generator.html";  
    }

    //console.log("am iesit2");

}
function onBtnTkn(){

    var token = document.getElementById("btnToken");
    //console.log(token.innerHTML);

    if(token.innerHTML === "I have a token"){
        document.getElementById("hidField").value ='Token';
      togglePage();
    }
    else if(token.innerHTML === "I have an account"){
        document.getElementById("hidField").value ='Autentification';
      togglePage();
    }
    
}

function onBtnCont(){

    var cont = document.getElementById("btnCont");

    if(cont.innerHTML === "I don't have an account"){
        document.getElementById("hidField").value ='Unautentification';
        togglePage();
    }
    else if(cont.innerHTML === "I have an account"){
        document.getElementById("hidField").value ='Autentification';
        togglePage();
    }

}

function onBtnAbout(){

    document.getElementById("hidField").value ='About';
    togglePage();
       
}

function onBtnAute(){

    document.getElementById("hidField").value ='Default';
    togglePage();

}

function onSubmit(){
    state = document.getElementById("hidField").value;
    document.getElementById("err").innerHTML="";
    switch (state){
        case 'Default':
        
        var email = document.getElementById("iEmail").value ;
        var parola = document.getElementById("iParola").value ;

      
        if(email !== "" && parola !== ""){

            var block ={
                email:email,
                parola:parola
            }

            getSubmit(block,"users","login");
        }
        else {
            document.getElementById("err").innerHTML = "Completati toate campurile!!!!!!!";
            return false;
        }
        
        break;


    case 'Autentification':
        var email = document.getElementById("iEmail").value ;
        var parola = document.getElementById("iParola").value ;

        if(email !== "" && parola !== ""){

            var block ={
                email:email,
                parola:parola
            }

             getSubmit(block,"users","login");
        }
        else {
            document.getElementById("err").innerHTML = "Completati toate campurile";
            return false;
        }
        
        break;


    case 'Unautentification':
        var nume = document.getElementById("iNume").value ;
        var email = document.getElementById("iEmail").value ;
        var parola = document.getElementById("iParola").value ;

        if(email !== "" && parola !== "" && nume !== ""){

            var block ={
                nume:nume,
                email:email,
                parola:parola
            }

             getSubmit(block,"users","signup");
        }
        else {
            document.getElementById("err").innerHTML = "Completati toate campurile";
            return false;
        }

        break;


    case 'Token':

        var token = document.getElementById("iToken").value ;

        if(token !== ""){

            var block ={
                token:token
            }

             getSubmit(block,"tables","login");
        }
        else {
            document.getElementById("err").innerHTML = "Completati toate campurile";
            return false;
        }

        break;

    default:
        console.log("Status gresit: '" + state + "'");


    }
    return false;
}



//fnc data modificata-----------------------------------
function getSubmit( block , mode , type ){

    var url = "http://localhost:3000/"+mode+"/";
    fetch(url)
      .then(
        function (response) {
            
        
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          
   
          // Exam the text in the response
          if( type === "signup" )
            response.json().then(data =>checkSignUp(block,data));
          else if( mode === "users" )
            response.json().then(data =>checkDataUsers(block,data));
          else if( mode === "tabels" )
            response.json().then(data =>checkTknTables(block,data));

            


        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

    //return data;
}


async function checkDataUsers(block,data){
    for(let i of data){
        if(block.email === i["email"] && block.parola === i["password"] ){
            var bodyData ={
                mode: "user",
                autentification: i["id"],
                state: "Online"
            }
            await manageData( "PUT", "online" , "" ,bodyData);
            await manageData( "GET", "online", 0, "");

            return ;
        }
    }
    document.getElementById("err").innerHTML = " Adresa si/sau parola nu sunt accepate !";
}

async function checkTknTables(block,data){
    for(let i of data){
        for(let x of i["guys"] )
        if(block.token === i["token"] ){
            var bodyData ={
                mode: "token",
                autentification: block.token,
                state: "Online"
            }
            await manageData( "PUT", "online" ,"",bodyData);
            
            await manageData( "GET", "online", 0, "");
            return ;
        }
    }
    document.getElementById("err").innerHTML = " Token-ul nu este valid !";

}

async function checkSignUp(block,data){
    var id = 1;
    for(let i of data){
        id = parseInt(i["id"]);
        if(block.email === i["email"] && block.parola === i["password"] && block.nume === i["name"] ){
            
            document.getElementById("err").innerHTML = " Datele sunt deja utilizate de alt user !";
            //console.log("yasss");
            return ;
        }
    }
    id ++;
    

    var bodyData={
        id: id,
        name: block.nume,
        email: block.email,
        password: block.parola
    }
    await manageData("POST","users","",bodyData);

    var bodyData2={
        mode: "user",
        autentification: id,
        state: "Online"
    }
    await manageData("PUT","online","",bodyData2);

    await manageData( "GET", "online", 0, "");

}
