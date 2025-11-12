


function onInit() {
    createGallertImgs()
}

function createGallertImgs() {
    const imgs = getImgsArray()
    const gallery = document.querySelector('.gallery-imgs')
    var strHTML = imgs.map(img => `<img src="${img.url}"></img>`)
    gallery.innerHTML = strHTML
}