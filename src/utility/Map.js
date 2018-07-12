import { headsOrTails } from './random'
import Cell from './Cell'

class Map {

	constructor(width, height) {
		this.width = width
		this.height = height
		this.cellMap = []
	}

	getCell = (x, y) => {

		let wrappedX, wrappedY

		wrappedX = x === -1
		? this.width - 1
		: (x === this.width)
		? 0
		: x

		wrappedY = y === -1
		? this.height - 1
		: (y === this.height)
		? 0
		: y

		return (this.cellMap[wrappedX][wrappedY])

	}

	newCellMap = (option) => {
		
		for (let x = 0; x < this.width; x++) {
			
			let row = []
			
			for (let y = 0; y < this.height; y++) {

				row.push(new Cell(x, y, option === 'random' ? headsOrTails() : false, null))
			}
			this.cellMap.push(row)
		}

		return (this)
	}

	getNeighbors = ({ x, y }) => ({

		left : this.getCell(x - 1, y),
		ulc : this.getCell(x - 1, y - 1),
		top : this.getCell(x, y - 1),
		urc : this.getCell(x + 1, y - 1),
		right : this.getCell(x + 1, y),
		brc : this.getCell(x + 1, y + 1),
		bottom : this.getCell(x, y + 1),
		blc : this.getCell(x - 1, y + 1)	
	})

}

export default Map