module.exports = {
  bar: (res) => {
    return res.json({ bar: "We are open"})
  },
  foo: (req, res) => {
    return res.json({ some: 'Have some foo' })
  }
}