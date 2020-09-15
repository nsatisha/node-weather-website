console.log('Javascript file')

const weatherform = document.querySelector('form')
const locationSearch = document.querySelector('input')
const result = document.getElementsByClassName('.result-content');
const error = document.getElementsByClassName('.error-content');
console.log(result);
var errorcondition=''

/* <p id="forecast"></p>
<p id="location"></p>
<p id="geography"></p>
<p id="temperature"></p>
<p id="feels"></p> */

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loc = locationSearch.value
    console.log(loc)
    forecast.textContent = 'Loading...';
    
    fetch('/weather?address='+loc)
    .then( res => res.json())
    .then(data =>{
        if(data.errorMessage){
            console.log(data.errorMessage);
            forecast.textContent = data.errorMessage;
        }else{
            forecast.textContent = data.forecast+ ' Location is ' +data.location+" \n "+'Temperature is  '+data.temperature+ ' But feels like'+data.feelslike;
        }
    })
    document.getElementsByClassName('result-content')[0].style.display="block"

})

