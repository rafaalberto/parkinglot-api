import ParkedCar from '../entity/ParkedCar'
import ParkingLot from '../entity/ParkingLot'
import ParkingLotRepository from '../repository/ParkingLotRepository'

export default class EnterParkingLotUseCase {
  parkingLotRepository: ParkingLotRepository;

  constructor (parkingLotRepository: ParkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository
  }

  async execute (code: string, plate: string, date: Date): Promise<ParkingLot> {
    const parkingLot = await this.parkingLotRepository.getParkintLot(code)
    const parkedCar = new ParkedCar(code, plate, date)
    this.validations(parkingLot, parkedCar)
    await this.parkingLotRepository.parkCar(parkedCar.code, parkedCar.plate, parkedCar.date)
    return parkingLot
  }

  private validations (parkingLot: ParkingLot, parkedCar: ParkedCar) {
    if (!parkingLot.isOpen(parkedCar.date)) {
      throw new Error('Parking Lot is closed')
    }
    if (parkingLot.isFull()) {
      throw new Error('Parking Lot is full')
    }
  }
}
