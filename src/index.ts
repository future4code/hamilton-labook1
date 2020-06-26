import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";
import { friendshipRouter } from './routes/friendshipRoutes';
import { postRoutes } from './routes/postRoutes';
import { feedRoutes } from './routes/feedRoutes';
import { likeRoutes } from "./routes/likeRoutes";
import { commentRoutes } from "./routes/commentRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/friendship', friendshipRouter);
app.use('/post', postRoutes);
app.use('/feed', feedRoutes);
app.use('/like', likeRoutes);
app.use('/comment', commentRoutes);

const server = app.listen(process.env.PORT || 3000, ()=>{
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running http://localhost:${address.port}`);
    }else{
        console.error(`Failure upon starting server.`);
    };
});

function main(){

};

main();