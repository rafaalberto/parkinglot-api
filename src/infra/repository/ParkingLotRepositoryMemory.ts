import ParkingLotAdapter from '../../adapter/ParkingLotAdapter'
import ParkedCar from '../../core/entity/ParkedCar'
import ParkingLot from '../../core/entity/ParkingLot'
import ParkingLotRepository from '../../core/repository/ParkingLotRepository'

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
  parkingLots = [
    {
      code: 'mall',
      capacity: 5,
      open_hour: 8,
      close_hour: 18
    }
  ]

  parkedCars: Array<ParkedCar> = []

  getParkintLot (code: string): Promise<ParkingLot> {
    const parkingLotData = this.parkingLots.find((item) => item.code === code)
    const occupiedSpaces = this.parkedCars.length
    const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces)
    return Promise.resolve(parkingLot)
  }

  parkCar (code: string, plate: string, date: Date): void {
    this.parkedCars.push({ code, plate, date })
  }
}
