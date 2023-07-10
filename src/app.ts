import "reflect-metadata"
import express,{ Request, Response } from 'express';
import dotenv from 'dotenv';
import {DataSource,UpdateResult} from 'typeorm'
import { User } from "./entities/User";
import bodyParser from "body-parser";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())


const appDataSource = new DataSource({
    type:"postgres",
    host:process.env.POSTGRES_HOST,
    username:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    port:5432,
    entities:['src/entities/*{.ts,.js}'],
    synchronize:true,
    logging:true
})
const port = process.env.APP_PORT || 8000 ;


const userRepo = appDataSource.getRepository(User);
app.get("/",async (req:Request,res:Response) =>{
    const allRecords = await userRepo.find();
    res.json(allRecords)
})
app.post("/create",async (req:Request,res:Response) =>{
    const {name,email,password} = req.body;
    const createRecord = await userRepo.create({name,email,password});
    await userRepo.save(createRecord);
    return res.status(201).send('user created successfully')
});


app.put("/:id", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
  
    try {
      const updateResult: UpdateResult = await userRepo.update(id, { name, email, password });
  
      if (updateResult.affected === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

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
