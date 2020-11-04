

console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weatherImg = document.querySelector('#weather-icon')

messageOne.textContent = 'from javascript'

// Goal: Render content to paragraphs

// 1. Select the second message p from JavaScript
// 2. Just before fetch, render loading message for first paragraph and set second to empty
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work, Search for errors and for valid locations

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    const location = weatherForm.elements['location'].value

    //Uses localhost if we're running on localhost, otherwise use the address being used
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = ''
            messageTwo.textContent = data.error
        }
        else {
            const img = document.createElement('img')
            img.classList.add('weather-image')
            img.src = data.imgAddress
            messageOne.textContent = data.location
            messageOne.appendChild(img)
            messageTwo.textContent = data.forecast
            //weatherImg.src = data.imgAddress
        }    
    })
})

    console.log(location)
})



// Goal: Use input value to get the weather

// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3, Submit the form with a valid and invalid value to test