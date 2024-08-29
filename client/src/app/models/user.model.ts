export enum Roles {
    IMPIEGATI = 'impiegato',
    SEGRETERIA = 'segreteria'
}

export class User {
    username: string
    roles: Roles[] = []

    constructor(options?: Partial<User> ) {
        if(!options?.username) throw new Error('username is required for a user')
        this.username = options.username
        this.roles = options?.roles ?? []

        localStorage.setItem('token', JSON.stringify(this))
    }
}