

//delete
async function deleteData(url, id) {
    const res = await fetch(url + id, {
      method: 'delete'
    });
    const json = await res.json();
    return json;
}



//get 2
function getData2(url ,url2) {


    fetch(url)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          //console.log(url2);
   
          // Examine the text in the response
          if(url2 === "online")
            response.json().then(renderData2);
          else
            response.json().then(renderData);
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}
   
function renderData(data) {
    myData = data; 
    //console.log(myData);
    
}

function renderData2(data){  
  myData = data; 
  setPageMode();
}

function dispayData(){
    
    //console.log(myData);
    return myData ;
};

// put
function updateData (url,bodyData,id) {
    
    var URL = url;
    if (id !== ""){
      var URL = url+id;
    }

    var myJSON = JSON.stringify(bodyData)
   
    fetch(URL, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body:myJSON
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

//post
function addData (url ,bodyData) {
    
    var myJSON = JSON.stringify(bodyData)
    fetch(url,
    {
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        method: "POST",
        body:myJSON
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

//central comand
async function manageData( method, url ,id,bodyData){
    let response ;
   var URL = "http://localhost:3000/"+url+"/";
    switch(method){
        case 'GET':
           //response = await getData(URL);
           getData2(URL,url); 
           //console.log(response);
          
          break;

        case 'POST':
          await addData (URL, bodyData);
          break;

        case 'PUT':
          await updateData (URL, bodyData, id);
          break;

        case 'DELETE':
          await deleteData(URL, id);
          break;

        default:
          console.log( " Optiune gresita!!!" );          
    }
    
   
}
