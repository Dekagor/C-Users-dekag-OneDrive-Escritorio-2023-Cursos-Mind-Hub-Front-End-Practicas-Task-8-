const currentData = 'https://mindhub-xj03.onrender.com/api/amazing';
let arrayEvents  = [];
let pastEvents = [];
let upEvents = [];

async function getData() {

    try{
        let response = await fetch (currentData);
        let dataApi = await response.json();

        events = dataApi.events;
        update = dataApi.currentDate;

        events = dataApi.events
        for (const event of dataApi.events){
            arrayEvents.push(event)
        }

        for (let i = 0; i < events.length; i++) {
        if(events[i].date > update) {
            upEvents.push(events[i]);
            } else {
            pastEvents.push(events[i]);
            }
        }



  
    highestAttendance(pastEvents)
    lowestAttendance(pastEvents)
    HighestCapacity(arrayEvents)
    table1();
    table2();
    table3();


        } catch (fail) {
            console.log(fail.message);
        }
    }
    console.log(arrayEvents);

    getData();

    function highestAttendance(array){
        return array.reduce((account, value) => {
            if (((value.assistance*100)/value.capacity) > ((account.assistance*100)/account.capacity)){
                return value 
            } else {
                return account
            }
        })
    }
    
    function lowestAttendance(array){
        return array.reduce((account, value) => {
            if (((value.assistance*100)/value.capacity) < ((account.assistance*100)/account.capacity)){
                return value 
            } else {
                return account
            }
        })
    }

    function HighestCapacity(array) {
        return array.reduce((account, value) => {
            if (value.capacity > account.capacity){
                return value
            } else {
                return account
            }
        })
    }
    function table1(){
        let container = document.querySelector(".table1")
        let bodyHtml = "";
        let highestPercentage = highestAttendance(pastEvents)
        let lowestPercentage = lowestAttendance(pastEvents)
        let largeCapacity = HighestCapacity(events)
        bodyHtml += `
        <tr>
        <td>${highestPercentage.name}</td>
        <td>${lowestPercentage.name}</td>
        <td>${largeCapacity.name}</td>
        </tr>
        `
        container.innerHTML = bodyHtml;
    }
    
    function arrayCategory(events){
        let categories = [];
        events.forEach(element => {
            if (! categories.includes(element.category)){
                categories.push(element.category)
            }
        }) 
        return categories;
    }
    function table2(){
        let container = document.querySelector(".table2")
        let bodyHtml = "";
        let categorias = arrayCategory(upEvents)
        categorias.forEach(e => {
            let counter = 0;
            let revenues = 0;
            upEvents.forEach(element => {
                if(element.category == e){
                    revenues += (element.price*element.estimate)
                }
                return revenues
            })
            
            let percentage = 0;
            upEvents.forEach(element => {
                if(element.category == e){
                    counter++
                    percentage += ((element.estimate*100)/element.capacity)
                }
            })
            percentage = (percentage/counter).toFixed(2)
            bodyHtml += `
            <tr>
            <td>${e}</td>
            <td>${revenues}</td>
            <td>${percentage}%</td>
            </tr>
            `
        });
        container.innerHTML = bodyHtml;
    }

    function table3(){
        let container = document.querySelector(".table3")
        let bodyHtml = "";
        let categorias = arrayCategory(pastEvents)
        categorias.forEach(e => {
            let counter = 0;
            let revenues = 0;
            pastEvents.forEach(element => {
                if(element.category == e){
                    revenues += (element.price*element.assistance)
                }
                return revenues
            })
            
            let percentage = 0;
            pastEvents.forEach(element => {
                if(element.category == e){
                    counter++
                    percentage += ((element.assistance*100)/element.capacity)
                }
            })
            percentage = (percentage/counter).toFixed(2)
            bodyHtml += `
            <tr>
            <td>${e}</td>
            <td>${revenues}</td>
            <td>${percentage}%</td>
            </tr>
            `
        });
        container.innerHTML = bodyHtml;
    }