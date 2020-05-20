import { openDB as openDBReal } from 'idb';

import openDBMock from './indexedDbMock';
import { isBrowserEnv } from '../../../config';
import { IDBLikeDatabase } from '../../../types';

const DATABASE_NAME = '@ackee/jerome';
const DATABASE_VERSION = 1;
const DATABASE_STORE_NAME = 'keyvaluepairs';

async function openDB(): Promise<IDBLikeDatabase> {
    const open = isBrowserEnv && window.indexedDB ? openDBReal : openDBMock;

    try {
        const db = await open(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(nextDb: any) {
                nextDb.createObjectStore(DATABASE_STORE_NAME);
            },
        });
        return db;
    } catch (e) {
        return openDBMock();
    }
}

const db: Promise<IDBLikeDatabase> = openDB();

export async function get(key: string) {
    return (await db).get(DATABASE_STORE_NAME, key);
}

export async function set(key: string, val: any) {
    return (await db).put(DATABASE_STORE_NAME, val, key);
}
