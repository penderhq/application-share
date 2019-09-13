import React from 'react'
import { Provider, connect } from 'react-redux'
import { css } from 'emotion'
import { render } from 'react-dom'
import { injectGlobal } from 'emotion'
import { Canvas, Heading, Paragraph, Box } from '@pndr/demo-utils'
import createStore from './services/createStore'
import InvitationItem from '../../src/InvitationItem'
import CollaboratorItem from '../../src/CollaboratorItem'
import EmptyState from '../../src/EmptyState'
import InviteForm from '../../src/InviteForm'

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

const ConnectedInvitationItem = connect((state, props) => {

    const invitation = state.getIn(['invitationsById', props.id])

    const user = state.getIn(['usersById', invitation.get('userId')])

    return {
        imageUrl: user.get('imageUrl'),
        name: user.get('displayName'),
        description: user.get('email'),
        roleId: invitation.get('roleId')
    }
})(InvitationItem)

const ConnectedCollaboratorItem = connect((state, props) => {

    const collaborator = state.getIn(['collaboratorsById', props.id])

    const user = state.getIn(['usersById', collaborator.get('userId')])

    const isCurrentUser = state.get('userId') === collaborator.get('userId')

    return {
        imageUrl: user.get('imageUrl'),
        name: user.get('displayName'),
        description: user.get('email'),
        roleId: collaborator.get('roleId'),
        updateRoleDisabled: isCurrentUser
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
                    <InviteForm
                        roles={roles}
                        email={this.state.email}
                        roleId={this.state.roleId}
                        error={this.props.error} Î
                        onEmailChange={({ value }) => this.setState({ email: value })}
                        onRoleIdChange={({ value }) => this.setState({ roleId: value })}
                        onSubmit={this.handleSubmit}
                        sending={this.props.sending}
                    />
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
                                margin-bottom: 24px;
                            `}
                        >
                            <ConnectedInvitationItem
                                id={id}
                                roles={roles}
                                onRoleIdChange={this.handleInvitationRoleIdChange}
                                onRemove={this.handleInvitationRemove}
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
                        <ConnectedCollaboratorItem
                            id={id}
                            roles={roles}
                            onRoleIdChange={this.handleCollaboratorRoleIdChange}
                            onRemove={this.handleCollaboratorRemove}
                        />
                    </div>
                ))}
            </Box>
        )
    }

    handleInvitationRoleIdChange = ({ id, value }) => {
        console.log('invitation role id change', { id, value })
    }

    handleCollaboratorRoleIdChange = ({ id, value }) => {
        console.log('collaborator role id change', { id, value })
    }

    handleInvitationRemove = ({ id }) => {
        console.log('invitation remove', { id })
    }

    handleCollaboratorRemove = ({ id }) => {
        console.log('collaborator remove', { id })
    }

    handleSubmit = async (e) => {

        e.preventDefault()

        this.setState({
            email: '',
            roleId: 'creator'
        })
    }

    handleChangeEmail = ({ value: email }) => {
        this.setState({
            email
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
                        Sending state
                    </Heading>
                    <Paragraph>
                        User has been invited, request pendign
                    </Paragraph>
                    <Example
                        applicationId={'app1'}
                        sending={true}
                    />
                    <Heading>
                        Multiple collaborators, one invitation
                    </Heading>
                    <Paragraph>
                        Invite users by email, remove invitations, update collaborator roles, remove collaborators
                    </Paragraph>
                    <Example applicationId={'app2'} />
                    <Heading>
                        With error
                    </Heading>
                    <Paragraph>
                        This emailaddress has already been invited
                    </Paragraph>
                    <Example
                        applicationId={'app2'}
                        error={'This emailaddress has already been invited'}
                    />
                    <Paragraph>
                        A user with this emailaddress is already collaborating
                    </Paragraph>
                    <Example
                        applicationId={'app2'}
                        error={'A user with this emailaddress is already collaborating'}
                    />
                    <Paragraph>
                        The emailaddress is not valid
                    </Paragraph>
                    <Example
                        applicationId={'app2'}
                        error={'The emailaddress is not valid'}
                    />
                </Canvas>
            </Provider>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
