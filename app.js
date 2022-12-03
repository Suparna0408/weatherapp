//Gets the input and button showdata elements
let city = document.querySelector(".city");
let btn = document.querySelector(".submit");
let showCity = document.querySelector(".showCity");
let showTemp = document.querySelector(".showTemp");
let showClimate = document.querySelector(".showClimate");
let dataContainer = document.querySelector(".dataContainer");

dataContainer.style.display = "none";

city.addEventListener("keyup", (Event)=>{
    if(Event.keyCode == 13){
        // alert("Enter was pressed.")
        getdata();
    }
})




btn.addEventListener('click', () =>{
    getdata();
});

function getdata(){
        let cityName = city.value;
        let key = "d925ccfc61a5c5b1ccb40153794477bb";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dataContainer.style.display = "flex";
    
    
            if(data.cod != 404){
            //disappear the city input after getting the weather data
            city.value = " ";
            showCity.innerHTML = `${data.name}`;
            showTemp.innerHTML = `${(data.main.temp - 273.15).toFixed(2)}&deg C`;
            showClimate.innerHTML = `${data.weather[0].description}`;
            }
            else{
                let flex = document.querySelector(".flex");
                let notFound = document.createElement("div");
                notFound.innerHTML = `${data.name} is not a city name`;
                flex.appendChild(notFound);
                setTimeout(()=>{
                    notFound.innerHTML = `Please check the spelling or enter a valid city name`;
                    flex.appendChild(notFound);
                }, 2000);
            }
        })
}