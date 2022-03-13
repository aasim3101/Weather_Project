const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const unit = "metric";
  const appKey = "17f1b654a5ec35134c6bffd723a594db";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit +"&q=" + query +"&appid=" + appKey;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const description = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temp in " +query+ " is " + temp + " degrees celcius.</h1>");
      res.write("<img src=" +imgURL+ ">")
      res.send();
    })
  })
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})
