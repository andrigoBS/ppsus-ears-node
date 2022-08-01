import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class ReportsController extends AbstractController {

    constructor() {
        super();
        const { getBabiesPassFail, getBabiesComeBorn, getIndicatorsPercent, getIndicators, getEquipment } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/baby-pass-fail/:userType', verifyJWTMiddleware, getBabiesPassFail);
        router.get('/baby-come-born/:userType', verifyJWTMiddleware, getBabiesComeBorn);
        router.get('/indicators-percent/:userType', verifyJWTMiddleware, getIndicatorsPercent);
        router.get('/indicators/:userType', verifyJWTMiddleware, getIndicators);
        router.get('/equipment/:userType', verifyJWTMiddleware, getEquipment);
    }

    private getBabiesPassFail = async (req: Request, res: Response) => {
        const pass = 10;
        const fails = 5;

        return res.status(HttpStatus.OK).json({
            title: 'Quantidade de bebes que passaram e falharam.',
            labels: ['Passou', 'Falhou'],
            quantities: [pass, fails],
        });
    };

    private getBabiesComeBorn = async (req: Request, res: Response) => {
        const come = 10;
        const born = 5;

        return res.status(HttpStatus.OK).json({
            title: 'Quantos compareceram para o teste e quantos que nasceram (vivos).',
            labels: ['Compareceram', 'Nasceram'],
            quantities: [come, born],
        });
    };

    private getIndicatorsPercent = async (req: Request, res: Response) => {
        const indicators = [];
        for (let i = 0; i < 20; i++) {
            indicators.push({ label: 'Indicador '+i, quantities: Math.random() * 100 });
        }

        return res.status(HttpStatus.OK).json({
            title: 'Porcentagem para cada indicador.',
            labels: indicators.map(indicator => indicator.label),
            quantities: indicators.map(indicator => indicator.quantities),
        });
    };

    private getIndicators = async (req: Request, res: Response) => {
        const indicators = [];
        for (let i = 0; i < 40; i++) {
            indicators.push({ label: 'Indicador '+i, quantities: Math.random() * 100 });
        }

        return res.status(HttpStatus.OK).json({
            title: 'Único ou múltiplo (Relacionado a quantidade de indicadores selecionados no momento da consulta).',
            labels: indicators.map(indicator => indicator.label),
            quantities: indicators.map(indicator => indicator.quantities),
        });
    };

    private getEquipment = async (req: Request, res: Response) => {
        const equipments = [];
        for (let i = 0; i < 40; i++) {
            equipments.push({ label: 'Equipamento '+i, quantities: Math.random() * 100 });
        }

        return res.status(HttpStatus.OK).json({
            title: 'Passou e falhou (Para analisar melhor os resultados comparando com os equipamentos)',
            labels: equipments.map(equipment => equipment.label),
            quantities: equipments.map(equipment => equipment.quantities),
        });
    };
}
