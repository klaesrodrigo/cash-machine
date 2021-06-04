import { makeCashMachine } from '../factories/CashMachineFactory'
import { Router} from 'express'

const cashMachine = makeCashMachine()

const routes = Router()

routes.post('/withdraw', cashMachine.withdraw)

export default routes