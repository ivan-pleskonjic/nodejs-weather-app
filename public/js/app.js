const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault() // prevent form from refreshing the browser after submit
  const location = search.value
  message1.textContent = 'Loading...'
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error
        message1.textContent = ''
        return
      }
      message1.textContent = data.location
      message2.textContent = data.forecast
    })
  })
})