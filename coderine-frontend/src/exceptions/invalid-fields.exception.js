class InvalidFieldsException extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidFieldsException'
        this.message = message
    }
}

export default InvalidFieldsException

