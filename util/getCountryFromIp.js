



const geoip = require("geoip-lite")

 async function getCountryFromIp(ip){

  return await geoip.lookup(ip);


}



module.exports = { getCountryFromIp}