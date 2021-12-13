import React from 'react';
import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import type { IntlConfig } from 'react-intl';
import { useSelector } from 'react-redux';

import { IntlEmitter } from './IntlEmitter';
import { translateSelector } from '../../services/selectors';

export interface LocalizationsRawProps extends Omit<Partial<IntlConfig>, 'messages' | 'locale'> {
    intlMessages: Record<string, IntlConfig['messages']>;
    children: ReactNode | ReactNode[];
}

export const LocalizationsRaw = ({ intlMessages, children, ...rest }: LocalizationsRawProps) => {
    const { locale } = useSelector(translateSelector);

    return (
        <IntlProvider locale={locale} key={locale} messages={intlMessages[locale]} {...rest}>
            <IntlEmitter>{children}</IntlEmitter>
        </IntlProvider>
    );
};
