import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RawIntlProvider, createIntl, createIntlCache, IntlShape, IntlCache } from 'react-intl';
import getDisplayName from 'react-display-name';

import { LocaleData, LocaleState, State } from '../types';

import { translateSelector } from '../services/selectors';
import { createIntlProvider, destroyIntlProvider } from '../services/actions';

export interface WrappedProps extends LocaleState {
    [extraProps: string]: any;
    locale: string;
}

interface WrappedState {
    locale: string;
    intl: IntlShape;
    cache: IntlCache;
}

function shouldRecreateIntl(props: WrappedProps, state: WrappedState): boolean {
    return !state || props.locale !== state.locale;
}

const translatableFactory = (intlLocaleData: LocaleData): any => {
    function prepareConfig(props: WrappedProps) {
        return {
            locale: props.locale,
            messages: intlLocaleData[props.locale],
        };
    }

    return (TranslatableComponent: React.ComponentClass<WrappedProps>) => {
        class Translatable extends Component<WrappedProps, WrappedState> {
            private cache: IntlCache = createIntlCache();

            public state: WrappedState = {
                locale: this.props.locale,
                intl: createIntl(prepareConfig(this.props), this.cache),
                cache: this.cache,
            };

            static displayName = `Translatable(${getDisplayName(TranslatableComponent)})`;

            static propTypes = {
                locale: PropTypes.string.isRequired,
                createIntlProvider: PropTypes.func.isRequired,
                destroyIntlProvider: PropTypes.func.isRequired,
            };

            static getDerivedStateFromProps(props: WrappedProps, prevState: WrappedState) {
                if (shouldRecreateIntl(props, prevState)) {
                    return {
                        intl: createIntl(prepareConfig(props), prevState.cache),
                        locale: props.locale,
                    };
                }
                return null;
            }

            componentDidMount() {
                this.props.createIntlProvider({
                    intl: this.state.intl,
                });
            }

            componentDidUpdate(_: WrappedProps, prevState: WrappedState) {
                if (this.state.locale !== prevState.locale) {
                    this.props.destroyIntlProvider();
                    this.props.createIntlProvider({
                        intl: this.state.intl,
                    });
                }
            }

            componentWillUnmount() {
                this.props.destroyIntlProvider();
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
            createIntlProvider,
            destroyIntlProvider,
        };

        return connect(mapStateToProps, mapDispatchToProps)(Translatable);
    };
};

export default translatableFactory;
