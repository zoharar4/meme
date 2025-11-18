const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')
const memeEditor = document.querySelector('.meme-editor')
const gallery = document.querySelector('.gallery')
const savedMemesGallery = document.querySelector('.saved-memes')

const fontSizeStep = 2
const moveStep = 10
var downloading = false
var isGrabing = false

const KEY = 'userMemes'

function onInit() {
    document.fonts.load('16px "armio"')
    document.fonts.load('16px "fredoka"')
    document.fonts.load('16px "IBMPlexSans"')
    shuffleImgs()
    renderMemeGallery()
}

function changeCanvasSize() {
    if (!getMeme().lines) return
    const canvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = canvasContainer.clientWidth - 10
    renderMeme()
}

//GALLERY------------------------------

function renderMemeGallery() {  //renders the gallery
    const imgs = getImgsArray()
    const gallery = document.querySelector('.gallery-imgs')
    var strHTML = imgs.map(img => `<img onclick="onClickedImg(${img.id})" class="gallery-img" src="${img.url}"></img>`).join("")
    gallery.innerHTML = strHTML
}

function onGalleryClicked() { //in nav
    onBurgerMenu(document.querySelector('.burger-menu'))
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.gallery').style.display = ''
    document.querySelector('.saved-memes').style.display = 'none'
}

function onClickedImg(id) {    //in the gallery
    memeEditor.style.display = ''
    gallery.style.display = 'none'
    savedMemesGallery.style.display = 'none'
    createGMeme(id)      // create the gMeme
    changeCanvasSize()
}

//RENDER MEME IMG AND TEXT------------------------------

function renderMeme() {   //renders the curr meme in the canvas
    return new Promise(resolve => {
        const meme = getMeme()
        console.log('meme:',meme)
        const img = new Image()
        img.src = meme.imgUrl

        if (!meme.lines.length) {
            addText()
        }

        document.querySelector('#memeTextInput').value = meme.lines[meme.selectedLineIdx].txt
        document.querySelector('#fontFamily').value = meme.lines[meme.selectedLineIdx].fontFamily

        img.onload = () => {
            gElCanvas.height = (img.naturalHeight / img.naturalWidth) * (gElCanvas.width)
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
            meme.lines.forEach((line, idx) => drawText({ idx, ...line }))
            resolve()
        }
    })
}

function drawText({ idx, txt, size, color, rectColor, fontFamily, txtAlign, relativeX, relativeY }) {
    const x = gElCanvas.width * relativeX
    const y = gElCanvas.height * relativeY

    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFamily}`
    gCtx.textAlign = txtAlign
    gCtx.strokeStyle = 'black'
    gCtx.textBaseline = 'top'
    gCtx.lineJoin = 'round'
    gCtx.setLineDash([])
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    if (idx === getMeme().selectedLineIdx && !downloading) {
        const textWidth = gCtx.measureText(txt).width
        var rectX = x
        if (txtAlign === 'center') rectX = x - textWidth / 2
        else if (txtAlign === 'right') rectX = x - textWidth
        var rectY = y
        gCtx.strokeStyle = rectColor
        gCtx.lineWidth = 3
        gCtx.setLineDash([10, 5])
        gCtx.strokeRect(rectX - 5, rectY - 5, textWidth + 10, size + 10)
        getMeme().lines[idx].rectPos = { x: rectX - 5, y: rectY - 5, x2: rectX - 5 + textWidth + 10, y2: rectY - 5 + size + 10 }
    }
}

//USER SAVED MEMES------------------------------

function onUserGallery() {
    onBurgerMenu(document.querySelector('.burger-menu'))

    memeEditor.style.display = 'none'
    gallery.style.display = 'none'
    savedMemesGallery.style.display = ''

    var savedMemes = loadFromStorage(KEY)
    renderSavedMemes(savedMemes)
    if (savedMemes.length) {
        savedMemesGallery.classList.add('no-msg')
    } else {
        savedMemesGallery.classList.remove('no-msg')
        savedMemesGallery.innerHTML = `<h1 class="no-memes-msg">No saved memes here...</h1>`
    }
}

function renderSavedMemes(memeArr) {
    var strHTML = memeArr.map((meme, idx) => `
    <div class="img-container">
    <img onclick="onClickedSaveMeme(${idx})" class="gallery-img" src="${meme.url}">
    <button class="img-btn" onclick="onDeleteMeme(${idx})">✖</button></img>
    </div>
    `).join("")
    document.querySelector('.saved-memes').innerHTML = strHTML
}

function onClickedSaveMeme(idx) {
    memeEditor.style.display = ''
    gallery.style.display = 'none'
    savedMemesGallery.style.display = 'none'
    const savedMemes = loadFromStorage(KEY)
    console.log('id,savedMemes:', idx, savedMemes)
    gMeme = savedMemes[idx].gMeme
    changeCanvasSize()
}

function onDeleteMeme(idx) {
    let savedMemes = loadFromStorage(KEY)
    console.log('savedMemes:', savedMemes)
    savedMemes.splice(idx, 1)
    reSaveToStorage(KEY, savedMemes)
    onUserGallery()
}

//CANVAS mouse EVENTS

function onMouseDown(ev) {
    canvasClicked(ev)
}

function onMouseMove(ev) {
    if (!isGrabing) return
    mouseMove(ev)
}

function onMouseUp() {
    if (isGrabing === false) return
    isGrabing = false
    document.body.style.cursor = 'default'
    mouseUp()
}

// SAVE & DOWNLOAD & SHARE & UPLOAD 

function onSaveClientMeme() {
    saveClientMeme()
}

async function onDownloadCanvas() {
    downloading = true
    await renderMeme()
    const link = document.createElement("a")
    const url = gElCanvas.toDataURL()
    link.href = url
    link.download = 'image'
    link.click()
    downloading = false
    renderMeme()
}

async function onFacebookShare() {
    try {
        const url = await uploadImg()
        shareToFacebook(url)
    } catch (err) {
        alert(err)
    }
}

function shareToFacebook(imageUrl) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`
    window.open(shareUrl, "_blank", "width=600,height=500")
}

async function uploadImg() {
    downloading = true
    await renderMeme()

    const url = gElCanvas.toDataURL("image/jpeg")
    const apiUrl = "https://api.cloudinary.com/v1_1/dlmqcvdud/image/upload"
    const preset = "memeGenerator"


    const formData = new FormData()
    formData.append("file", url)
    formData.append("upload_preset", preset)

    const res = await fetch(apiUrl, {
        method: "POST",
        body: formData
    })
    downloading = false
    renderMeme()

    const data = await res.json()
    return data.secure_url
}

// EDIT-BTNS

function onMoveLine(direction) {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    if (direction === 'up') currLine.relativeY = (currLine.relativeY * gElCanvas.height - moveStep) / gElCanvas.height
    else currLine.relativeY = (currLine.relativeY * gElCanvas.height + moveStep) / gElCanvas.height

    renderMeme()
}

function onTextChanged(txt) {
    changeText(txt)
    renderMeme()
}

function onDeleteLine() {
    getMeme().lines.splice(getMeme().selectedLineIdx, 1)
    getMeme().selectedLineIdx = 0
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

function onChangeLine() {
    changeLineIdx()
    renderMeme()
}

function onAddText() {
    addText()
    renderMeme()
}

function onAddText() {
    addText()
}

function onFontFamily(value) {
    getMeme().lines[getMeme().selectedLineIdx].fontFamily = value
    renderMeme()
}

function onColorBtn() {
    document.querySelector('.inputColorText').click()
}

function onChangedColor(value) {
    getMeme().lines[getMeme().selectedLineIdx].color = value
    renderMeme()
}

//burgerMenu

function onBurgerMenu(button) {
    const nav = document.querySelector('.main-nav')
    if (nav.classList.contains('active')) {
        nav.classList.replace('active', 'not-active')
    } else {
        nav.classList.replace('not-active', 'active')
    }
    button.textContent = nav.classList.contains('active') ? '✖' : '☰'
}