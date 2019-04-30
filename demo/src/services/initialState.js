import {fromJS} from 'immutable'

export default fromJS({
    applicationsById: {
        'app1': {
            invitations: [],
            collaborators: ['col1'],
        },
        'app2': {
            invitations: ['inv1'],
            collaborators: ['col1', 'col2', 'col3'],
        }
    },
    invitationsById: {
        inv1: {
            id: 'inv1',
            userId: 'usr4',
            roleId: 'creator'
        }
    },
    invitations: [
        'inv1'
    ],
    collaboratorsById: {
        col1: {
            id: 'col1',
            userId: 'usr1',
            roleId: 'creator'
        },
        col2: {
            id: 'col2',
            userId: 'usr2',
            roleId: 'editor'
        },
        col3: {
            id: 'col3',
            userId: 'usr3',
            roleId: 'readOnly'
        }
    },
    collaborators: [
        'col1'
    ],
    usersById: {
        'usr1': {
            id: 'usr1',
            imageUrl: 'http://i.pravatar.cc/300?v=1',
            displayName: 'Luke Skywalker',
            email: 'luke@mothership.io'
        },
        'usr2': {
            id: 'usr2',
            imageUrl: 'http://i.pravatar.cc/300?v=2',
            displayName: 'Leia Organa',
            email: 'leia@mothership.io'
        },
        'usr3': {
            id: 'usr3',
            imageUrl: 'http://i.pravatar.cc/300?v=3',
            displayName: 'R2-D2',
            email: 'r2d2@mothership.io'
        },
        'usr4': {
            id: 'usr3',
            imageUrl: 'http://i.pravatar.cc/300?v=4',
            displayName: 'Darth Vader',
            email: 'darth@mothership.io'
        }
    },
    users: [],
    userId: 'usr1'
})