import { User } from '../entities/User';
import { UpdateResult } from 'typeorm';
import { Profile } from '../entities/Profile';
import appDataSource from '../config/Conn';
import { UserType,ProfileType } from '../constant/User';
const userRepo = appDataSource.getRepository(User);
const profileRepo = appDataSource.getRepository(Profile)

const  UserController = {

  async store(req: any, res: any) {
    const { name, email, password, address, phone }: UserType & ProfileType = req.body;
  
    const profile = new Profile();
    profile.address = address;
    profile.phone = phone;
  
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.profile = profile;
  
    await userRepo.save(user);
  
    return res.status(201).send('User created successfully');
  }
  ,  

    async show (req:any,res:any){
        try {
            const allRecords = await userRepo.find();
            return res.json(allRecords);
          } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
          }
    },

    async update(req:any,res:any){
        const { name, email, password }: UserType = req.body;
        const { id } = req.params;
      
        try {
          const updateResult: UpdateResult = await userRepo.update(id, { name, email, password });
      
          if (updateResult.affected === 0) {
            return res.status(404).json({ error: "User not found" });
          }
      
          return res.json({ message: "User updated successfully" });
        } catch (error) {
          return res.status(500).json({ error: "Failed to update user" });
        }
    },

    async delete(req:any, res:any){
        const { id } = req.params;

        try {
          const dltData = await userRepo.delete(id);
          if (dltData) {
            return res.json({ message: `${id} has been deleted` });
          }
        } catch (error) {
          return res.json(error);
        }
      
    }
}


export default UserController;