console.log("Nasa, we in Space")
const url = "https://data.nasa.gov/resource/gvk9-iz74.json"
const button = document.querySelector("button")
const where = document.querySelector("where")
const weather = document.querySelector("weather")
function getFacility(){
  console.log("button action")
  let alldata    
  let weatherForecasts = []
  fetch(url)
    .then(res => res.json())
    .then(async data => {
      console.log(data) ; 

     alldata =  await data
      data.forEach(element => {
        console.log(`${element.city} ${element.center}${element.facility}${element.location.latitude}${element.location.longitude}`)
        const sky =  `http://api.weatherapi.com/v1/current.json?key=a95ab548de894c73b07220619213009&q=${element.city}`
      
        weatherForecasts.push(sky)
      });
    })
    
    setTimeout(function(){
      Promise.all(weatherForecasts.map(url =>
        fetch(url).then(resp => resp.json())
    )).then(data => {
      data.forEach((element,index)=>{
        let text = element.current.condition.text
        // couldnt get icons to appear because of png url not working/deprecated.
        let icon = element.current.condition.icon
        let currentdata = alldata [index]
        console.log(element.current.condition.text)
        document.querySelector('tbody') .innerHTML+= `
        <tr>
          <th scope="row">${index+1}</th>
          <td>${currentdata.facility}</td>
          <td>${currentdata.center}</td>
          <td>${currentdata.city}</td>
          <td>${text}</td>
        </tr>`
      })
    })
    },600)
}
button.addEventListener ("click", getFacility)

    