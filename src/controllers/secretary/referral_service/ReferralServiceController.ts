import {Request, Response, Router} from 'express'
import HttpStatus from '../../../helpers/HttpStatus'

export default class ReferralServiceController{
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.get('/',    this.getAll)
        this.router.get('/:id', this.getOne)
        this.router.post('/',   this.post)
        this.router.put('/:id', this.put)
        this.router.delete('/', this.delete)
    }

    public getRouter(): Router{
        return this.router
    }

    /**
     * Get all
     */
    private async getAll(req: Request, res: Response, next: Function) : Promise<Response>{
        return res.status(HttpStatus.ok).send({message: 'respond with a resource'});
    }

    /**
     * Get one by id
     */
    private async getOne(req: Request, res: Response, next: Function): Promise<Response> {
        return res.status(HttpStatus.ok).send({message: 'respond with a resource'});
    };

    /**
     * Create
     */
    private async post(req: Request, res: Response, next: Function) : Promise<Response>{
        return res.status(HttpStatus.ok).send({message: 'respond with a resource'});
    };

    /**
     * Update
     */
    private async put(req: Request, res: Response, next: Function) : Promise<Response>{
        return res.status(HttpStatus.ok).send({message: 'respond with a resource'});
    };

    /**
     * Delete
     */
    private async delete(req: Request, res: Response, next: Function) : Promise<Response>{
        return res.status(HttpStatus.ok).send({message: 'respond with a resource'});
    };
}
