import 'babel-polyfill';
import React from 'react';

import { storiesOf } from '@storybook/react';

import 'antd/es/pagination/style/index.less';

import * as database from './IndexedDBWrapper';

storiesOf('services|Storage handlers', module).add('simple', () => {
    const key = 'itemKey';
    return (
        <div>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const formElement: HTMLFormElement = e.target;

                    const input: HTMLInputElement = formElement.elements[0];
                    await database.set(key, input.value);

                    formElement.reset();
                }}
            >
                <input name="user-text" type="text" />
                <button type="submit">Save to the storage</button>
            </form>

            <button
                type="button"
                onClick={async () => {
                    const value = await database.get(key);
                    alert(value);
                }}
            >
                What's in the storage?
            </button>
        </div>
    );
});
