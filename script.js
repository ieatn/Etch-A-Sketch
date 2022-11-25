// constants
const DEFAULT_SIZE = 4
const DEFAULT_COLOR = 'black'
const DEFAULT_MODE = 'color'

// initialize current board
let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE

// initialize buttons
const grid = document.querySelector('.grid')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sliderText = document.getElementById('sliderText')
const slider = document.getElementById('slider')
const colorInput = document.getElementById('colorInput')

// add mouse holding feature for continuous drawing
// check if user is holding mouse down, if event mousedown, change boolean
let holdMouse = false
document.body.onmousedown = () => (holdMouse = true)
document.body.onmouseup = () => (holdMouse = false)

// button events 
clearBtn.onclick = () => reload()
colorBtn.onclick = () => setMode('color')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
colorInput.oninput = (e) => setColor(e.target.value)

// slider
slider.onchange = (e) => setSize(e.target.value)
slider.onmousemove = (e) => updateSlider(e.target.value)

// grid 

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}

const createGrid = (size) => {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    // creates 2 columns, and 2 squares each column
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const square = document.createElement('div')
            // if square is clicked, change color
            square.addEventListener('mousedown', changeColor)
            // if square is being hovered over, change color
            square.addEventListener('mouseover', changeColor)
            grid.appendChild(square)
        }
    }
    updateSlider(size)
}

// get element getting pressed and set it to color
const changeColor = (e) => {
    // if user is holding mouse down, change color, exit if user lets go
    if (e.type === 'mouseover' && !holdMouse) return

    if (currentMode === 'color') {
        e.target.style.background = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.background = 'white'
    } else if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        e.target.style.background = `rgb(${r}, ${g}, ${b})`
    }
    
}

// button functions 

const setMode = (mode) => {
    currentMode = mode
}
const reload = () => {
    clear()
    createGrid(currentSize)
}
const clear = () => {
    grid.innerHTML = ''
}

const setSize = (size) => {
    currentSize = size
    reload()
}
const updateSlider = (size) => {
    sliderText.textContent = `${size} x ${size}`
}

const setColor = (color) => {
    currentColor = color
}