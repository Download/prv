module.exports = () => {
	const p = new WeakMap()
	return o => {
		if (! p.has(o)) p.set(o, {})
		return p.get(o)
	}
}
