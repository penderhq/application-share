import React from 'react'
import {css} from 'emotion'

export default class ShareItem extends React.Component {

    render() {

        return (
            <div
                className={css`
                    padding: 16px;
                    border-radius: 6px;
                    background-color: #fff;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,.25);
                `}
            >
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <div>
                        <div
                            className={css`
                                    -webkit-box-flex: 0;
                                    flex: 0 0 auto;
                                    height: 48px;
                                    margin-right: 12px;
                                    width: 48px;
                                    background-color: #fff;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    border-radius: 50%;
                                    position: relative;
                                `}
                        >
                            <div
                                className={css`
                                    position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    left: 0;
                                    right: 0;
                                    background-image: url('${this.props.imageUrl}');
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                `}
                            />
                        </div>
                    </div>
                    <div
                        className={css`
                            flex-grow: 1;
                            margin-right: 16px;
                        `}
                    >
                        <div
                            className={css`
                                font-weight: bold;
                                margin-bottom: 4px;
                            `}
                        >
                            {this.props.name}
                        </div>
                        <div
                            className={css`
                                color: #737373;
                                font-size: 14px;
                            `}
                        >
                            {this.props.description}
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}