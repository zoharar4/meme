

function saveToStorage(key,object) {
    var saved = JSON.parse(localStorage.getItem(key)||'[]')
    saved.push(object)
    var objectJSON = JSON.stringify(saved)
    localStorage.setItem(key,objectJSON)
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}