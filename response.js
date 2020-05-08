class WorkerResponse {
  constructor() {
    this.htmlHeader = { status: 200, headers: { "content-type": "text/html" } }
    this.jsonHeader = { status: 200, headers: { "content-type": "application/json" } }
  }

  async status(status, message = ""){
    var statusText = message
    if(!statusText) {
      await fetch('https://nikz.in/statuscode?code='+status)
        .then(response => response.json())
        .then(function(data) { statusText = data })
    }
    return new Response(JSON.stringify({error: statusText}), {
      status: status,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  html(body = '<h1></h1>') {
    return new Response(body, this.htmlHeader)
  }

  json(body = {}) {
    return new Response(JSON.stringify(body), this.jsonHeader)
  }
}

module.exports = WorkerResponse
