import ParkingLot from '../entity/ParkingLot'

export default interface ParkingLotRepository {
  getParkintLot(code: string): Promise<ParkingLot>;
  parkCar(code: string, plate: string, date: Date): void
}
