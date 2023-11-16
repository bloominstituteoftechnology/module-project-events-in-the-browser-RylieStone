// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (evt) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        getAllSquares().forEach(square => {square.classList.remove("targeted")})
        evt.currentTarget.classList.add("targeted")
        
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    let target = document.querySelector(".targeted")
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if (evt.key === keys.up) {
        if (target.parentElement.previousElementSibling !== null) {
        target.classList.remove("targeted")
        let idx = Array.from(target.parentElement.children).indexOf(target)
        target.parentElement.previousElementSibling.children[idx].classList.add("targeted") // problem here with selecting child
      }
    }
    if (evt.key === keys.down) {
      if (target.parentElement.nextElementSibling !== null) {
        target.classList.remove("targeted")
        let idx = Array.from(target.parentElement.children).indexOf(target)
        target.parentElement.nextElementSibling.children[idx].classList.add("targeted") // persist here
      }
    }
    if (evt.key === keys.left) {
      if (target.previousElementSibling !== null) {
      target.classList.remove("targeted")
      target.previousElementSibling.classList.add("targeted")
      }
    }
    if (evt.key === keys.right) {
      if (target.nextElementSibling !== null) {
      target.classList.remove("targeted")
      target.nextElementSibling.classList.add("targeted")
      }
    }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space) {
      if (target.firstChild !== null) {
        target.firstChild.dataset.status = 'dead'
        target.style.backgroundColor = "red"
      }
    }
    // 👉 TASK 5 - End the game 👈
    if (document.querySelectorAll('img[data-status="alive"]').length < 1) {
      document.querySelector(".info").textContent = `Extermination completed in ${getTimeElapsed() / 1000} seconds`
      let endButton = document.createElement("button")
      endButton.textContent = "Restart Minigame"
      endButton.addEventListener("click", function() {location.reload()})
      document.querySelector("h2").appendChild(endButton)

    }

  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
