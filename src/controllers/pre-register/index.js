const routes = require("express").Router();
const PreRegister = require("../../models/pre-register");
const { validateEmail, validatePhone } = require("../../utils/validators");
const sendEmail = require('../../utils/send-email');
routes.get("/", async (req, res) => {
  const preRegisters = await PreRegister.find({});

  return res.send({ preRegisters });
});

routes.post("/add", async (req, res) => {
  try {
    const { email, phone, name } = req.body;    
    
    if (!name) return res.status(400).send({ error: "Name not provided" });
    if (!email && !phone) return res.status(400).send({ error: "Provide phone or email" });
    if (!validateEmail(email) && email)
      return res.status(400).send({ error: "Invalid email" });
    if (!validatePhone(phone) && phone)
      return res.status(400).send({ error: "Invalid phone number" });
    const emailExists = await PreRegister.findOne({email});
   
    if(emailExists && email) return res.status(400).send({ error: "Email already exists" });
    const phoneExists = await PreRegister.findOne({phone});
    if(phoneExists && phone) return res.status(400).send({ error: "Phone already exists" });
    const preRegister = await PreRegister.create({ name, email, phone });
    try{
      const id = preRegister._id;
      const { smtpTransport, mailOptions } = await sendEmail(email, name.trim().split(' ')[0], "Adventure Cities Pré-Cadastro");
      smtpTransport.sendMail(mailOptions, async (error, response)=>{
        if(error)return;
        return await PreRegister.findByIdAndUpdate(id, {
          received: true
        });
      });
    } catch(error){
    }
    return res.status(200).send(preRegister);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

module.exports = app => app.use("/pre-register", routes);
