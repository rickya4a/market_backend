import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import routes from './routes';
import "@babel/polyfill";
import { db } from "./model/index";

const app = express();

app.use(urlencoded({ extended: true }));

app.use(json());

app.use(cors());

app.options('*', cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

routes(app);

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

// start server and listen on port 5500
const server = app.listen(8080, () => {
  const port = server.address().port
  console.log("app listening at ", port);
});

export default app;