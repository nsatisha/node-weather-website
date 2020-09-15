const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const { response, request } = require('express')
const express = require('express')
const { constants } = require('buffer')

console.log('Javascript file src file')


const app = express()
const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log('Network: Server is up and listening on port '+port)
})

console.log(__dirname)
//console.log(__filename)
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(viewsDir)


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDir);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


//commented below line as we are using the app.use() for using the public index.html file
 app.get('',(request,response)=>{
     response.render('index',{
         title: 'Weather page',
         name: 'Created By Satish Ningappa',
         footerName: 'Copyright @ 2020'
     })
 })

 app.get('/help',(request,response)=>{
     response.render('help',{
         title:'Help page',
         description: 'Weather is driven by air pressure, temperature, and moisture differences between one place and another'+
         'Weather is the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy.'+
         'On Earth, most weather phenomena occur in the lowest level of the planet\'s atmosphere, the troposphere, just below the stratosphere.'+
         'Weather refers to day-to-day temperature and precipitation activity, whereas climate is the term for the averaging of atmospheric conditions over longer periods of time.',
         footerName: 'Copyright @ 2020'
     })
 })

 app.get('/about',(request,response)=>{
     response.render('about',{
         title: 'About Page',
         name : 'Created by Satish Ningappa',
         footerName: 'Copyright @ 2020'

     })
 })

app.get('/weather',(request,response)=>{
    console.log("app.js weather/address")
    if(!request.query.address){
        return response.render('404',{
            title: 'Weather Page',
            errorMessage:'Provide correct location!',
            name : 'Created by Satish Ningappa',
            footerName: 'Copyright @ 2020'
        })
    }
    geocode(request.query.address,(error,geodata)=>{
        console.log(request.query.address)
        if(error){
            return response.send({
                errorMessage:'Error: Cannot retreive weather data'
            })
        }
        console.log(geodata.latitude +' : ' +geodata.longitude);
        weather(geodata.longitude,geodata.latitude,(error,weatherdata)=>{
            if(error){
                return response.send({
                    errorMessage:'Error: Cannot retreive weather data'
                })
            }
            response.send(weatherdata={
                title: 'Weather page',
                forecast:weatherdata.forecast,
                location: geodata.place,
                geography:geodata.latitude +' : ' +geodata.longitude,
                temperature: weatherdata.temperature,
                feelslike: weatherdata.feelsLike,
                footerName: 'Copyright @ 2020'
            })
        })
        

    })
    
})

app.get('/weat',(request,response)=>{
    console.log("app.js weather/address22222")
    response.render('weather',{
        title: 'Weather Page',
        name : 'Created by Satish Ningappa',
        footerName: 'Copyright @ 2020'

    })
})


app.get('/*',(request,response)=>{
    response.render('404',{
        title: '404 Page',
        errorMessage:'404: Page Not Found !',
        name : 'Created by Satish Ningappa',
        footerName: 'Copyright @ 2020'

    })
})

