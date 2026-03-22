require('dotenv').config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const cookieparser = require('cookie-parser');
app.use(cookieparser());

connectDB();

app.listen(3000, () => {    
    console.log("Server is running on port 3000");
})