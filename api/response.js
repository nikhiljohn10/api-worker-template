const json_header = { 'Content-Type': 'application/json' }
module.exports = {
  json: (body = {}) => {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: json_header
    })
  },
  image: async (data, type = "png") => {
    let mime = await fetch('https://ddnslab.tech/status/?mime=' + type, { headers: json_header })
      .then(response => response.json())
      .then(data => data.mime.mime_code)
      .catch((error) => { console.error('Error:', error); return "image/png"; })
    let headers = new Headers({ 'Content-Type': mime })
    let image = new Buffer(data, 'base64')
    let response = new Response(image, { status: 200, headers: headers })
    return response
  },
  error: async (status, message = "") => {
    var statusText = message
    if (!statusText) {
      await fetch('https://ddnslab.tech/status/?code=' + status)
        .then(response => response.json())
        .then(function(data) { statusText = data.status.status_text })
        .catch((error) => { console.error('Error:', error); statusText = error; })
    }
    return new Response(JSON.stringify({ error: { code: status, message: statusText }}), {
      status: status,
      headers: json_header
    })
  }
}
