import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RawIntlProvider, createIntl, createIntlCache, IntlShape, IntlCache } from 'react-intl';
import getDisplayName from 'react-display-name';

import { LocaleData, LocaleState, State } from '../types';
import { logger } from '../config';

import { translateSelector } from '../services/selectors';
import { setIntl } from '../services/actions';

export interface WrappedProps extends LocaleState {
    [extraProps: string]: any;
    locale: string;
    onError?: (err: string) => void;
}

interface IntlState {
    locale: string;
    intl: IntlShape;
    cache: IntlCache;
}

function shouldRecreateIntl(props: WrappedProps, state: IntlState): boolean {
    return props.locale !== state.locale;
}

const translatableFactory = (intlLocaleData: LocaleData): any => {
    function prepareConfig({ locale, onError }: WrappedProps) {
        return {
            onError,
            locale: locale,
            messages: intlLocaleData[locale],
        };
    }

    return (TranslatableComponent: React.ComponentClass<WrappedProps>) => {
        class Translatable extends Component<WrappedProps, IntlState> {
            static displayName = `Translatable(${getDisplayName(TranslatableComponent)})`;

            static propTypes = {
                locale: PropTypes.string.isRequired,
                setIntl: PropTypes.func.isRequired,
                onError: PropTypes.func,
            };

            static defaultProps = {
                onError: logger.error,
            };

            cache: IntlCache = createIntlCache();

            state: IntlState = {
                locale: this.props.locale,
                intl: createIntl(prepareConfig(this.props), this.cache),
                cache: this.cache,
            };

            static getDerivedStateFromProps(props: WrappedProps, prevState: IntlState) {
                if (shouldRecreateIntl(props, prevState)) {
                    return {
                        intl: createIntl(prepareConfig(props), prevState.cache),
                        locale: props.locale,
                    };
                }
                return null;
            }

            componentDidMount() {
                this.props.setIntl({
                    intl: this.state.intl,
                });
            }

            componentDidUpdate(_: WrappedProps, prevState: IntlState) {
                // tslint:disable-next-line early-exit
                if (this.state.intl !== prevState.intl) {
                    this.props.setIntl({
                        intl: this.state.intl,
                    });
                }
            }

            render() {
                return (
                    <RawIntlProvider value={this.state.intl}>
                        <TranslatableComponent {...this.props} />
                    </RawIntlProvider>
                );
            }
        }

        const mapStateToProps = (state: State) => translateSelector(state);
        const mapDispatchToProps = {
            setIntl,
        };

        return connect(mapStateToProps, mapDispatchToProps)(Translatable);
    };
};

export default translatableFactory;
