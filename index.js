const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

port = process.env.PORT;
uri = process.env.URI_DBLOCAL;

app.use(morgan("dev"));

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor OK en puerto ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`conectado la bd ${uri}`))
  .catch((err) => console.error(err));

// Routes
app.use(require("./routes/media"));
app.use(require("./routes/game"));
app.use(require("./routes/standings"));
app.use(require("./routes/imageCloudinary"));
app.use(require("./routes/game-definition"));
app.use(require("./routes/team"));
