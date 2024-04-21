const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Hotel = db.hotels;

const xlsx = require("xlsx");
const workbook = xlsx.readFile("./hotels.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(worksheet);

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  User.create({
    username: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin", 8),
  }).then((user) => {
    user.setRoles([2]);
  });

  Hotel.bulkCreate(excelData)
    .then(() => {
      console.log("Hotel data inserted successfully.");
    })
    .catch((error) => {
      console.error("Failed to insert hotel data:", error);
    });
}

db.sequelize
  .sync({ force: true })
  /*для того, чтобы БД пересоздавалась, необходимо поставить .sync({ force: true})  */
  .then(() => {
    console.log("Drop and re-sync db.");
    initial(); //для отключения пересоздания БД необходимо закомментировать эту строку
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Web-service is ON" });
});

// require routes
require("./app/routes/hotel.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("running");
});
