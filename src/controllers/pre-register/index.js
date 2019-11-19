const routes = require("express").Router();
const PreRegister = require("../../models/pre-register");
const { validateEmail, validatePhone } = require("../../utils/validators");

routes.get("/", async (req, res) => {
  const preRegisters = await PreRegister.find({});

  return res.send({ preRegisters });
});

routes.post("/add", async (req, res) => {
  try {
    const { email, phone, name } = req.body;
    
    if (!phone)
      return res.status(400).send({ error: "Phone number not provided" });
    if (!name) return res.status(400).send({ error: "Name not provided" });
    if (!validateEmail(email) && email)
      return res.status(400).send({ error: "Invalid email" });
    if (!validatePhone(phone) && phone)
      return res.status(400).send({ error: "Invalid phone number" });
    const preRegister = await PreRegister.create({ name, email, text });
    return res.status(200).send(preRegister);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

module.exports = app => app.use("/pre-register", routes);
