import { IDBLikeDatabase } from '../../../types';

export class IndexedDbMock {
    private db: { [key: string]: any };

    constructor() {
        this.db = {};
    }

    get(_: string, key: string): any {
        return this.db[key];
    }

    put(_: string, val: any, key: string) {
        this.db[key] = val;
        return Promise.resolve(key);
    }
}

export default (): Promise<IDBLikeDatabase> => {
    return Promise.resolve(new IndexedDbMock());
};
