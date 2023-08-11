let file = ("data/nzbird.json");
bird_array = []


function response_callback(response) {
    if (!response.ok) {
        console.error("Failed to fetch data" + response.status)
    }

    return response.text()
}



function data_callback(data) {
    bird_array = JSON.parse(data);
    createbirdpanels(bird_array)

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", searchBird);

    // const filterOrder = document.getElementById("filterOrder");
    // filterOrder.addEventListener("change", searchBird);


    // const filterFamily = document.getElementById("filterFamily");
    // filterFamily.addEventListener("change", searchBird);


    const filterStatus = document.getElementById("Conserv");
    filterStatus.addEventListener("change", searchBird);


    const filterSize = document.getElementById("Length");
    filterSize.addEventListener("change", searchBird);


    const filterWeight = document.getElementById("weight");
    filterWeight.addEventListener("change", searchBird);

    let statusKey = document.getElementById('status_key');
    console.log(statusKey)
    StatusMap.forEach((value, key) =>{
        let container = document.createElement('div')
        // console.log
        // container.setAttribute("class", "testSpot")
        container.innerHTML =`
        <div class="stat-circle-bar" style="background-color:${value};"> </div>
        <span>${key}</span>
        `
        statusKey.append(container);
    })
}


function createbirdpanels(birdData) {
    let main = document.querySelector('.photo-container')
    main.innerHTML="";
    for (let bird of birdData) {
        let birdPanel = document.createElement('article')
        birdPanel.setAttribute('class', "toggle")
        let color = StatusMap.get(bird.status)
        birdPanel.innerHTML = `
        <div class="card">
            <img class="card-image" src="${bird.photo.source}" alt="${bird.primary_name}" width="250" Height="200">
            <div class="stat-circle" style="background-color:${color};"></div>
            <div>
                <h1 class="tl">${bird.primary_name}</h1>
                <h2> ${bird.english_name}</h2>
                <p class='bl'> Photo by ${bird.photo.credit}<p>
                <p><strong>Scientific Name</strong><br>${bird.scientific_name}</p>
                <p><strong>Conservation Status</strong><br>${bird.status}</p>
                <p><strong>Order</strong><br>${bird.order}</p>
                <p><strong>Family</strong><br>${bird.family}</p>
                <p><strong>Length</strong><br>${bird.size.length.value}${bird.size.length.units}</p>
                <p><strong>Weight</strong><br>${bird.size.weight.value}${bird.size.weight.units}</p>
            <div>
        </div>`

        birdPanel.addEventListener('click', () => togglePanelExpansion(birdPanel, bird));
        main.appendChild(birdPanel)
    }   
}
{/* <div class="card" onmouseover=console.log("test") onmouseout=console.log("bannana")> */}

function togglePanelExpansion(panel, bird) {
    console.log(bird.other_names)
    panel.classList.toggle('scaled');
}

function searchBird() {
    const searchText = document.getElementById("searchInput").value.trim().toLowerCase();
    const normalizedSearchText = searchText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    // const filterOrder = document.getElementById("filterOrder").value;
    // const filterFamily = document.getElementById("filterFamily").value;
    const filterStatus = document.getElementById("Conserv").value;
    const filterSize = document.getElementById("Length").value;
    const filterWeight = document.getElementById("weight").value;

    let filteredBirdData = bird_array;


        filteredBirdData = filteredBirdData.filter(bird => bird.order.toLowerCase());
        // console.log(filteredBirdData);


        // filteredBirdData = filteredBirdData.filter(bird => bird.family.toLowerCase());
        // console.log(filteredBirdData);

        if(filterStatus){  
        filteredBirdData = filteredBirdData.filter(bird => bird.status == filterStatus);
        }
        // console.log(filterStatus);
        if(filterStatus == "Any"){
            filteredBirdData = bird_array
        }



    filteredBirdData = filteredBirdData.filter(bird => {
        const matchSearchText = (
            bird.primary_name.toLowerCase().includes(normalizedSearchText) ||
            bird.english_name.toLowerCase().includes(normalizedSearchText) ||
            bird.scientific_name.toLowerCase().includes(normalizedSearchText) ||
            bird.other_names.some(name => name.toLowerCase().includes(normalizedSearchText))
        );
        return matchSearchText;
    });

    if (filterSize === "Shortest to tallest") {
        filteredBirdData = filteredBirdData.sort((a, b) => a.size.length.value - b.size.length.value);
    } else if (filterSize === "Tallest to shortest") {
        filteredBirdData = filteredBirdData.sort((a, b) => b.size.length.value - a.size.length.value);
    }


    if (filterWeight === "Lightest to heaviest") {
        filteredBirdData = filteredBirdData.sort((a, b) => a.size.weight.value - b.size.weight.value);
    } else if (filterWeight === "Heaviest to lightest") {
        filteredBirdData = filteredBirdData.sort((a, b) => b.size.weight.value - a.size.weight.value);
    }


    createbirdpanels(filteredBirdData);
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

function reset(){
    createbirdpanels(bird_array)
}

fetch(file).then(response_callback).then(data_callback);