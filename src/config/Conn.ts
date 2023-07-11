import {DataSource} from 'typeorm'
import dotenv from 'dotenv';
import {POSTGRES_HOST,POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_DATABASE} from './Connection';
dotenv.config();
const appDataSource = new DataSource({
    type:"postgres",
    host:POSTGRES_HOST,
    username:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    database:POSTGRES_DATABASE,
    port:5432,
    entities:['src/entities/*{.ts,.js}'],
    synchronize:true,
    logging:true
});


export default appDataSource;