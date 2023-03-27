export class Validators {
    static required(value ='') {
        return value && value.trim()// if str != nothing => return str
    }

    static minLength(length) {
        return value => {
            return  value.length >= length
        }
    }
}