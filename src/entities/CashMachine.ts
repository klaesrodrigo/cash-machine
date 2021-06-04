import { CashType } from "./Cash";

export default interface CashMachine {
    setAvailableCash(key: keyof CashType, value: number ): void;
    getAvailableCash(key: keyof CashType): number;
    withdraw(amount: number): CashType; 
} 