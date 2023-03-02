import { HttpStatus } from '../AbstractHttpErrors';
import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import { City } from '../../entity/secretaries/City';

export default class CityController extends AbstractRoutes {

    constructor() {
        super();
        const { getAll, getById } = this;
        const router = this.getRouter();
        router.get('/', getAll);
        router.get('/:id', getById);
    }

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias de estado'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const query = City
            .createQueryBuilder('c')
            .select(['c.id AS id', 'c.name AS name'])
        ;
        const state = req.query.state;
        if(state) {
            query.leftJoin('c.state', 's')
                .where('s.id = :state', { state })
            ;
        }
        const cities = await query.execute();
        return res.status(HttpStatus.OK).json(cities);
    };

    private getById = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar uma secretaria do estado pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const city = await City.findOne(req.params.id);
        if (!city) {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'ID não encontrado' });
        }
        return res.status(HttpStatus.OK).json({ city });
    };
}
