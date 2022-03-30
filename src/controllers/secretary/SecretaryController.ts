import AbstractController from "../AbstractController";
import StateController from "./StateController";
import {Request, Response} from 'express'
import {HttpStatus} from "../../helpers/HttpStatus";
import LoginHelper from "../../helpers/LoginHelper";
import {SecretaryUser} from "../../entity/secretaries/user/SecretaryUser";

export default class SecretaryController extends AbstractController {

    constructor() {
        super()
        const {login} = this
        const router = this.getRouter()
        router.use("/state", new StateController().getRouter())
        router.post('/login', login)
    }


    private login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Secretary']
            #swagger.description = 'Endpoint para logar um usuario secretaria'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        let authObj = {};

        try{
            authObj = LoginHelper.basicAuthToObj(req.headers['authorization'])
        }catch (e: any){
            return res.status(HttpStatus.UNAUTHORIZED).send({message: e.message})
        }

        try{
            const user = await SecretaryUser.findOneBy(authObj)

            const token = this.getJwt().createJWToken({id: user.id})

            return res.status(HttpStatus.OK).send({message: 'Created Token', token: token})
        }catch (e: any){
            return res.status(HttpStatus.NOT_FOUND).send({message: 'User not found'})
        }
    }
}
