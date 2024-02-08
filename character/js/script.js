const $ = document
const faceBtn = $.querySelector('#face-btn') // null
const colorBtn = $.querySelector('#color-btn')
const hornsBtn = $.querySelector('#horns-btn')
const tailBtn = $.querySelector('#tail-btn')

let docRoot = $.querySelector(':root')


let bodyColors = [
  "#a8d530",
  "#42aaff",
  "#f3d55b",
  "#ff4f51",
  "#904ae8",
  "#ffa711",
];

let colors = [...bodyColors, 'transparent']

// let [faceCounter, colorCounter, hornsCounter, tailCounter] = [0, 0, 0, 0]
let [faceCounter, colorCounter, hornsCounter, tailCounter] = Array(4).fill(0)

const setCounter = (counter, length) => {
    return counter < length - 1 ? counter + 1 : 0
}

faceBtn.addEventListener('click', () => {
    faceCounter = setCounter(faceCounter, 6)
    $.getElementById('face').setAttribute('src', `images/face-${faceCounter}.png`)
})

colorBtn.addEventListener('click', () => {
    colorCounter = setCounter(colorCounter, bodyColors.length)
    docRoot.style.setProperty('--color-character', bodyColors[colorCounter])
})

hornsBtn.addEventListener('click', () => {
    hornsCounter = setCounter(hornsCounter, colors.length)
    docRoot.style.setProperty('--color-horns', colors[hornsCounter])
})

tailBtn.addEventListener('click', () => {
    tailCounter = setCounter(tailCounter, colors.length)
    docRoot.style.setProperty('--color-tail', colors[tailCounter])
})
