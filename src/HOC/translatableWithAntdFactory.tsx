import React from 'react';
import PropTypes from 'prop-types';
import ConfigProvider from 'antd/es/config-provider';
import { Locale as AntdLocaleData } from 'antd/es/locale-provider';

import { LocaleData } from '../types';

import translatableFactory, { WrappedProps } from './translatableFactory';

const translatableWithAntdFactory = (intlLocaleData: LocaleData, antdLocaleData: LocaleData<AntdLocaleData>): any => {
    const translatable = translatableFactory(intlLocaleData);

    return (TranslatableComponent: React.ComponentType<WrappedProps>) => {
        const TranslatableWithAntd: React.StatelessComponent<WrappedProps> = props => (
            <ConfigProvider locale={antdLocaleData[props.locale]}>
                <TranslatableComponent {...props} />
            </ConfigProvider>
        );

        TranslatableWithAntd.propTypes = {
            locale: PropTypes.string.isRequired,
        };

        return translatable(TranslatableWithAntd);
    };
};

export default translatableWithAntdFactory;
