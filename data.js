let myData;



//delete
function deleteData(url, id) {
    return fetch(url + id, {
      method: 'delete'
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

//get
async function getData(url) {

  var URL = url;//"http://localhost:3000/"+url;
  const res = await fetch(URL);
  const json = await res.json();
  console.log( json);

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
          console.log(url2);
   
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
    console.log(myData);
    
}

function renderData2(data){
  //console.log("aici data");   
  myData = data; 
  //console.log(myData);
  //console.log(data.state);
  setPageMode();


}


// put
async function updateData (url,bodyData,id) {
    
    var URL = url;
    if (id !== ""){
      var URL = url+id;
    }

    var myJSON = JSON.stringify(bodyData)
   
    var res = await fetch(URL, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body:myJSON
    });

    var json = await res.json();
    return json;
    //.then(response => console.log('Success:', JSON.stringify(response)))
    // .catch(error => console.error('Error:', error));

    
  }

//post
async function addData (url ,bodyData) {
    
    var myJSON = JSON.stringify(bodyData)
    let res = await fetch(url,
    {
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        method: "POST",
        body:myJSON
    })
    var json = await res.json();
    return json;
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
          response = await addData (URL, bodyData);
            
          break;

        case 'PUT':
          response = await updateData (URL, bodyData, id);
          break;

        case 'DELETE':
           deleteData(URL, id);
          break;

        default:
          console.log( " Optiune gresita!!!" );          
    }
    
    return await response;
}



