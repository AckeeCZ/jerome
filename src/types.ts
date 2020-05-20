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

export interface IDBLikeDatabase {
    get(storeName: string, key: string): any;
    put(storeName: string, value: any, key: string): any;
}
