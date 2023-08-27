import express,{ Request,Response} from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

class App { 
    public express : express.Application;
    private prisma = new PrismaClient();

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares (){
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes() {
        this.express.get('/', async (req : Request, res : Response) => {
            // return res.send('It is working!');
            // res.json(this.databaseActions());
            res.json(await this.databaseSelectAll());
        });

        this.express.post('/', async (req : Request ,res : Response) => {
            res.json( await this.databaseInsert(req));
        });
    }

    private async databaseSelectAll() {
        const allUsers = await this.prisma.user.findMany({orderBy:[ {id: 'desc'}]});
        console.log(allUsers);
        await this.databaseDisconnect();

        return allUsers;
    }

    private async databaseInsert(req: Request) {
        const newUser = await this.prisma.user.create({
            data: {
                name: req.body.name,
                fullName: req.body.fullName
            }
        });

        return newUser;
    }

    private async databaseDisconnect(){
        try {
            await this.prisma.$disconnect;
        }catch(err){
            console.log(err);
            await this.prisma.$disconnect;
            process.exit(1);
        }
    }
}

export default new App().express;