const express = require("express");
const app = express();
const sgMail = require("@sendgrid/mail");

require('dotenv').config()
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
    res.json({ message: "Funciona" });
});

// wb get
app.get("/webhook", (req, res) => {
    res.json({ token: "tokenWebhook123" });
});

// wb post
// contraseña sendgrid diegosendgrid123
app.post("/webhook", (req, res) => {

    const peticion1 = req.body.peticion1 ? req.body.peticion1 : "";
    const peticion2 = req.body.peticion2 ? req.body.peticion2 : "";
    const peticion3 = req.body.peticion3 ? req.body.peticion3 : "";
    const peticion4 = req.body.peticion4 ? req.body.peticion4 : "";
    const peticion5 = req.body.peticion5 ? req.body.peticion5 : "";

    enviarMail(peticion1, peticion2, peticion3, peticion4, peticion5);
    
});
  
//token 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
function enviarMail(peticion1, peticion2, peticion3, peticion4, peticion5 ){

    const mensaje = peticion1 + '<br>' + peticion2 + '<br>' + peticion3 + '<br>' + peticion4 + '<br>' + peticion5
    //console.log(mensaje);

    sgMail.setApiKey(process.env.TOKEN);
    const msg = {
        to: "diegosteamnew@hotmail.com",
        from: "diegoalbarracin0@gmail.com",
        subject: "Enviado desde webhook",
        text: "a",
        html: mensaje,
    };
    sgMail.send(msg);
    //console.log(msg);
 
};
  
  // set port, listen for requests
const PORT = process.env.PORT || 3700;
app.listen(PORT, () => {
 console.log(`Server is running on port  http://localhost:${PORT}/`);
});