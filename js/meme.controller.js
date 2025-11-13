const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')
const fontSizeStep = 2
var gLineIdx = 0

function onInit() {
    renderMemeGallery()
    renderMeme()

}

function renderMemeGallery() {  //renders the gallery
    const imgs = getImgsArray()
    const gallery = document.querySelector('.gallery-imgs')
    var strHTML = imgs.map(img => `<img onclick="onClickedImg(${img.id})" class="gallery-img" src="${img.url}"></img>`).join("")
    gallery.innerHTML = strHTML
}

function onClickedImg(id) {     //in the gallery
    createGMeme(id)      // create the gMeme
    renderMeme()
}

function renderMeme() {   //renders the curr meme in the canvas
    const meme = getMeme()
    const img = new Image()
    img.src = meme.imgUrl

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => drawText({ idx, ...line }))
    }
}

function drawText({ idx, txt, size, color, fontFamily, txtAlign, x, y }) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFamily}`
    gCtx.textAlign = txtAlign
    gCtx.textBaseline = 'top'
    gCtx.lineJoin = 'round'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (idx === getMeme().selectedLineIdx) {
        //todo - textBox
    }
}


function onTextChanged(txt) {
    changeText(txt)
    renderMeme()
}
function onFontSize(action) {
    fontSize(action)
    renderMeme()
}
function onTextAlign(direction) {
    alignText(direction)
    renderMeme()
}
// function onTextChanged(txt) {
//     changeText(txt)
//     renderMeme()
// }
// function onTextChanged(txt) {
//     changeText(txt)
//     renderMeme()
// }


function onDownloadCanvas() {
    const link = document.createElement("a")
    const url = gElCanvas.toDataURL()
    link.href = url
    link.download = 'image'
    link.click()
}