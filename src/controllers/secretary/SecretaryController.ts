import {Router} from 'express'
import ReferralServiceController from "../service/ReferralServiceController"
import AbstractController from "../AbstractController";

export default class SecretaryController extends AbstractController {

    constructor() {
        super()
        const router = this.getRouter()
    }
}
