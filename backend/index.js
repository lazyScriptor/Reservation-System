import express from 'express'
import userRoute from './routes/User.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user',userRoute);

app.listen(3005, () => {
  console.log("Server starts on port 3005");
});
