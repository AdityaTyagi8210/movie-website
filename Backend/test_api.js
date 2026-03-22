const axios = require("axios");
require("dotenv").config();
async function test() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=Avatar`;
    console.log("URL:", url);
    const response = await axios.get(url);
    console.log("SUCCESS:", response.data.Response);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}
test();
