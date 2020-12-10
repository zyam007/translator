async function gifToText(url) {
  const vision = require('@google-cloud/vision')
  const client = new vision.ImageAnnotatorClient()
  const [result] = await client.textDetection(url)
  const detections = result.textAnnotations[0].description
  const phrase = detections.replace(/\n/g, ' ')
  console.log('In func:', typeof phrase)
}

let text =
  'https://media3.giphy.com/media/3o752drwtVEW6hSMla/giphy.gif?cid=ecf05e47ff7f42f58d2e1c9540ee5db86d8544f21b96d6b6&rid=giphy.gif'

let result = gifToText(text).toString()
console.log('Result:', typeof result)

//node client/components/testVision.js
