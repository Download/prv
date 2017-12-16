const expect = require('chai').expect

const prv = require('./prv')

describe('prv()', () => {
	it('is a function', () => {
		expect(prv).to.be.a('function')
	})

	it('accepts no arguments', () => {
		expect(prv.length).to.eq(0)
	})

	it('returns an accessor function', () => {
		expect(prv()).to.be.a('function')
	})

	it('when called multiple times, returns a different accessor function each time', () => {
		expect(prv()).to.not.eq(prv())
	})

	describe('accessor(subject)', () => {
		const p1 = prv()
		const p2 = prv()
		const o1 = {}
		const o2 = {}
		
		it('accepts 1 argument', () => {
			expect(p1.length).to.eq(1)
		})

		it('returns an object', () => {
			expect(p1(o1)).to.be.an('object')
		})

		it('returns the same result for the same subject', () => {
			const result = p1(o1)
			expect(p1(o1)).to.eq(result)
		})

		it('returns different results for different subjects', () => {
			const result = p1(o1)
			expect(p1(o2)).to.not.eq(result)
		})

		it('can be used to store private data for objects', () => {
			const p = prv()
			class Point {
				constructor(x, y) {
					p(this).x = x
					p(this).y = y
				}
				get x() {
					return p(this).x
				}
				get y() {
					return p(this).y
				}
			}
			const point = new Point(0,0)
			expect(point).to.be.an('object')
			expect(point.x).to.eq(0)
			expect(point.y).to.eq(0)
			point.x = 10
			expect(point.x).to.eq(0)
		})
	})
})