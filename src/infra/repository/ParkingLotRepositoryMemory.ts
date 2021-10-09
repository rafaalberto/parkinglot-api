import ParkedCar from '../../core/entity/ParkedCar'
import ParkingLot from '../../core/entity/ParkingLot'
import ParkingLotRepository from '../../core/repository/ParkingLotRepository'

export default class ParkingLotRepositoryMemory
implements ParkingLotRepository {
  parkingLots: Array<ParkingLot> = [new ParkingLot('mall', 5, 8, 18, 0)]

  parkedCars: Array<ParkedCar> = []

  getParkintLot (code: string): Promise<ParkingLot> {
    const parkingLot = this.parkingLots.find((item) => item.code === code)
    if (parkingLot) {
      parkingLot.occupiedSpaces = this.parkedCars.length
    }
    return Promise.resolve(parkingLot!)
  }

  parkCar (code: string, plate: string, date: Date): void {
    this.parkedCars.push({ code, plate, date })
  }
}
