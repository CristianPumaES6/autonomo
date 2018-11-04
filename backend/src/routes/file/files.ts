import { BaseRouter } from '../baseRouter';

class filesRouter extends BaseRouter<any> {
    constructor() {
        super(null);
        this.init();
    }

    protected init() {

    }
}

let files = new filesRouter().route;
export { files };