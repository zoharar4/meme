var gImgs = [
    { id: 1, url: "images/meme-square/1.jpg", keywords: ['funny', 'trump'] },
    { id: 2, url: "images/meme-square/2.jpg", keywords: ['funny', 'animal'] },
    { id: 3, url: "images/meme-square/3.jpg", keywords: ['baby', 'cat'] },
    { id: 4, url: "images/meme-square/4.jpg", keywords: ['funny', 'cat'] },
    { id: 5, url: "images/meme-square/5.jpg", keywords: ['funny', 'cat'] },
    { id: 6, url: "images/meme-square/6.jpg", keywords: ['funny', 'cat'] },
    { id: 7, url: "images/meme-square/18.jpg", keywords: ['funny', 'cat'] },
    { id: 8, url: "images/meme-square/8.jpg", keywords: ['funny', 'cat'] },
    { id: 9, url: "images/meme-square/9.jpg", keywords: ['funny', 'cat'] },
    { id: 10, url: "images/meme-square/10.jpg", keywords: ['funny', 'cat'] },
    { id: 11, url: "images/meme-square/11.jpg", keywords: ['funny', 'cat'] },
    { id: 12, url: "images/meme-square/12.jpg", keywords: ['funny', 'cat'] },
    { id: 13, url: "images/meme-square/13.jpg", keywords: ['funny', 'cat'] },
    { id: 14, url: "images/meme-square/14.jpg", keywords: ['funny', 'cat'] },
    { id: 15, url: "images/meme-square/15.jpg", keywords: ['funny', 'cat'] },
    { id: 16, url: "images/meme-square/16.jpg", keywords: ['funny', 'cat'] },
    { id: 17, url: "images/meme-square/17.jpg", keywords: ['funny', 'cat'] },
    { id: 18, url: "images/meme-imgs-2/18.jpg", keywords: ['funny', 'cat'] },
    { id: 19, url: "images/meme-imgs-2/1.jpg", keywords: ['funny', 'trump'] },
    { id: 20, url: "images/meme-imgs-2/2.jpg", keywords: ['funny', 'animal'] },
    { id: 21, url: "images/meme-imgs-2/3.jpg", keywords: ['baby', 'cat'] },
    { id: 22, url: "images/meme-imgs-2/4.jpg", keywords: ['funny', 'cat'] },
    { id: 23, url: "images/meme-imgs-2/5.jpg", keywords: ['funny', 'cat'] },
    { id: 24, url: "images/meme-imgs-2/6.jpg", keywords: ['funny', 'cat'] },
    { id: 25, url: "images/meme-imgs-2/8.jpg", keywords: ['funny', 'cat'] },
    { id: 26, url: "images/meme-imgs-2/9.jpg", keywords: ['funny', 'cat'] },
    { id: 27, url: "images/meme-imgs-2/10.jpg", keywords: ['funny', 'cat'] },
    { id: 28, url: "images/meme-imgs-2/11.jpg", keywords: ['funny', 'cat'] },
    { id: 29, url: "images/meme-imgs-2/12.jpg", keywords: ['funny', 'cat'] },
    { id: 30, url: "images/meme-imgs-2/13.jpg", keywords: ['funny', 'cat'] },
    { id: 31, url: "images/meme-imgs-2/14.jpg", keywords: ['funny', 'cat'] },
    { id: 32, url: "images/meme-imgs-2/15.jpg", keywords: ['funny', 'cat'] },
    { id: 33, url: "images/meme-imgs-2/16.jpg", keywords: ['funny', 'cat'] },
    { id: 34, url: "images/meme-imgs-2/17.jpg", keywords: ['funny', 'cat'] },
]

var gMeme = {}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgsArray() {
    return gImgs
}

function getMeme() {
    return gMeme
}
// asdasd
function createGMeme(id) {  //creates the gMeme with default values when img clicked 
    var currImg = gImgs.find(img => img.id === id)
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        imgUrl: currImg.url,
        lines: [
            getLine()
        ]
    }
}

function canvasClicked(ev) {
    const rect = gElCanvas.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const lineIdx = gMeme.lines.findIndex(line => {
        if (x > line.rectPos.x && x < line.rectPos.x2) {
            if (y > line.rectPos.y && y < line.rectPos.y2) {
                return true
            }
        }
    })

    if (lineIdx >= 0) {
        gMeme.selectedLineIdx = lineIdx
        renderMeme()
        isGrabing = true
        document.body.style.cursor = 'grabbing'
    }
}

function mouseMove(ev) {
    const rect = gElCanvas.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.txtAlign = 'center'
    currLine.relativeX = x / gElCanvas.width
    currLine.relativeY = y / gElCanvas.height
    currLine.rectColor = 'red'
    renderMeme()
}

function mouseUp() {
    gMeme.lines[gMeme.selectedLineIdx].rectColor = 'black'
    renderMeme()
}

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function fontSize(action) {
    if (action === 'increase') gMeme.lines[gMeme.selectedLineIdx].size += fontSizeStep
    else gMeme.lines[gMeme.selectedLineIdx].size -= fontSizeStep
}

function alignText(direction) {
    var xPos = 0.5
    if (direction === 'left') xPos = 10 / gElCanvas.width
    else if (direction === 'right') xPos = gElCanvas.width / (gElCanvas.width + 10)

    gMeme.lines[gMeme.selectedLineIdx].relativeX = xPos
    gMeme.lines[gMeme.selectedLineIdx].txtAlign = direction
}

function changeLineIdx() {
    const currLineIdx = gMeme.selectedLineIdx
    const linesLength = gMeme.lines.length

    if (linesLength <= 1) return
    if (linesLength === (currLineIdx + 1)) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx += 1
    }
}

function addText() {
    const newText = getLine()
    gMeme.lines.push(newText)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

function getLine() {
    return {
        txt: 'text',
        size: gMeme?.lines?.[gMeme.selectedLineIdx]?.size ?? 40,
        color: gMeme?.lines?.[gMeme.selectedLineIdx]?.color ?? 'white',
        rectColor: 'black',
        fontFamily:gMeme?.lines?.[gMeme.selectedLineIdx]?.fontFamily ?? 'impact',
        txtAlign: 'center',
        relativeX: 0.5,
        relativeY: 0.2,
    }
}

async function saveClientMeme() {
    const url = await uploadImg()
    saveToStorage(KEY,{gMeme,url})
}

function shuffleImgs() {
    gImgs.sort(() => Math.random() - 0.5)
}