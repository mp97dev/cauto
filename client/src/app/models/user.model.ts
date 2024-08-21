export enum Roles {
    IMPIEGATI = 'impiegato',
    SEGRETERIA = 'segreteria'
}

export class User {
    email: string
    username: string
    loggedIn: boolean = false
    roles: Roles[] = []
    imgUrl: string = ''
    token: string | null

    constructor(options?: Partial<User> ) {
        if(!options?.email) throw new Error('email is required for a user')
        if(!options?.username) throw new Error('username is required for a user')
        this.email = options.email
        this.username = options.username
        this.loggedIn = options?.loggedIn ?? false
        this.roles = options?.roles ?? []

        // try retrieve old token if user is no logged
        if(!options.token) this.token = localStorage.getItem('token') ?? null
        else {
            this.token = options.token
            localStorage.setItem('token', options.token)
        }
    }
}