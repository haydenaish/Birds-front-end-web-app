let file = ("data/nzbird.json")

bird_array = []

function response_callback(response){
    if(!response.ok){
        console.error("Failed to fetch data" +response.status)
    }

    return response.text()
}

function data_callback(data){
    bird_array = JSON.parse(data);
    createbirdpanels(bird_array)
    
}


const StatusMap = new Map([
    ["Not Threatened", "rgb(0,160,40)"],
    ["Naturally Uncommon", "rgb(99,154,48)"],
    ["Relicit", "rgb(152,203,104)"], 
    ["Recovering", "rgb(254,204,51)"],
    ["Declining", "rgb(254,154,1)"],
    ["Nationally Increasing", "rgb(194,105,103)"],
    ["Nationally Vulnerable", "rgb(155,0,0)"],
    ["Nationally Endangered", "rgb(102,0,50)"],
    ["Nationally Critical", "rgb(50,0,51)"],
    ["Data Deficient", "rgb(0,0,0)"],
])

function createbirdpanels(bird_array){
    for(let bird of bird_array){
        let main = document.querySelector('main')
        let birdPanel = document.createElement('article')
        let color = StatusMap.get(bird.status)
        birdPanel.innerHTML =`
        <div class="card">
            <img class="card-image" src="${bird.photo.source}" alt="${bird.primary_name}" width="250" Height="200">
            <div class="stat-circle" style="background-color:${color};"></div>
            <div>
                <h1 class="tl">${bird.primary_name}</h1>
                <h2> ${bird.english_name}</h2>
                <p class='bl'> Photo by ${bird.photo.credit}<p>
                <p><strong>Scientific Name</strong><br>${bird.scientific_name}</p>
                <p><strong>Order</strong><br>${bird.order}</p>
                <p><strong>Family</strong><br>${bird.family}</p>
                <p><strong>Length</strong><br>${bird.size.length.value}${bird.size.length.units}</p>
                <p><strong>Weight</strong><br>${bird.size.weight.value}${bird.size.weight.units}</p>
            <div>
            
        </div>`

    main.append(birdPanel);

    }
}






fetch(file).then(response_callback).then(data_callback);