

const express = require('express')
const { getCountryFromIp } = require('./util/getCountryFromIp.js')
const app = express();
const path = require('path')

const {connectToDb}  = require("./mongo-db-connection/mongoConnection.js")

const { Request } = require('./models/request.js');




connectToDb()



let country =''

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname , "/views") )


// const publicDirPath = path.join(process.cwd(), "public");

// app.use(express.static(publicDirPath));

app.get("/", async (req, res) => {
  // res.sendFile(`${publicDirPath}/index.html`)

  console.log(getCountryFromIp);


 
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

 
   
  
    

    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
      ip = "103.41.26.223";
    }

    try {
      console.log("This is incoming ip" , ip)

      const parsedIP = ip.split(",")

      ip = parsedIP[0]



      const countryInfo = await getCountryFromIp(ip);
      const country = countryInfo ? countryInfo.country : "Wrong IP";
      console.log("The country is ", country , ip)

      const existingRequest = await Request.findOne({ ipAddress: ip });
      if (!existingRequest && country !=="Wrong IP") {
 
        const newRequest = await new Request({ ipAddress: ip, country: country });
        await newRequest.save();
        console.log(newRequest);
      } else {
        console.log(`${country}`);
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }
  

  res.render("index");
});



app.get("/contact", (req, res) => {
  res.sendFile(`${publicDirPath}/contact.html`);
});


app.get("/visitors", async (req, res) => {

  const data = await Request.find({})

  const countryCounts = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});

  console.log(countryCounts)


  res.render('visitors' , {countryCounts})
});





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
