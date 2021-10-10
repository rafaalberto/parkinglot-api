import EnterParkingLotUseCase from '../src/core/usecase/EnterParkingLotUseCase'
import GetParkingLotUseCase from '../src/core/usecase/GetParkingLoteUseCase'
import ParkingLotRepositoryMemory from '../src/infra/repository/ParkingLotRepositoryMemory'

test('Should enter parking lot', async () => {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingUseCase = new EnterParkingLotUseCase(
    parkingLotRepositoryMemory
  )
  const getParkingLotUseCase = new GetParkingLotUseCase(
    parkingLotRepositoryMemory
  )

  const parkingLotBeforeEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

  await enterParkingUseCase.execute('mall', 'ABC-1234', new Date('2021-10-10 09:00:00'))

  const parkingLotAfterEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})

test('Should throw error when parking lot is closed', async () => {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingUseCase = new EnterParkingLotUseCase(
    parkingLotRepositoryMemory
  )
  const getParkingLotUseCase = new GetParkingLotUseCase(
    parkingLotRepositoryMemory
  )

  const parkingLotBeforeEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

  expect(async () => {
    await enterParkingUseCase.execute('mall', 'ABC-1234', new Date('2021-10-10 19:00:00'))
  }).rejects.toThrowError('Parking Lot is closed')
})

test('Should throw error when parking lot is full', async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingUseCase = new EnterParkingLotUseCase(
    parkingLotRepositoryMemory
  )
  const getParkingLotUseCase = new GetParkingLotUseCase(
    parkingLotRepositoryMemory
  )

  const parkingLotBeforeEnter = await getParkingLotUseCase.execute('mall')
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

  await enterParkingUseCase.execute('mall', 'ABC-1234', new Date('2021-10-10 09:00:00'))
  await enterParkingUseCase.execute('mall', 'ABC-1235', new Date('2021-10-10 09:05:00'))
  await enterParkingUseCase.execute('mall', 'ABC-1236', new Date('2021-10-10 09:10:00'))
  await enterParkingUseCase.execute('mall', 'ABC-1237', new Date('2021-10-10 09:15:00'))
  await enterParkingUseCase.execute('mall', 'ABC-1237', new Date('2021-10-10 09:20:00'))

  expect(async () => {
    await enterParkingUseCase.execute('mall', 'ABC-1238', new Date('2021-10-10 09:25:00'))
  }).rejects.toThrowError('Parking Lot is full')
})
