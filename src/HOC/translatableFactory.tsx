import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RawIntlProvider, createIntl, createIntlCache, IntlShape } from 'react-intl';
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
}

const translatableFactory = (intlLocaleData: LocaleData): any => {
    return (TranslatableComponent: React.ComponentClass<WrappedProps>) => {
        class Translatable extends Component<WrappedProps, WrappedState> {
            static displayName = `Translatable(${getDisplayName(TranslatableComponent)})`;

            static propTypes = {
                locale: PropTypes.string.isRequired,
                createIntlProvider: PropTypes.func.isRequired,
                destroyIntlProvider: PropTypes.func.isRequired,
            };

            static getDerivedStateFromProps(props: WrappedProps, prevState: WrappedState) {
                if (!prevState || props.locale !== prevState.locale) {
                    const intlConfig = {
                        locale: props.locale,
                        messages: intlLocaleData[props.locale],
                    };

                    const cache = createIntlCache();
                    const intl = createIntl(intlConfig, cache);
                    return {
                        intl,
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
                if (this.state.intl !== prevState.intl) {
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
