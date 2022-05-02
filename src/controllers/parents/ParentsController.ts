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

            if (login != 'mocked' && password != 'test') {
                return res.status(HttpStatus.NOT_FOUND).send({message: 'User not found'})
            }

            return res.status(HttpStatus.OK).send({message: 'Created Token', body: {token: 'Isso é um mockup', user: {name: 'Test Mockup'}}})
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).send({message: e.message})
        }
    }

}
