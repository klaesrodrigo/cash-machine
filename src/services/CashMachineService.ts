import CashMachine from "../entities/CashMachine";
import { CashType, CashMapping } from "../entities/Cash";

export class CashMachineService implements CashMachine {
    private availableCashAmount: CashType = {
        100: 100,
        50: 100,
        20: 100,
        10: 100
    }

    setAvailableCash = (key: keyof CashType, value: number ): void => { 
        this.availableCashAmount = {
            ...this.availableCashAmount,
            [key]: value
        }
    }

    getAvailableCash = (key: keyof CashType): number => {
        return this.availableCashAmount[key]
    }

    checkAmountOfBanknotesAvailable = (currency: keyof CashType): boolean => {
        const amount = this.getAvailableCash(currency)
        return amount > 0
    }

    returnValue = (cashTotalValue: number | undefined): number => {
        return cashTotalValue ? cashTotalValue + 1: 1
    }

    verifyAndAddBanknotesCount = (amount: number, cashValue: keyof CashType, cashTotal: CashType): number => {
        const currency = CashMapping[cashValue]
        while(currency <= amount) {
            if(!this.checkAmountOfBanknotesAvailable(currency)){
                break;
            }

            const value = this.returnValue(cashTotal[cashValue] )
            Object.assign(cashTotal, {[cashValue]: value})
            amount -= currency
        }

        return amount
    }

    protected calcAmountOfCash = (banknotes: Array<keyof CashType> , amount: number): CashType => {        
        const cashTotal: CashType = {} 
        banknotes.sort((a, b) => b - a)   
        banknotes.forEach(cashValue => {
            amount = this.verifyAndAddBanknotesCount(amount, cashValue, cashTotal)
        })

        return cashTotal
    }

    public withdraw = (amount: number): CashType => {
        const banknotes = [100, 50, 20, 10]
        return this.calcAmountOfCash(banknotes, amount)
    }
}