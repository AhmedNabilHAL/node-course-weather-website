fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

// messageOne.textContent = "From jS"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    const url = "http://localhost:3000/weather?address=" + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error; messageTwo.textContent = "";
            }
            else{
                messageOne.textContent = data.location;
                const msg = "The weather is currently " + 
                data.forecastData.describtion + ", The temprature is " +
                data.forecastData.temperature + ", but it feels like " + 
                data.forecastData.feelslike + ".";
                messageTwo.textContent = msg;
            }
        })
    })
})