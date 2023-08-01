let file = ("data/nzbird.json")

  function response_callback(response){
    if(response.status != 200){
        return
    }

    return response.text()
}

function data_callback(data){
    let bird_array = JSON.parse(data);
    
    for(let bird of bird_array){
    
        createbirdpanel(bird)

    }
    
}

function createbirdpanel(bird){


}




fetch(file).then(response_callback).then(data_callback);
