export enum Roles {
    IMPIEGATI = 'impiegato',
    SEGRETERIA = 'segreteria'
}

export class User {
    username: string
    role: Roles | null = null

    constructor(options?: Partial<User> ) {
        if(!options?.username) throw new Error('username is required for a user')
        this.username = options.username
        this.role = options?.role ?? null

        localStorage.setItem('auth-session', JSON.stringify(this))
    }
}