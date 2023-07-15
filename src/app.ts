import "reflect-metadata"
import express from 'express';
import dotenv from 'dotenv';
import appDataSource from "./config/Conn";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes";
import adminRoute from "./routes/admin.routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())


// Routes
app.use("api/user",userRouter);
app.use("/api/auth",adminRoute)
const port = process.env.APP_PORT ?? 8000 ;
appDataSource.initialize()
.then(() =>{
    console.log("DB connected");
    app.listen(port,() =>{
        console.log(`server is running on ${port}`)
    })
})
.catch((err) =>{
    console.log(err)
})
