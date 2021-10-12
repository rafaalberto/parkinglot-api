import GetParkingLotUseCase from '../core/usecase/GetParkingLoteUseCase'
import ParkingLotRepositorySQL from '../infra/repository/ParkingLotRepositorySQL'

export default class ParkingLotController {
  static async getParkingLot (params: any, body: any) {
    const parkingLotRepository = new ParkingLotRepositorySQL()
    const getParkingLotUseCase = new GetParkingLotUseCase(parkingLotRepository)
    const parkingLot = await getParkingLotUseCase.execute(params.code)
    return parkingLot
  }
}
