


function onInit() {
    renderMemeGallery()
}

function renderMemeGallery() {
    const imgs = getImgsArray()
    const gallery = document.querySelector('.gallery-imgs')
    var strHTML = imgs.map(img => `<img id="${img.id}" class="gallery-img" src="${img.url}"></img>`).join("")
    gallery.innerHTML = strHTML
}