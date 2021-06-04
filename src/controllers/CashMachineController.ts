import { validValue } from "../utils/validValue";
import { Request, Response } from "express";
import CashMachine from "../entities/CashMachine";

export default class CashMachineController {
    constructor(private readonly cashMachineService: CashMachine){}

    public withdraw = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { value } = req.body
            validValue(value)
            const response = this.cashMachineService.withdraw(value)
            return res.json(response)
        } catch (error) {
            return res.status(error.code || 500).json({ message: error.message})
        }
    } 
}