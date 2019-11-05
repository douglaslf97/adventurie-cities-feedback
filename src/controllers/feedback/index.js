const routes = require("express").Router();
const Feedbacks = require("../../models/feedbacks");
const validatorEmail = require("../../utils/validators");

routes.get("/", async (req, res) => {
  const feedbacks = await Feedbacks.find({});

  return res.send({ feedbacks });
});

routes.post("/add", async (req, res) => {
  try {
    const { email, text, name } = req.body;

    if (!email) return res.status(400).send({ error: "Email not provided" });
    if (!text) return res.status(400).send({ error: "Text not provided" });
    if (!name) return res.status(400).send({ error: "Name not provided" });
    if (!validatorEmail(email))
      return res.status(400).send({ error: "Invalid email" });
    const feedback = await Feedbacks.create({ name, email, text});
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

module.exports = app => app.use("/feedback", routes);
