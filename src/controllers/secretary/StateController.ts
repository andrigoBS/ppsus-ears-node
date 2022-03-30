import AbstractController from "../AbstractController";
import {State} from "../../entity/secretaries/State";
import {HttpStatus} from "../../helpers/HttpStatus";
import {Request, Response} from "express";

export default class StateController extends AbstractController {

    constructor() {
        super()
        const {getAll, getById, updateSecretary} = this
        const {verifyJWTMiddleware} = this.getJwt()
        const router = this.getRouter()
        router.get("/", getAll)
        router.get("/:id", getById)
        router.put("/:id", verifyJWTMiddleware, updateSecretary)
    }

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['StateSecretary']
           #swagger.description = 'Endpoint para recuperar todas as secretarias de estado'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const [states, count] = await State.findAndCount()
        return res.status(HttpStatus.OK).json({states, count})
    }

    private getById = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['StateSecretary']
           #swagger.description = 'Endpoint para recuperar uma secretaria do estado pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const state = await State.findOne(req.params.id)
        if (!state) {
                res.status(HttpStatus.NOT_FOUND).json({error: "ID não encontrado"})
        }
        return res.status(HttpStatus.OK).json({state})
    }

    private updateSecretary = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['StateSecretary']
           #swagger.description = 'Endpoint para atualizar uma secretaria do estado pelo id'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Nome da secretaria',
               type: 'string',
               schema: {
                  name: "Secretaria de SC",
                  emails: ["email@email.com", "email@email.com"]
               }
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const {name, emails} = req.body;
        const state = await State.findOne(req.params.id);
        console.log(await State.count({where: emails}))
        if (!state) {
            return res.status(HttpStatus.NOT_FOUND).json({error: "ID não encontrado"})
        }
        Object.assign(state.secretary, {name, emails})
        await state.save();
        return res.status(HttpStatus.OK).json({state});
    }
}
