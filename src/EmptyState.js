import React from 'react'
import {css} from 'emotion'

const EmptyState = ({children}) => (
    <div
        className={css`
            background: #f9f9f9;
            border-radius: 6px;
            padding: 30px;
            text-align: center;
            @media (min-width: 720px) {
                padding-top: 50px;
                padding-bottom: 50px;
            }
        `}
    >
        <div
            className={css`
                color: #000;
                font-size: 16px;
                font-weight: 400;
                margin: 0;
            `}
        >
            {children}
        </div>
    </div>
)

export default EmptyState