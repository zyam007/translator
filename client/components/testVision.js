async function quickstart() {
  const vision = require('@google-cloud/vision')
  const client = new vision.ImageAnnotatorClient()
  const [result] = await client.textDetection(
    `https://media2.giphy.com/media/Oa1OQs28YCI5nWIljD/giphy.gif?cid=dbc4d0b8z71a4xrhcts7qqsui3fe1tu1z96767rt81vggm64&rid=giphy.gif`
  )
  const detections = result.textAnnotations
  console.log('Text:')
  detections.forEach(text => console.log(text))
}
quickstart()
