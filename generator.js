

window.onload=() =>{getOnline();
//togglePage();
}


async function getDataSync(url){
    var URL = "http://localhost:3000/"+url+"/";
    const res = await fetch(URL);
    const json = await res.json();
    console.log( json);

    return json;
      
      
    


}





//verifica daca sunt on 
async function getOnline(){

    let data  = await getDataSync( "online");
    console.log(data);
    if(data.state ==="Online"){
        if(data.mode ==="user" ){
            document.getElementById("hidField").value = "Default";
        }else if(data.mode === "token"){
            document.getElementById("hidField").value = "Token";
        }

        document.getElementById("hidMode").value = data.mode;

        loadPage(data);
        //console.log("AAAAaaaa");
    }
    else  if (data.state ==="Offline"){

        
        window.location.href = "file:///D:/Faculate/Anul%20III/Info/Tehnici%20web/Proiect/index.html";  
        //console.log("BBBBbbbb");
    }
        
    else 
        console.log("XXXXxxxx");

}

// ia date pentru header si alte functiii

async function getHeader(data){
    let camp = data.autentification;
    let res ;
    if(data.mode ==="user" ){
        res = await getDataSync( "users/" + camp );
        document.getElementById("lNumeCon").innerHTML = res.name;
        document.getElementById("hidId").value = res.id;
        

    }else if(data.mode === "token"){
        res = await getDataSync( "tables");
        //console.log(res);

        for(let i of res)
            for(let guy of i.guys){
                if(guy.token === camp){
                    document.getElementById("lNumeCon").innerHTML = guy.name; 
                    document.getElementById("hidTable").value = i.id;

                }
            }
    }
    res = await getDataSync( "tables");
    document.getElementById("hidTables").value = res.length;

}

async function loadTable(){
    //toggle pe tabelul respectiv 

    let idTab = (this.id).split("-")[1];

    let divH = document.getElementById("headerTable");
    clearTable(divH);
    let divB =document.getElementById("contentTable");
    clearTable(divB);

    let res = await getDataSync( "tables/" + idTab );
    doTable(res);

    document.getElementById("hidField").value="Table";
    togglePage();
}


function clearTable(item){

    while (item.childNodes.length > 0)
	    item.removeChild(item.childNodes[0]);
}


async function getAllTokens(){
    let tokens=[];
    let res = await getDataSync("tables");
    let k = 0;
    for(let i of res)
            for(let guy of i.guys){
                tokens[k] = guy.token;
                k++;
            }
    
    return await tokens;
}


async function doTable(data){
    let name = document.createElement("label");
    name.id="lNumeTab";
    name.setAttribute("class","fontTextM1 fontTextM2 fontTextM3");
    name.innerHTML = "Nume Tabel: "+ data.name;

    /*let reveals = document.createElement("label");
    reveals.id = "lReveals";
    reveals.innerHTML = "Reveals: " +data.reveals;*/

    let tab = document.createElement("table");
    tab.id="listTable";
    tab.setAttribute("class","table fontTabM1 fontTabM2 fontTabM3");
    let HeadTableContent =  
        `
        <tr class="tr">
            <th></th>
            <th class="th">Nume</td>
            <th class="th">Token</th>
            <th class="th">Reveal</th>
        </tr>
        `;
    let TableContent='';
    for(let i of data.guys){

        TableContent += `
        <tr class="tr">
            <td class="td">${i.id}</td>
            <td class="td"><label id="lName-${i.id}" >${i.name}</lable></td>
            <td class="td"><label id="lToken-${i.id}" >${i.token}</lable></td>
            <td class="td"><label id="lReveal-${i.id}" >${i.reveal}</lable></td>
        <tr>
        `;
        
    }

    tab.innerHTML = HeadTableContent + TableContent;

    let res = await getDataSync( "users/" + data.ownerId );

    let owner = document.createElement("label");
    owner.id = "lOwner";
    owner.setAttribute("class","fontTextM1 fontTextM2 fontTextM3");
    owner.innerHTML = "Owner: " +res.name;

    let btn =document.createElement("button");
    btn.setAttribute("id",`del-${data.id}`)
    btn.setAttribute("type","button");
    btn.setAttribute("name","del");
    btn.setAttribute("class","button tabBtnM1 tabBtnM2 tabBtnM3");
    btn.innerHTML="Sterge tabelul";
    btn.addEventListener('click', async function () {
        let id = (this.id.split('-'))[1];


        await manageData('DELETE','tables',id,"");

        document.getElementById("hidField").value='Default';
        togglePage();

      })

    let divHeader = document.getElementById("headerTable");

    divHeader.appendChild(btn);
    divHeader.appendChild(document.createElement("br"));

    divHeader.appendChild(name);
    divHeader.appendChild(document.createElement("br"));
    divHeader.appendChild(owner);
    divHeader.appendChild(document.createElement("br"));
    // divHeader.appendChild(reveals);
    // divHeader.appendChild(document.createElement("br"));

    let divContent = document.getElementById("contentTable");
    divContent.appendChild(tab);
    
}



function checkToken(token,otherTokens){

    for(let i = 0; i < otherTokens.length; i++)
        if(token === otherTokens[i] && token !== "")
            return false;
    
    
    return true;

}

async function generateToken(otherTokens){
    let token= "";
    do {

        token =Math.random().toString(36).substr(2);
        var x = await checkToken(token,otherTokens);
    }while( !( x ) );
    return token;
}

//genereaza pana la  ultimi 2 si la ultimii 2  se decide cum ii pune 
function genMateList(nrPart){
    let mateList=[];
    let mate;
    let i = 0;


    while( i < nrPart){
        mate = Math.floor(Math.random() * nrPart) ;  //genereaza nr intre 0 si nrPart
        if( i !== mate ){
            let ok =1;
            if( i === 0){
                ok = 1 ;
            }else if( (nrPart - i ) === 2 ){
                let n=0;
                let count =0;
                let opt = -1;
                let a = -1;
                let b = -1;
                for(opt = 0; opt< nrPart;opt++){
                  
                    count = 0;

                    for(let x = 0; x < nrPart; x++){
                        if(mateList[x] !== opt){
                            count++;
                        }
                    }

                    if(count === nrPart){
                        if(a === -1){
                            a = opt;
                        }else if(a !== -1){
                            b = opt;
                            n = 2;
                        }
                    }
                }


                ok = 0;
                if( a === i){
                    mateList[i] = b;
                    mateList[i+1] = a;
                }
                else if(a === i+1)
                {
                    mateList[i] = a;
                    mateList[i+1] = b;

                }if( b === i){
                    mateList[i] = a;
                    mateList[i+1] = b;
                }
                else if(b === i+1){
                    mateList[i] = b;
                    mateList[i+1] = a;
                }else{
                    mateList[i] = a;
                    mateList[i+1] = b;
                }
                i +=2;


            }else if(i > 0){
                for(let j = 0; j < i; j++ ){
                    if(mate === mateList[j]){
                        ok = 0;
                    }
                }
            }
            if( ok === 1 ){
                mateList[i] = mate;
                i++;
            }
        }
    }
    return mateList;
        

}
function asignMate(guys , list){
    for(let i = 0; i < guys.length; i++){
        guys[i]["mate"] = guys[list[i]]["token"];
    }
    return guys;
}

async function createTable(){

    let err = document.getElementById("err");
    err.innerHTML ="";
    let nume = document.getElementById("iNumeCreateTable").value;

    if( nume === "")
        err.innerHTML += "Denumiti tabelul!";
    let nElem = document.getElementById("participanti").getElementsByTagName("input").length;


    let block ={
        id :"0",
        name : "a",
        ownerId : "a",
        reveals : "0",
        guys : [{}]
    }

    let tokens =await getAllTokens();
    let nGuys = 0;
    let guys =[{id :"0",
    name : "a",
    token : "a",
    mate :"no",
    reveal :"no"}];
    let guy ;


    for(let i = 0; i < nElem;i++){
        guy ={
            id :"0",
            name : "a",
            token : "a",
            mate :"no",
            reveal :"no"
        };
        var item = document.getElementById(`iNumeP${i+1}`);
        
        if(item.value !== ""){
            

            var token = await generateToken(tokens);
            tokens[ tokens.length ] = token;

            guy["id"] = nGuys;
            guy["name"] = item.value;
            guy["token"] = token;
            guy["mate"] ="no";
            guy["reveal"] ="no";


            guys[nGuys] =guy;
            nGuys++;
        }
    }

    let listMate = genMateList(nGuys);
    let finalGuys = asignMate(guys , listMate);
    let id = document.getElementById("hidTables").value;
    
    block["id"] = String(parseInt(id) + 1);
    block["name"] = nume;
    block["ownerId"] = document.getElementById("hidId").value;
    block["reveals"] =`${nGuys}/0`;
    block["guys"] = finalGuys;

    
    //console.log(block);
    document.getElementById("hidTables").value = id + 1;

    await manageData( "POST", "tables" , 0,block);

    document.getElementById("hidField").value = 'Default';
    togglePage();

}

async function loadAllTables(){
    let ownId = document.getElementById("hidId").value;
    let container = document.getElementById("tablesContainer");
    clearTable(container);
    let res = await getDataSync( "tables");
    for(let i of res){
        if( ownId === i.ownerId ){
        var btn = document.createElement("Button");
        btn.id = "table-"+i.id;
        btn.setAttribute("class","button tabBtnM1 tabBtnM2 tabBtnM3");
        btn.innerHTML = i.name;

        btn.addEventListener('click', loadTable, true);

        container.appendChild(btn);
        }
    }

}

function loadPage(data){
    getHeader(data);
    togglePage();
}



function togglePage(){
    var state = document.getElementById("hidField").value;
    document.getElementById("generatorContainer").style.display = "block";
    //console.log( state);
    //console.log("am intrat3");
    switch( state ){
        
        case 'Default':
            document.getElementById("defaultContainer").style.display = "block";
            document.getElementById("createContainer").style.display = "none";
            document.getElementById("tableContainer").style.display = "none";
            document.getElementById("tokenContainer").style.display = "none";

            
            
            //load all tables 

            loadAllTables();

            
            break;


        case 'Create':
        
            
            document.getElementById("defaultContainer").style.display = "none";
            document.getElementById("createContainer").style.display = "block";
            document.getElementById("tableContainer").style.display = "none";
            document.getElementById("tokenContainer").style.display = "none";

            


            

            break;


        case 'Table':    
            document.getElementById("defaultContainer").style.display = "none";
            document.getElementById("createContainer").style.display = "none";
            document.getElementById("tableContainer").style.display = "block";
            document.getElementById("tokenContainer").style.display = "none";
            

            

            
            break;


        case 'Token':    
            document.getElementById("defaultContainer").style.display = "none";
            document.getElementById("createContainer").style.display = "none";
            document.getElementById("tableContainer").style.display = "none";
            document.getElementById("tokenContainer").style.display = "block";

            break;
            
        

        default:
            console.log("Status gresit: '" + state + "'");

    }
    return true;
}


function onAddTable(){
    document.getElementById("hidField").value="Create";
    togglePage();
}

async function onLogOut(){

    

    let body ={
        mode : "user",
        autentification : "1",
        state:"Offline"
    }
    await manageData("PUT","online","",body);
    window.location.href = "file:///D:/Faculate/Anul%20III/Info/Tehnici%20web/Proiect/index.html";  

}


function onBack(){
    document.getElementById("hidField").value="Default";
    togglePage();
}