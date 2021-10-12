import Hapi from '@hapi/hapi'
import HapiAdapter from '../../adapter/HapiAdapter'
import ParkingLotController from '../../controller/ParkingLotController'

const server = Hapi.server({
  port: 3001,
  host: 'localhost'
})

server.route({
  method: 'GET',
  path: '/parking-lot/{code}',
  handler: HapiAdapter.create(ParkingLotController.getParkingLot)
})

server.start()
