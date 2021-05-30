import mockResponse from './event_data'

async function _delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

export const getData = async () => {
  // await _delay(2000) // simulate loading for 2 seconds
  await _delay(10) // simulate loading for 2 seconds
  return mockResponse.mockResponse.events
}
