import Express from 'express'
import ExpressAdapter from '../../adapter/ExpressAdapter'
import ParkingLotController from '../../controller/ParkingLotController'
const app = new Express()

app.get('/parking-lot/:code', ExpressAdapter.create(ParkingLotController.getParkingLot))

app.listen(3000)
