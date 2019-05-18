import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import Select from '@pndr/select'
import TextInput from '@pndr/text-input'
import Button from '@pndr/button'
import mail from '@pndr/icons/lib/mail'
import spinner from '@pndr/spinner'
import ErrorMessage from './ErrorMessage'

const InviteForm = ({ onSubmit, error, sending, email, onEmailChange, roles, roleId, onRoleIdChange }) => (
    <form onSubmit={onSubmit}>
        <div
            className={css`
                                margin-bottom: 30px;
                            `}
        >
            <div
                className={css`
                        display: flex;
                    `}
            >
                <div
                    className={css`
                            flex-grow: 1;
                            margin-right: 8px;
                        `}
                >
                    <TextInput
                        placeholder={'Emailaddress'}
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>
                <div
                    className={css`
                            width: 160px;
                            margin-right: 8px;
                        `}
                >
                    <Select
                        value={roleId}
                        alignLeft={true}
                        options={roles}
                        onChange={onRoleIdChange}
                    />
                </div>
                <div>
                    <Button
                        type={'submit'}
                        primary
                        icon={sending ? spinner : mail}
                        className={css`
                                height: 38px;
                            `}
                    >
                        {sending ? 'Sending invite...' : 'Send invite'}
                    </Button>
                </div>
            </div>
            {error ? (
                <ErrorMessage
                    className={css`
                                    margin-top: 6px;
                                `}
                >
                    {error}
                </ErrorMessage>
            ) : null}
        </div>
    </form>
)

InviteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, 
    error: PropTypes.string, 
    sending: PropTypes.bool, 
    email: PropTypes.string, 
    onEmailChange: PropTypes.func.isRequired, 
    roles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired, 
    roleId: PropTypes.string.isRequired, 
    onRoleIdChange: PropTypes.func.isRequired
}

export default InviteForm