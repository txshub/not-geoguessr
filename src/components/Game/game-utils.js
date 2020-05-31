function checkRandomLocation (api) {
  return new Promise((resolve, reject) => {
    const service = new api.StreetViewService()
    const randomLocation = new api.LatLng(
      Math.random() * (90 + 90) - 90,
      Math.random() * (180 + 180) - 180
    )
    console.log('Trying for ', JSON.stringify(randomLocation))
    service.getPanorama({
      location: randomLocation,
      radius: 100000 // 100km
    }, (data, status) => {
      if (status === 'OK') {
        resolve(data.location.latLng)
      } else {
        reject(new Error('Invalid location'))
      }
    })
  })
}

async function generateStreetViewLocation (api) {
  try {
    return await checkRandomLocation(api)
  } catch (error) {
    return generateStreetViewLocation(api)
  }
}

module.exports = { generateStreetViewLocation }
