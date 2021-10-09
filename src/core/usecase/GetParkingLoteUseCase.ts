import ParkingLot from '../entity/ParkingLot'
import ParkingLotRepository from '../repository/ParkingLotRepository'

export default class GetParkingLotUseCase {
  parkingLotRepository: ParkingLotRepository;

  constructor (parkingLotRepository: ParkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository
  }

  execute (code: string): Promise<ParkingLot> {
    return this.parkingLotRepository.getParkintLot(code)
  }
}
