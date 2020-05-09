const res = require('./response')
module.exports = {
  bar: () => {
    return res.json({ bar: "Cheers!"})
  },
  foo: () => {
    return res.json({ some: 'Have some foos' })
  },
  user: (req) => {
    return res.json({ id: req.params.userId })
  },
  faviconFromURL: async (url) => {
    let favicon = await fetch(url)
      .then( resp => resp.arrayBuffer())
      .then( buff => {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buff));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return btoa(binary);
      })
    return res.image(favicon,'ico')
  }
}
