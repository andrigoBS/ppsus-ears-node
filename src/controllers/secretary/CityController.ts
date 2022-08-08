import { Request, Response } from 'express';
import { City } from '../../entity/secretaries/City';
import { HttpStatus } from '../../helpers/HttpStatus';
import AbstractController from '../AbstractController';

export default class CityController extends AbstractController {

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
            .leftJoin('c.zone', 'z')
            .leftJoin('z.state', 's')
        ;
        const state = req.query.state;
        if(state) {
            query.where('s.id = :state', { state });
        }
        const cities = await query.execute();
        let citiesObject = {};
        cities.forEach((city: { id: string; name: string; }) => {
            citiesObject = { ...citiesObject, [city.id]: city.name };
        });
        return res.status(HttpStatus.OK).json(citiesObject);
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
