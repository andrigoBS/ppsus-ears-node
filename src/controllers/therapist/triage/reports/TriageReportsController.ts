import { HttpStatus } from '../../../../helpers/http/AbstractHttpErrors';
import { ResponseHttpController } from '../../../../helpers/http/AbstractRoutesTypes';
import HtmlToPdfBuffer from '../../../../helpers/HtmlToPdfBuffer';
import { HistoricSerieData, OrientationsData, RetestData, TestData } from './TriageReportsTypes';

const htmlToPdf = new HtmlToPdfBuffer();

export default class TriageReportsController {
    public async fileHistoricSerie(): Promise<ResponseHttpController> {
        const orientationData: HistoricSerieData = {
            date: '20/08/2000',
            name: 'Teste 123',
        };

        const result = await htmlToPdf.generate<HistoricSerieData>('reports/historic-serie', orientationData);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async fileOrientations(): Promise<ResponseHttpController> {
        const orientationData: OrientationsData = {
            date: '20/08/2000',
            name: 'Teste 123',
        };

        const result = await htmlToPdf.generate<OrientationsData>('reports/orientations', orientationData);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async fileRetest(): Promise<ResponseHttpController> {
        const orientationData: RetestData = {
            date: '20/08/2000',
            name: 'Teste 123',
        };

        const result = await htmlToPdf.generate<RetestData>('reports/retest', orientationData);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async fileTest(): Promise<ResponseHttpController> {
        const orientationData: TestData = {
            date: '20/08/2000',
            name: 'Teste 123',
        };

        const result = await htmlToPdf.generate<TestData>('reports/test', orientationData);
        return { httpStatus: HttpStatus.OK, result };
    }
}
