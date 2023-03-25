const currentData = 'https://mindhub-xj03.onrender.com/api/amazing';
let arrayEvents  = [];


async function getData() {
    
    try{
        let response = await fetch(currentData);
        let dataApi = await response.json();
        let arrayEvents = dataApi.events;

        const query = location.search;


        let params = new URLSearchParams(query)
        console.log(params)

        let id = params.get("id")
        console.log(id);

        let profile = arrayEvents.find(info => arrayEvents._id == id)
        console.log(arrayEvents);


        const container = document.getElementById('card')
        
        container.innerHTML = `
        <img src="${arrayEvents[id-1].image}" alt=${arrayEvents[id-1].name}">
        <div class="just">
        <h2>${arrayEvents[id-1].name}</h2>
        <div class="flex-detail-r fw-bolder">
        <p>Date:<span>${arrayEvents[id-1].date}</span></p>
        <p>Category:<span>${arrayEvents[id-1].category}</span></p>
        <p>Place:<span>${arrayEvents[id-1].place}</span></p>
        <p>Capacity:<span>${arrayEvents[id-1].capacity}</span></p>
        <p>Assistance:<span>${arrayEvents[id-1].assistance}</span></p>
        <p>Estimate:<span>${arrayEvents[id-1].estimate}</span></p>
        <p>Description:<span>${arrayEvents[id-1].description}</span></p>
        <p>Price:<span>${arrayEvents[id-1].price}</span></p>
        </div>
        </div>
        </div>
        `
        // container.innerHTML= container;

    } catch (fail) {
        console.log(fail.message);
    }
}


getData();

