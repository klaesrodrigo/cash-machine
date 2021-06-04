import CashMachine from "../entities/CashMachine";
import { CashType, CashMapping } from "../entities/Cash";



export default class CashMachineService implements CashMachine {
    private availableCashAmount: CashType = {
        100: 100,
        50: 100,
        20: 100,
        10: 100
    }

    setAvailableCash(key: keyof CashType, value: number ): void { 
        this.availableCashAmount = {
            ...this.availableCashAmount,
            [key]: value
        }
    }

    getAvailableCash(key: keyof CashType): number{
        return this.availableCashAmount[key]
    }

    returnValue(cashTotalValue: number | undefined): number{
        return cashTotalValue ? cashTotalValue + 1: 1
    }

    verifyAndAddCurrencyCount(amount: number, cashValue: keyof CashType, cashTotal: CashType): number{
        const currency = CashMapping[cashValue]
        while(currency <= amount) {
            const value = this.returnValue(cashTotal[cashValue] )
            Object.assign(cashTotal, {[cashValue]: value})
            amount -= currency
        }

        return amount
    }

    protected calcAmountOfCash(availableCash: Array<keyof CashType> , amount: number): CashType{        
        const cashTotal: CashType = {} 
        availableCash.sort((a, b) => b - a)   
        availableCash.forEach(cashValue => {
            amount = this.verifyAndAddCurrencyCount(amount, cashValue, cashTotal)
        })

        return cashTotal
    }

    public withdraw(amount: number): CashType {
        const availableCash = [100, 50, 20, 10]
        return this.calcAmountOfCash(availableCash, amount)
    }
}