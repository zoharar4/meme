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
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImgsArray() {
    return gImgs
}