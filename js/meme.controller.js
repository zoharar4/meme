const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')


function onInit() {
    renderMemeGallery()
}

function renderMemeGallery() {
    const imgs = getImgsArray()
    const gallery = document.querySelector('.gallery-imgs')
    var strHTML = imgs.map(img => `<img id="${img.id}" class="gallery-img" src="${img.url}"></img>`).join("")
    gallery.innerHTML = strHTML
}


renderMeme()
function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.imgUrl
    img.onload = () => gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    console.log('1:',1)
}