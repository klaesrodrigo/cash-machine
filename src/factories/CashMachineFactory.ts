import CashMachineController from "../controllers/CashMachineController"
import { CashMachineService } from "../services/CashMachineService"

export const makeCashMachine = (): CashMachineController => {
    const cashMachineService = new CashMachineService()
    return new CashMachineController(cashMachineService)
}