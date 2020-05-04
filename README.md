![ackee|Jerome](./assets/ackee_git_frontend_jerome.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/jerome/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/jerome.svg?style=flat)](https://travis-ci.com/AckeeCZ/jerome) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/jerome.svg?style=flat-square)](https://david-dm.org/AckeeCZ/jerome)[![Known Vulnerabilities](https://snyk.io/test/github/AckeeCZ/jerome/badge.svg)](https://snyk.io/test/github/AckeeCZ/jerome)




# Jerome

> Localization module useful mainly for frontend development in Ackee.

> Name of package refers to [Saint Jerome](https://en.wikipedia.org/wiki/Jerome) the patron of all translators.


## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
    * [HOC](#hoc)   
    * [Actions](#actions)
    * [Reducer](#reducer)
    * [Selectors](#selectors)    
    * [Sagas](#sagas)   
    * [Utilities](#utilities)   

## Installation

Using yarn:

```bash
yarn add @ackee/jerome
```

Using npm:

```bash
npm i -s @ackee/jerome
```

## Usage

All parts are independent, but best works all together. Don't forget that for correct usage of selectors your reducer have to be stored with `translate` key (as in example).

### Used APIs

Jerome uses `react-intl@3` which [relies on some native browser APIs](https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis) so if you're going to use components for plurals or relative time format, be sure that your minimal supported browsers implement those APIs or use polyfills as described bellow

For polyfilling plurals, use [`intl-pluralrules`](https://www.npmjs.com/package/intl-pluralrules) package.

```js
if (!Intl.PluralRules) {
  require('intl-pluralrules');
}
```

For polyfilling plurals, use [`intl-relativetimeformat`](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat) package.

```js
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/de'); // Add locale data for de
}
```

## API

### HOC

![Important](./assets/alert-icon.png "Important note")
To make HOCs works properly, you must have `react-intl` installed just once! So be sure your dependencies structure is flat.

#### `translatableFactory(intlLocaleData): (ContentComponent) => TranslatableContentComponent`

It provides `reac-intl` localization context, so you first have to provide localization messages to the factory that will return the actual HOC.

`intlLocaleData` - object with messages keyed by locale name, eg.


```js
const messages = {
    cs: {
        hello: 'Dobry den',
        ...
    },
    en: {
        hello: 'Hello',
        ...
    },
}
```

The factory returns function that receives `ContentComponent` and return it wrapped with [IntlProvider](https://github.com/yahoo/react-intl/wiki/Components#intlprovider) which receives locale from the
`store.translate.locale` store path.

_Example_

```jsx
import { FormattedMessage, addLocaleData } from 'react-intl';
import { translatableFactory } from '@ackee/jerome';

const ContentComponent = () => (
    <div id="app">
        <h1><FormattedMessage id="hello" /></h1>
        <h2><FormattedMessage id="bye.instant" /></h2>
        <h3><FormattedMessage id="bye.forever" /></h3>
    </div>
);

const messages = {
    cs: {
        hello: 'Cau',
        'bye.instant': 'Nashledanou',
        'bye.forever': 'Sbohem',
    },
    en: {
        hello: 'Hello',
        'bye.instant': 'See you later',
        'bye.forever': 'Goodbye',
    },
};

const store = createStore((state = initialState) => ({
    translate: { locale: 'cs' },
}));

TranslatableComponent = translatableFactory(messages)(ContentComponent);

ReactDOM.render(<TranslatableComponent store={store} />, document.getElementById('app'));
```

#### `translatableFactory(intlLocaleData, antdLocaleData): (ContentComponent) => TranslatableContentComponent`

There is an overload of `translatableFactory` for usage with [Ant design](https://ant.design/docs/react/introduce) components library. It extends standard `translatableFactory` with adding `antd` localization context, but you have to provide the `antLocaleData` as a second argument to the factory.

`intlLocaleData` - object with antd locales keyed by locale name. eg.

```js
import cs_CZ from 'antd/lib/locale-provider/cs_CZ';
import en_US from 'antd/lib/locale-provider/en_US';

const messages = {
    cs: cs_CZ,
    en: en_US,
}
```

Usage is almost same as for the [`translatableFactory`](#translatablefactoryintllocaledata-contentcomponent--translatablecontentcomponent), you only need to import it from `@ackee/jerome/antd` instead of `@ackee/jerome`.

```jsx
import { FormattedMessage, addLocaleData } from 'react-intl';

import { Pagination } from 'antd';
import cs_CZ from 'antd/lib/locale-provider/cs_CZ';
import en_US from 'antd/lib/locale-provider/en_US';

import { translatableFactory } from '@ackee/jerome/antd'; // notice the import path

const ContentComponent = () => (
    <div id="app">
        <h1><FormattedMessage id="hello" /></h1>
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
    </div>
);

const messages = {
    cs: {
        hello: 'Cau',
    },
    en: {
        hello: 'Hello',
    },
};

const antdMessages = {
    cs: cs_CZ,
    en: en_US,
}

const store = createStore((state = initialState) => ({
    translate: { locale: 'cs' },
}));

// provide antd messages as a second argument
TranslatableComponent = translatableWithAntdFactory(messages, antdMessages)(ContentComponent);

ReactDOM.render(<TranslatableComponent store={store} />, document.getElementById('app'));
```

-----

### Actions

#### `setLocale(locale: string)`

_Example_

```js
import { setLocale } from '@ackee/jerome';

dispatch(setLocale('cs'));
```

#### `getLocale`

_Example_

```js
import { getLocale } from '@ackee/jerome';

dispatch(getLocale());
```

#### Action types

```js
import { actionTypes } from '@ackee/jerome'
```

-----

### Reducer

Reducer is actually reducer factory since you must provide default locale first.

#### `reducer(locale: string): TranslateReducer`

_Example_

```js
import { reducer as translateFactory } from '@ackee/jerome';

const translate = translateFactory('cs');

const appReducers = combineReducers({
    translate,
    ...
});
```

----

### Selectors

#### `translateSelector(state: State): { locale: string }`

Select `translate` part of store.

_Example_

```js
import { translateSelector } from '@ackee/jerome';

translateSelector(state); // { locale: 'cs' }
```

----

### Sagas

#### `saga()`

The saga has two purposes, both related to handling persistent storing of locale. 

* It saves locale on every `SET_LOCALE` action into the persistent storage.
* It loads locale from persistent storage when app load and set it up.

_Example_

```js
import { saga as localization } from '@ackee/jerome';

const rootSaga = function* () {
    yield all([
        localization(), // plug it into root saga
        ...
    ]);
};

function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    const middleware = applyMiddleware(...middlewares);

    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);

    return store;
}
```

#### `getIntl(): ReactIntl`
The `getIntl` saga returns an intl object that exactly corresponds to the [`intlShape`](https://github.com/yahoo/react-intl/wiki/API#intlshape).

_Example_

```js
import { getIntl } from '@ackee/jerome';

function* mySaga() {
    const intl = yield getIntl();

    const translatedMessage = intl.formatMessage({
        id: 'hello'
    });
}
```

-----

### Utilities

#### `saveLocale(locale: string)`

Used for persistent store of locale setting.

_Example_

```js
import { saveLocale } from '@ackee/jerome';

saveLocale('cs');
```

#### `loadLocale(): string`

Used for getting locale setting from persistent storage.

_Example_

```js
import { loadLocale } from '@ackee/jerome';

loadLocale(); // 'cs'
```

#### `localStorageHandlers`

Covers both utilities mentioned above.

_Example_

```js
import { localStorageHandlers } from '@ackee/jerome';

localStorageHandlers.saveLocale('en');
localStorageHandlers.loadLocale(); // 'en'
```


