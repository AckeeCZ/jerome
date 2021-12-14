import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { setIntl } from '../../../../services/actions';

export function useProvideIntl() {
    const dispatch = useDispatch();
    const intl = useIntl();

    React.useEffect(() => {
        dispatch(setIntl({ intl }));
    }, [intl]);
}
