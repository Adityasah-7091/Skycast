const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weather");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on port ${process.env.PORT}`
    );
});