



const geoip = require("geoip-lite")

 async function getCountryFromIp(ip){

  const country = await geoip.lookup(ip);

  

  return country


}


getCountryFromIp('15.204.86.25')


module.exports = { getCountryFromIp}