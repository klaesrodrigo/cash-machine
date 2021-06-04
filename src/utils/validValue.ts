import ErrorHandler from "../helpers/ErrorHandler"

export const validValue = (value: number): void => {
    if(value % 10 !== 0){
        throw new ErrorHandler("É possível apenas sacar valores multiplos de 10.", 400)
    }
}