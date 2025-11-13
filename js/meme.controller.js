const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')
const fontSizeStep = 2
const moveStep = 10
var downloading = false

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
    
    if (!meme.lines.length) {
        addText()
    }
    
    document.querySelector('#memeTextInput').value = meme.lines[meme.selectedLineIdx].txt

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => drawText({ idx, ...line }))
    }
}

function drawText({ idx, txt, size, color, fontFamily, txtAlign, x, y }) {
    gCtx.lineWidth = 2

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFamily}`
    gCtx.textAlign = txtAlign
    gCtx.textBaseline = 'top'
    gCtx.lineJoin = 'round'
    gCtx.setLineDash([])
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (idx === getMeme().selectedLineIdx && !downloading) {
        const textWidth = gCtx.measureText(txt).width
        const textHeight = size
        var rectX = x
        if (txtAlign === 'center') rectX = x - textWidth / 2
        else if (txtAlign === 'right') rectX = x - textWidth
        var rectY = y
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 3
        gCtx.setLineDash([6, 4])
        gCtx.strokeRect(rectX - 5, rectY - 5, textWidth + 10, textHeight + 10)
    }
}


function onTextChanged(txt) {
    changeText(txt)
    renderMeme()
}

function onMoveLine(direction) {
    if (direction === 'up') getMeme().lines[getMeme().selectedLineIdx].y -= moveStep
    else getMeme().lines[getMeme().selectedLineIdx].y += moveStep

    renderMeme()
}

function onDeleteLine() {
    getMeme().lines.splice(getMeme().selectedLineIdx,1)
    getMeme().selectedLineIdx = 0
    renderMeme()
    console.log('getMeme():',getMeme())
}

function onFontSize(action) {
    fontSize(action)
    renderMeme()
}

function onTextAlign(direction) {
    alignText(direction)
    renderMeme()
}

function onChangeLine() {
    changeLineIdx()
    renderMeme()
}

function onAddText() {
    addText()
    renderMeme()
}

function onColorBtn() {
    document.querySelector('.inputColorText').click()
}

function onChangedColor(value) {
    getMeme().lines[getMeme().selectedLineIdx].color = value
    renderMeme()
}

function onAddText() {
    addText()
}

function onDownloadCanvas() {
    downloading = true
    renderMeme()
    setTimeout(function () {
        const link = document.createElement("a")
        const url = gElCanvas.toDataURL()
        link.href = url
        link.download = 'image'
        link.click()
        downloading = false
        renderMeme()
    }, 1000)
}