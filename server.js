const express = require("express"); // object
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//create instance of express object
const server = express();
const PORT = process.env.PORT || 3000;

//body parser set up for data format
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//make public folder accessile
server.use(express.static("public"));

//include our routes in here
server.use("/api", apiRoutes);
server.use("/", htmlRoutes);

//listen for server start
server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})