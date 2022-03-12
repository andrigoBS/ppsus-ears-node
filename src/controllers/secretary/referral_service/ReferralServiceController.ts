import {Request, Response, Router} from 'express'
import HttpStatus from '../../../helpers/HttpStatus'
import {JwtAuth} from "../../../middleware/JwtAuth"

export default class ReferralServiceController{
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.createGetAllRouter()
        this.createGetOneRouter()
        this.createPostRouter()
        this.createPutRouter()
        this.createDeleteRouter()
    }

    public getRouter(): Router{
        return this.router
    }

    private createGetAllRouter() : void {
        this.router.get('/', new JwtAuth().verifyJWTMiddleware, async (req: Request, res: Response, next: Function) => {
            /*
               #swagger.tags = ['ReferralService']
               #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */
            return res.status(HttpStatus.ok).send({message: 'respond with a resource'})
        })
    }

    private createGetOneRouter() : void {
        this.router.get('/:id', new JwtAuth().verifyJWTMiddleware, async (req: Request, res: Response, next: Function) => {
            /*
               #swagger.tags = ['ReferralService']
               #swagger.description = 'Endpoint para recuperar um serviço de referencia pelo id'
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */
            return res.status(HttpStatus.ok).send({message: 'respond with a resource'})
        })
    }

    private createPostRouter(): void{
        this.router.post('/', new JwtAuth().verifyJWTMiddleware, async (req: Request, res: Response, next: Function) => {
            /*
                #swagger.tags = ['ReferralService']
                #swagger.description = 'Endpoint para adicionar um serviço de referencia'
                #swagger.parameters['referralService'] = {
                   in: 'body',
                   required: 'true',
                   description: 'Nome e telefone do contado',
                   type: 'object',
                    schema: {name: 'João S. da Silva', cellphone: '554130306905'}
               }
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */
            let {name, cellphone, jwtObject} = req.body

            return res.status(HttpStatus.ok).send({message: 'respond with a resource'})
        })
    }

    private createPutRouter(): void{
        this.router.put('/:id', new JwtAuth().verifyJWTMiddleware, async (req: Request, res: Response, next: Function) => {
            /*
                #swagger.tags = ['ReferralService']
                #swagger.description = 'Endpoint para atualizar um serviço de referencia'
                #swagger.parameters['referralService'] = {
                   in: 'body',
                   required: 'true',
                   description: 'Nome e telefone do contado',
                   type: 'object',
                    schema: {name: 'João S. da Silva', cellphone: '554130306905'}
               }
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */
            let {name, cellphone, jwtObject} = req.body

            return res.status(HttpStatus.ok).send({message: 'respond with a resource'})
        })
    }

    private createDeleteRouter(): void{
        this.router.delete('/:id', new JwtAuth().verifyJWTMiddleware, async (req: Request, res: Response, next: Function) => {
            /*
               #swagger.tags = ['ReferralService']
               #swagger.description = 'Endpoint para deletar um serviço de referencia pelo id'
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */

            return res.status(HttpStatus.ok).send({message: 'respond with a resource'})
        })
    }
}
