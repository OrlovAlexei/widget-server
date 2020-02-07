export class JwtUser {
    constructor(
        public readonly id: string,
        public readonly roles: string[] = []
    ) {

    }
}
