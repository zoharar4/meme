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
    { id: 18, url: "images/meme-imgs-2/18.jpg", keywords: ['funny', 'cat'] },
    { id: 17, url: "images/meme-square/17.jpg", keywords: ['funny', 'cat'] },
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

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    imgUrl: "images/meme-square/7.jpg", //temporery
    lines: [
        getLine()
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgsArray() {
    return gImgs
}

function getMeme() {
    return gMeme
}

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
    console.log('gMeme:', gMeme)
}

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function fontSize(action) {
    if (action === 'increase') gMeme.lines[gMeme.selectedLineIdx].size += fontSizeStep
    else gMeme.lines[gMeme.selectedLineIdx].size -= fontSizeStep
}

function alignText(direction) {
    var xPos = gElCanvas.width / 2
    if (direction === 'left') xPos = 5
    else if (direction === 'right') xPos = gElCanvas.width - 5

    gMeme.lines[gMeme.selectedLineIdx].x = xPos
    gMeme.lines[gMeme.selectedLineIdx].txtAlign = direction
}

function changeLineIdx() {
    const currLineIdx = gMeme.selectedLineIdx
    const linesLength = gMeme.lines.length

    if (linesLength <= 1) return
    if (linesLength === (currLineIdx + 1)) {
        console.log('1:', 1)
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
        size: 40,
        color: 'white',
        fontFamily: 'impact',
        txtAlign: 'center',
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 5,
    }
}