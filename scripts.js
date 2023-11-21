//#region PageLoad
function Load_Function() {
    let offerings = document.querySelectorAll('.offering_num').forEach(e => {
        e.addEventListener("change", () => {getMultiplier(e.id)})
    })
}
if (window.attachEvent) {window.attachEvent('onload', Load_Function);}
else if (window.addEventListener) {window.addEventListener('load', Load_Function, false);}
else {document.addEventListener('load', Load_Function, false);}
//#endregion

//#region Globals
let minSoulStones = 0;
let totalSoulStones = 0;
//#endregion

//#region Classes
class FountainResult{
    constructor(pull30, pull300, pull3000, pull30000, totalSoulStones, minSoulStones) {
        this.pull30 = pull30
        this.pull300 = pull300
        this.pull3000 = pull3000
        this.pull30000 = pull30000
        this.totalSoulStones = totalSoulStones
        this.minSoulStones = minSoulStones
        this.multiplier = this.totalSoulStones/this.minSoulStones
    }
}
//#endregion

function getMultiplier(id) {
    let value = document.getElementById(id).value;
    document.getElementById(`${id}x`).value = value/id;
    getTotal()
}

function getTotal() {
    minSoulStones = 0;
    totalSoulStones = 0;
    document.querySelectorAll('.offering_num').forEach(e => {
        if(!isNaN(parseInt(e.value))) {
            totalSoulStones += parseInt(e.value)
            minSoulStones += parseInt(e.id)
        }
    })
    document.getElementById('total').value = totalSoulStones
    document.getElementById('totalx').value = totalSoulStones/minSoulStones || 0
}

function savePull() {
    let pull30 = document.getElementById('30').value;
    let pull300 = document.getElementById('300').value;
    let pull3000 = document.getElementById('3000').value;
    let pull30000 = document.getElementById('30000').value;
    let pulls = JSON.parse(localStorage.getItem('pulls'));
    pulls = pulls || [];

    pulls.push(new FountainResult(pull30, pull300, pull3000, pull30000, totalSoulStones, minSoulStones))
    localStorage.setItem('pulls', JSON.stringify(pulls))

    if(localStorage.getItem('pulls')) {
        showMessage('Saved Pull Successfully', 'success')
    }
    else {
        showMessage("An error occured when saving", 'error')
    }
    getLifetimeTotals()
}

function clearStorage() {
    localStorage.clear()
    document.getElementById('lifetimeTotal').value = 0
    document.getElementById('lifetimeTotalx').value = 0

    if(!localStorage.getItem('pulls')) {
        showMessage("LocalStorage Cleared", 'error')
    }
}

function clearInputs() {
    let inputs = document.querySelectorAll(".offering_num")
    inputs.forEach(e => {
        e.value = ""
    })
    let multipliers = document.querySelectorAll(".offering_mult")
    multipliers.forEach(e => {
        e.value = ""
    })
    getTotal()
}

function getLifetimeTotals() {
    let lifetimeSoulStones = 0;
    let lifetimeMinSoulStones = 0;
    let pulls = JSON.parse(localStorage.getItem('pulls'))
    if(pulls) {
        pulls.forEach(e => {
            lifetimeSoulStones += parseInt(e.totalSoulStones) || 0
            lifetimeMinSoulStones += parseInt(e.minSoulStones) || 0
        })
        console.log(lifetimeMinSoulStones);
        document.getElementById('lifetimeTotal').value = lifetimeSoulStones
        document.getElementById('lifetimeTotalx').value = lifetimeSoulStones/lifetimeMinSoulStones || 0
    }
}

function showMessage(text, type) {
    let message = document.getElementById('message');
    message.classList = '';
    message.classList.add(type);
    message.innerText = text

    setTimeout(() => {
        message.classList = ''
        message.innerText = ''
    }, 3000);
}