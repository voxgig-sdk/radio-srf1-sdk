import { MusicEntity } from './entity/MusicEntity';
export type * from './RadioSrf1Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RadioSrf1EntityBase } from './RadioSrf1EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class RadioSrf1SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Music(entopts?: Record<string, any>): MusicEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): RadioSrf1SDK;
    tester(testopts?: any, sdkopts?: any): RadioSrf1SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof RadioSrf1SDK;
export { stdutil, config, BaseFeature, RadioSrf1EntityBase, RadioSrf1SDK, SDK, };
