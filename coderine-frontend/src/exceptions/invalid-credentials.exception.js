class InvalidCredentialsException extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidCredentialsException'
        this.message = message
    }
}

export default InvalidCredentialsException