import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {css} from 'emotion'
import {render} from 'react-dom'
import {injectGlobal} from 'emotion'
import Select from '@cmds/select'
import TextInput from '@cmds/text-input'
import Button from '@cmds/button'
import mail from '@cmds/icons/lib/mail'
import close from '@cmds/icons/lib/close2'
import {Canvas, Heading, Paragraph, Box} from '@cmds/demo-utils'
import createStore from './services/createStore'

const store = createStore()

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        margin: 0;
    }
`

class ShareItem extends React.Component {

    render() {

        return (
            <div
                className={css`
                    padding: 16px;
                    border-radius: 6px;
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
                                    background-image: url(${this.props.imageUrl});
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

class InvitationItem extends React.Component {

    render() {

        return (
            <ShareItem
                imageUrl={this.props.user.get('imageUrl')}
                name={this.props.user.get('displayName')}
                description={this.props.user.get('email')}
            >
                <div
                    className={css`
                            width: 160px;
                            margin-right: 16px;
                        `}
                >
                    <Select
                        value={this.props.invitation.get('roleId')}
                        alignLeft={true}
                        options={roles}
                        disabled={true}
                        onChange={({value: roleId}) => {


                        }}
                    />
                </div>
                <div>
                    <Button
                        type={'button'}
                        icon={this.props.removing ? spinner : close}
                        className={css`
                            height: 38px;
                        `}
                        onClick={this.handleRemove}
                    >
                        {this.props.removing ? 'Removing...' : 'Remove'}
                    </Button>
                </div>
            </ShareItem>
        )
    }

    handleRemove = async () => {

        await removeInvitation(ctx)({
            id: this.props.id
        })
    }
}

InvitationItem = connect((state, props) => {

    const invitation = state.getIn(['invitationsById', props.id])

    const user = state.getIn(['usersById', invitation.get('userId')])

    return {
        invitation,
        user
    }
})(InvitationItem)

class CollaboratorItem extends React.Component {

    render() {

        return (
            <ShareItem
                imageUrl={this.props.user.get('imageUrl')}
                name={this.props.user.get('displayName')}
                description={this.props.user.get('email')}
            >
                {this.props.updating ? (
                    <div
                        className={css`
                            height: 16px;
                            margin-right: 16px;
                        `}
                    >
                        {spinner({
                            width: 16
                        })}
                    </div>
                ) : null}
                <div
                    className={css`
                            width: 160px;
                            margin-right: 16px;
                        `}
                >
                    <Select
                        value={this.props.collaborator.get('roleId')}
                        alignLeft={true}
                        options={roles}
                        disabled={this.props.isCurrentUser}
                        onChange={async ({value: roleId}) => {

                            await updateCollaboratorRoleId(ctx)({
                                id: this.props.id,
                                roleId
                            })
                        }}
                    />
                </div>
                <div>
                    <Button
                        type={'button'}
                        icon={this.props.removing ? spinner : close}
                        className={css`
                            height: 38px;
                        `}
                        onClick={this.handleRemove}
                    >
                        {this.props.removing ? 'Removing...' : 'Remove'}
                    </Button>
                </div>
            </ShareItem>
        )
    }

    handleRemove = async () => {

        alert('Remove collaborator')
    }
}

CollaboratorItem = connect((state, props) => {

    const collaborator = state.getIn(['collaboratorsById', props.id])

    const user = state.getIn(['usersById', collaborator.get('userId')])

    return {
        collaborator,
        user,
        isCurrentUser: state.get('userId') === collaborator.get('userId')
    }
})(CollaboratorItem)

const roles = [{
    id: 'creator',
    name: 'Creator'
}, {
    id: 'editor',
    name: 'Editor'
}, {
    id: 'readOnly',
    name: 'Read only'
}]

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

class Example extends React.Component {


    state = {
        invitations: [],
        collaborators: [],
        email: '',
        roleId: 'creator'
    }

    render() {

        return (
                <Box>
                    <div
                        className={css`
                        margin-bottom: 50px;
                    `}
                    >
                        <h2>
                            Invite user by email
                        </h2>
                        <form onSubmit={this.handleSendInvite}>
                            <div
                                className={css`
                        display: flex;
                        margin-bottom: 30px;
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
                                        value={this.state.email}
                                        onChange={this.handleChangeEmail}
                                    />
                                </div>
                                <div
                                    className={css`
                            width: 160px;
                            margin-right: 8px;
                        `}
                                >
                                    <Select
                                        value={this.state.roleId}
                                        alignLeft={true}
                                        options={roles}
                                        onChange={({value: roleId}) => {

                                            this.setState({
                                                roleId
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type={'submit'}
                                        primary
                                        icon={this.props.sendingInvite ? spinner : mail}
                                        className={css`
                                height: 38px;
                            `}
                                    >
                                        {this.props.sendingInvite ? 'Sending invite...' : 'Send invite'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className={css`
                        margin-bottom: 50px;
                    `}
                    >
                        <h2>
                            Invitations
                        </h2>
                        {this.props.invitations.isEmpty() ? (
                            <EmptyState>
                                Nobody is invited at the moment
                            </EmptyState>
                        ) : null}
                        {this.props.invitations.map(id => (
                            <div
                                key={id}
                                className={css`
                                margin-bottom: 16px;
                            `}
                            >
                                <InvitationItem
                                    id={id}
                                />
                            </div>
                        ))}
                    </div>
                    <h2>
                        Collaborators
                    </h2>
                    {this.props.collaborators.isEmpty() ? (
                        <EmptyState>
                            Nobody is collaborating at the moment
                        </EmptyState>
                    ) : null}
                    {this.props.collaborators.map(id => (
                        <div
                            key={id}
                            className={css`
                            margin-bottom: 24px;
                        `}
                        >
                            <CollaboratorItem
                                id={id}
                            />
                        </div>
                    ))}
                </Box>
        )
    }

    handleSendInvite = async (e) => {

        e.preventDefault()

        this.setState({
            email: '',
            roleId: 'creator'
        })
    }

    handleChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
}

Example = connect((state, props) => ({
    invitations: state.getIn(['applicationsById', props.applicationId, 'invitations']),
    collaborators: state.getIn(['applicationsById', props.applicationId, 'collaborators']),
}))(Example)

class Demo extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <Canvas>
                    <Heading>
                        One collaborator, no invitations
                    </Heading>
                    <Paragraph>
                        Invite users by email, remove invitations, update collaborator roles, remove collaborators
                    </Paragraph>
                    <Example applicationId={'app1'} />
                    <Heading>
                        Multiple collaborators, one invitation
                    </Heading>
                    <Paragraph>
                        Invite users by email, remove invitations, update collaborator roles, remove collaborators
                    </Paragraph>
                    <Example applicationId={'app2'} />
                </Canvas>
            </Provider>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
