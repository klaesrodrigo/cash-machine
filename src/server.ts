import app from '../config/app'
import routes from './routes/cashMachineRoutes'
const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => console.log(`Running at ${port}`))