import React from 'react'
import { css, cx } from 'emotion'

const ErrorMessage = ({ className, children }) => (
    <div
        className={cx(
            css`
            color: #ff4a1f;
            font-size: 13px;
            font-weight: normal;
        `, className)}
    >
        {children}
    </div>
)

export default ErrorMessage