// import randomColor from './randomColor'

class Cell {
	
	constructor(x, y, status, cod) {
		this.x = x,
		this.y = y,
		this.alive = status,
		this.cod = cod
	}

	countLivingNeighbors = neighbors => {

		let tally = 0
		
		for (let position in neighbors) {
			if (neighbors[position].alive) {
				tally++
			}
		}
		return (tally)
	}

	determineFate = neighbors => {

		const livingNeighbors = this.countLivingNeighbors(neighbors)
		
		if (this.alive) {
			if (livingNeighbors < 2) {
				this.alive = false
				this.cod = 'underpopulation'
			} else if (livingNeighbors > 3) {
				this.alive = false
				this.cod = 'overpopulation'
			}
		} else {
			
			//would be dope if colors were blended
			//of neighbors!

			if (livingNeighbors === 3) {
				this.alive = true
				this.cod = null
			}
		}

		return (this)
	}
}

export default Cell
