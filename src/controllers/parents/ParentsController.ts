import {Request, Response} from 'express'
import {HttpStatus} from "../../helpers/HttpStatus";
import LoginHelper from "../../helpers/LoginHelper";
import AbstractController from "../AbstractController";

export default class ParentsController extends AbstractController {

    constructor() {
        super()
        const {login} = this
        const router = this.getRouter()
        router.post('/login', login)
    }

    private login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Parents']
            #swagger.description = 'Endpoint para logar um usuario pai'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        try{
            const {login, password} = LoginHelper.basicAuthToObj(req.headers['authorization'])

            return res.status(HttpStatus.OK).send({message: 'respond with a resource', login, password})
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).send({message: e.message})
        }
    }

}
