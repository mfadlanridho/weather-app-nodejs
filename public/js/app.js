console.log('Client side javascript is loaded!')

// fetch('http://127.0.0.1:3000/weather?address=boston').then((response) => {
//   response.json().then((data) => {
//     if (data.error)
//       return console.log(data.error)

//     console.log(data.location)
//     console.log(data.forecast)
//   })
// })

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  messageOne.textContent = 'Loading...'
  e.preventDefault()

  const location = searchInput.value
  fetch(`http://127.0.0.1:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) return messageOne.textContent = data.error

      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
})