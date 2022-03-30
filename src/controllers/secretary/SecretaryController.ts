import AbstractController from "../AbstractController";
import StateController from "./StateController";

export default class SecretaryController extends AbstractController {

    constructor() {
        super()
        const router = this.getRouter()
        router.use("/state", new StateController().getRouter())
    }
}
