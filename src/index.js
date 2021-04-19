let divDogBar = document.getElementById('dog-bar');
const divDogSpot = document.getElementById('dog-info');
let btnFilter = document.getElementById('good-dog-filter');
const dbURL = 'http://localhost:3000/pups';

let dogFilter = !!0;
let dog;

filterDogs();
fetchDogs();


function filterDogs(){
    
    btnFilter.addEventListener('click',filterDogs);
}



function filterDogs() {
    if (btnFilter.innerHTML === 'Filter good dogs: ON') {
        btnFilter.innerHTML = 'Filter good dogs: OFF';
        dogFilter = !!0;
    } else {
    btnFilter.innerHTML = 'Filter good dogs: ON';
    dogFilter = !0;
    }
    fetchDogs();
}

function fetchDog(id) {
    const URL = `${dbURL}/${id}`;
    fetch(URL)
    .then(resp => resp.json())
    .then(result => {
        dog = result;
        renderDog(dog);
        return result;
    })
    .catch(err => console.log(err));
};

function renderDog(dog) {
    divDogSpot.innerHTML = '';
    const img = document.createElement('img');
    const p1 = document.createElement('p');
    const btn = document.createElement('btn');
    img.src = dog.image;
    img.alt = "The selected dog.";
    p1.innerHTML = `<h2>${dog.name}</h2>`;
    let dogQlty = "Bad Dog!";
    if (dog.isGoodDog) dogQlty = "Good Dog!";
    btn.innerHTML = dogQlty;
    btn.id = "dog-quality-toggler";
    btn.addEventListener('click', QltyFlip)
    divDogSpot.appendChild(img);
    divDogSpot.appendChild(p1);
    divDogSpot.appendChild(btn);
}

function QltyFlip() {
    const URL = `${dbURL}/${dog.id}`;
    const data = {
        isGoodDog: !dog.isGoodDog,
    };
    const configObj = {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(URL, configObj)
    .then(resp => resp.json())
    .then( (result) => {
        dog.isGoodDog = result.isGoodDog;
        dog.isGoodDog ? dogQlty = "Good Dog" : dogQlty = "Bad Dog";
        const btn = document.getElementById('dog-quality-toggler');
        btn.innerHTML = dogQlty;
        fetchDogs();
    })
    .catch(err => console.log(err));
}

function fetchDogs() {
    fetch(dbURL)
    .then(resp => resp.json())
    .then(results => {
        renderDogs(results);
        return results;
    })
    .catch(err => console.log(err));
}

function renderDogs(dogs) {
    divDogBar.innerHTML = '';
    dogs.forEach( dog => {
        if (!(dogFilter === !0 && dog.isGoodDog === !!0)) {
            const spn = document.createElement('span');
            spn.innerHTML = `${dog.name}`;
            spn.addEventListener('click', () => fetchDog(dog.id));
            divDogBar.appendChild(spn);
        }
    });
}   