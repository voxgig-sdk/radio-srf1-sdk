import { RadioSrf1EntityBase } from '../RadioSrf1EntityBase';
import type { RadioSrf1SDK } from '../RadioSrf1SDK';
import type { Control } from '../types';
import type { Music, MusicListMatch } from '../RadioSrf1Types';
declare class MusicEntity extends RadioSrf1EntityBase<Music> {
    constructor(client: RadioSrf1SDK, entopts: any);
    make(this: MusicEntity): MusicEntity;
    list(this: any, reqmatch?: MusicListMatch, ctrl?: Control): Promise<MusicEntity[]>;
}
export { MusicEntity };
