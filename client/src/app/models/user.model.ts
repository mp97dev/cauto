export enum Roles {
    ADMIN = 'admin'
}

export class User {
    loggedIn: boolean = false
    roles: Roles[] = []

    constructor(options?: Partial<User> ) {
        this.loggedIn = options?.loggedIn ?? false
        this.roles = options?.roles ?? []
    }
}