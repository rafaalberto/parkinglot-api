import EnterParkingLotUseCase from '../src/core/usecase/EnterParkingLotUseCase'
import GetParkingLotUseCase from '../src/core/usecase/GetParkingLoteUseCase'
import ParkingLotRepositoryMemory from '../src/infra/repository/ParkingLotRepositoryMemory'

test('Should enter parking lot', async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingUseCase = new EnterParkingLotUseCase(
    parkingLotRepositoryMemory
  )
  const getParkingLotUseCase = new GetParkingLotUseCase(
    parkingLotRepositoryMemory
  )

  const parkingLotBeforeEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

  await enterParkingUseCase.execute(
    'mall',
    'ABC-1234',
    new Date('2021-10-09 09:00:00')
  )

  const parkingLotAfterEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})
