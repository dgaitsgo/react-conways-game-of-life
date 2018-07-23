import { headsOrTails } from 'utility/random'
import Cell from './Cell'

class Map {

	constructor(width, height) {
		this.width = width
		this.height = height
		this.generation = 0
		this.population = 0
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

	calcNextGeneration = () => {

		let nextWorld = new Map(this.width, this.height)
		
		for (let x = 0; x < this.width; x++) {

			let row = []
			for (let y = 0; y < this.height; y++) {

				let currCell = this.cellMap[x][y]
				let neighbors = this.getNeighbors(currCell)
				let nextCell = currCell.determineFate(neighbors)

				nextCell.alive && nextWorld.population++
				row.push(nextCell)
			}
			nextWorld.cellMap.push(row)
		}

		nextWorld.generation = this.generation + 1

		return (nextWorld)
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