export class JwtUser {
    constructor(
        public readonly id: number,
        public readonly roles: string[] = []
    ) {

    }
}
