const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Sonia:NQMkc2k9E5M61K9U@cluster0.gqpmkzw.mongodb.net/Contact_Book?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
