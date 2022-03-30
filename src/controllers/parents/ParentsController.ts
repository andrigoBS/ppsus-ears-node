import {Request, Response, Router} from 'express'
import {HttpStatus} from "../../helpers/HttpStatus";
import LoginHelper from "../../helpers/LoginHelper";
import jwt from "jsonwebtoken";
import {JwtAuth} from "../../middleware/JwtAuth";

export default class SecretaryController{
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.createLoginRoute()
    }

    private createLoginRoute(): void {
        this.router.post('/login', async (req: Request, res: Response, next: Function) => {
            /*
                #swagger.tags = ['Parents']
                #swagger.description = 'Endpoint para logar um usuario pai'
                #swagger.security = [{
                    "basicApiKeyAuth": []
                }
            */

            try{
                const {login, password} = LoginHelper.basicAuthToObj(req.headers['authorization'])

                return res.status(HttpStatus.OK).send({message: 'respond with a resource'})
            }catch (e: any){
                return res.status(HttpStatus.BAD_REQUEST).send({message: e.message})
            }
        })
    }

    public getRouter(): Router{
        return this.router
    }
}
