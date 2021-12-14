import React from 'react';
import type { ReactNode } from 'react';

import { useProvideIntl } from './hooks/useProvideIntl';

export interface IntlEmitterProps {
    children: ReactNode | ReactNode[];
}

export const IntlEmitter = ({ children }: IntlEmitterProps) => {
    useProvideIntl();
    return <>{children}</>;
};
