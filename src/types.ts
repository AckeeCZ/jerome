import {
    StoreNames, DBSchema } from 'idb';

import actionTypes from './services/actionTypes';

export type Locale = string;

export interface LocaleState {
    locale: Locale;
}

export interface State {
    translate: LocaleState;
}

export interface Action {
    type: actionTypes;
    [extraProps: string]: any;
}

export interface LocaleData<T = {}> {
    [locale: string]: T;
}

export interface Console {
    error(...args: any[]): any;
    warn(...args: any[]): any;
    log(...args: any[]): any;
}

export interface IDBLikeDatabase<DBTypes extends DBSchema | unknown = unknown, StoreName extends StoreNames<DBTypes> = StoreNames<DBTypes>> {
    // get(query: StoreKey<DBTypes, StoreName> | IDBKeyRange): Promise<StoreValue<DBTypes, StoreName> | undefined>;
    // put(value: StoreValue<DBTypes, StoreName>, key?: StoreKey<DBTypes, StoreName> | IDBKeyRange): Promise<StoreKey<DBTypes, StoreName>>;
    get(storeName: string, key: string): any;
    put(storeName: string, value: any, key: string): any;
}
