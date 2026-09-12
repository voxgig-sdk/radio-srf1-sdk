import { Context } from './Context';
declare class RadioSrf1Error extends Error {
    isRadioSrf1Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { RadioSrf1Error };
