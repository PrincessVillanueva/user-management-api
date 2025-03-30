import database from "./src/database";
import app from "./src";

database
  .initialize()
  .then(() => {
    console.log("Database connected...");

    app.listen(3000, (err) => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });