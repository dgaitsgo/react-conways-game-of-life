class History {

	constructor(max) {
		this.max = max
		this.length = 0
		this.data = []
	}

	add = record => {

		this.length < this.max ? this.length++ : this.data.shift(0)
		this.data.push(record)
		return this
	}
}

export default History