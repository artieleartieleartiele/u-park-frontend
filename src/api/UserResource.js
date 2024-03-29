export default {
    getAll: () => fetch(
        "http://localhost:8080/api/users",
        {mode: 'cors'}
    ),
    createUser: (newUser) => fetch(
        "http://localhost:8080/api/users", {
            mode: 'cors',
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(newUser),
        }),
    checkCredential: (userInput) => fetch(
        "http://localhost:8080/api/users/login", {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            mode: 'cors',
            body: JSON.stringify(userInput)
        }),
    patchUserProfile: (id, userInfo) => fetch(
        "http://localhost:8080/api/users/" + id, {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            mode: 'cors',
            body: JSON.stringify(userInfo)
        }),
    topUpWallet: (userInfo) => fetch(
        "http://localhost:8080/api/users/wallet", {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            mode: 'cors',
            body: JSON.stringify(userInfo)
        }),
    getUserById: (id) => fetch(
        "http://localhost:8080/api/users/" + id,
        {mode: 'cors'}
    )    
}