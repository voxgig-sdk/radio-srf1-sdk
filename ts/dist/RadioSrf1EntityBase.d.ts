import { inspect } from 'node:util';
import { RadioSrf1SDK } from './RadioSrf1SDK';
import { Utility } from './utility/Utility';
import type { Context } from './types';
declare class RadioSrf1EntityBase<D = any> {
    name: string;
    name_: string;
    Name: string;
    _client: RadioSrf1SDK;
    _utility: Utility;
    _entopts: any;
    _data: Partial<D>;
    _match: Partial<D>;
    _entctx: Context;
    _deleted: boolean;
    constructor(client: RadioSrf1SDK, entopts: any);
    markDeleted(this: any): void;
    deleted(this: any): boolean;
    entopts(): any;
    client(): RadioSrf1SDK;
    data(this: any, data?: Partial<D>): D;
    match(this: any, match?: Partial<D>): Partial<D>;
    stream(this: any, action: string, args?: any, callopts?: any): AsyncGenerator<any>;
    toJSON(): any;
    toString(): string;
    [inspect.custom](): string;
    _unexpected(this: any, ctx: Context, err: any): any;
}
export { RadioSrf1EntityBase };
