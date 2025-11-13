var gImgs = [
    { id: 1, url: "images/meme-square/1.jpg", keywords: ['funny', 'trump'] },
    { id: 2, url: "images/meme-square/2.jpg", keywords: ['funny', 'animal'] },
    { id: 3, url: "images/meme-square/3.jpg", keywords: ['baby', 'cat'] },
    { id: 4, url: "images/meme-square/4.jpg", keywords: ['funny', 'cat'] },
    { id: 5, url: "images/meme-square/5.jpg", keywords: ['funny', 'cat'] },
    { id: 6, url: "images/meme-square/6.jpg", keywords: ['funny', 'cat'] },
    { id: 7, url: "images/meme-square/7.jpg", keywords: ['funny', 'cat'] },

]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    imgUrl: "/images/meme-square/7.jpg", //temporery
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 60,
            color: 'rgb(30,100,50)',
            fontFamily: 'impact',
            txtAlign: 'center',
            x: 300,
            y: 300,
        },
        {
            txt: 'I hhhhhhhhhsometimes eat Falafel',
            size: 30,
            color: 'rgb(30,100,50)',
            fontFamily: 'impact',
            txtAlign: 'center',
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2,
        }
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
            {
                txt: 'some text',
                size: 30,
                color: 'rgb(30,100,50)',
                fontFamily: 'impact',
                txtAlign: 'center',
                x: gElCanvas.width / 2,
                y: gElCanvas.height / 2,
            },
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
    var xPos = gElCanvas.width/2
    if (direction === 'left') xPos = 5
    else if (direction === 'right') xPos = gElCanvas.width - 5

    gMeme.lines[gMeme.selectedLineIdx].x = xPos
    gMeme.lines[gMeme.selectedLineIdx].txtAlign = direction
}