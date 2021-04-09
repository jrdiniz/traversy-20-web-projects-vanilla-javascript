const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
    updateDOM();
}

// Add new obj to data array
function addData(obj){
    data.push(obj);

    updateDOM();
}

// Double Money
function doubleMoney(){
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}

// Sort users by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

// Show only millioneires
function showMillionaries(){
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate Total Wealth
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3><strong>Total Wealth: </strong> ${formatMoney(wealth)}</h3>`;
    main.appendChild(wealthEl);
}

// Update DOM
function updateDOM(providedData = data){
    // Clean main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // ForEach
    providedData.forEach(item=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${ formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number){
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth);