const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})

// const express = require('express');
// const bodyParser = require('body-parser');

// const userRoute = require('./routes/user');

// const cors = require("cors")

// const corsOptions ={
// 	origin:'*', 
// 	credentials:true,            //access-control-allow-credentials:true
// 	optionSuccessStatus:200,
//  }

 
//  const app = express();
 
//  app.use(bodyParser.json());
//  app.use(cors(corsOptions))

// app.use("/user", userRoute);

// exports.novus=app;


// gcloud functions deploy gcp-func-novus --entry-point novus --runtime nodejs16 --trigger-http --project lofty-seer-386909