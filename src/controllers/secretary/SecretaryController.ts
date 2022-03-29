import {Request, Response, Router} from 'express'
import ReferralServiceController from "./referral_service/ReferralServiceController"
import {HttpStatus} from "../../helpers/HttpStatus";
import LoginHelper from "../../helpers/LoginHelper";
import {SecretaryUser} from "../../entity/secretaries/user/SecretaryUser";
import {JwtAuth} from "../../middleware/JwtAuth";

export default class SecretaryController{
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.use('/referral-services', new ReferralServiceController().getRouter())
        this.createLoginRoute()
    }

    private createLoginRoute(): void {
        this.router.post('/login', async (req: Request, res: Response, next: Function) => {
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

                const token = new JwtAuth().createJWToken({id: user.id})

                return res.status(HttpStatus.OK).send({message: 'Created Token', token: token})
            }catch (e: any){
                return res.status(HttpStatus.NOT_FOUND).send({message: 'User not found'})
            }
        })
    }

    public getRouter(): Router{
        return this.router
    }
}
