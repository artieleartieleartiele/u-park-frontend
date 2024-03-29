import {connect} from 'react-redux'
import UserResource from "../api/UserResource";
import {UserProfileWrapper} from "../components/User/UserProfileWrapper";

const mapStateToProps = state => ({
    user: state.profileResource.user,
    users: state.registerResource.users
});

const mapDispatchToProps = dispatch => ({
    patchUserProfile: (id, userInfo) => {
        console.log(id);
        console.log(userInfo);
        return UserResource.patchUserProfile(id, userInfo)
            .then(res => res.json())
            .then(res => {
                sessionStorage['u-park-user-information'] = JSON.stringify(res);
            })
    },

    getAllUsers: () => {
        UserResource.getAll()
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'REFRESH',
                    payload: res
                })
            })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileWrapper)