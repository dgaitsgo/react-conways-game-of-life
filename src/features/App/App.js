import React, { Component } from 'react'
import Cell from 'utility/Cell'
import Map from 'utility/Map'
import './App.css'

class App extends Component {
	
	constructor () {
		
		super()
		this.state = {
			world : new Map(100, 100).newCellMap('empty'),
			play : false
		}

		this.timeout = null
	}

	pause = () =>
		this.setState({ play : false } , clearInterval(this.timeout))

	play = () => {
		if (!this.state.play)
			this.setState({ play : true })
	}

	clear = () =>
		this.setState({ world : new Map(100, 100).newCellMap('empty') })

	random = () =>
		this.setState({ world : new Map(100, 100).newCellMap('random') })


	calcNextGeneration = (currWorld) => {

		let nextWorld = new Map(currWorld.width, currWorld.height)
		
		for (let x = 0; x < currWorld.width; x++) {

			let row = []
			for (let y = 0; y < currWorld.height; y++) {

				let currCell = currWorld.cellMap[x][y]
				let neighbors = currWorld.getNeighbors(currCell)
				let nextCell = currCell.determineFate(neighbors)

				row.push(nextCell)
			}
			nextWorld.cellMap.push(row)
		}

		return (nextWorld)
	}

	nextGeneration = (currWorld) => {
		let nextWorld = this.calcNextGeneration(currWorld)
		this.setState({ world : nextWorld })
	}

	flipCell = (world, x, y) => {
		world.cellMap[x][y].alive = !world.cellMap[x][y].alive
		this.setState({ world })
	}

	cellActionController(type, x, y) {
		
		const { play } = this.state

		if (play)
			return ;
		else {
			if (type === 'click')
				this.setState({ clickingDown : true }, this.flipCell(this.state.world, x, y) )
			else if (type === 'mouseEnter')
				this.state.clickingDown && this.flipCell(this.state.world, x, y)
			else if (type === 'mouseUp')
				this.setState({ clickingDown : false })
		}

	}

	drawWorld = world =>
		<div className='cell-map'>
			{world.cellMap.map( (row, x) =>
				<div key={`row_${x}`} className='row'>
				{row.map( (cell, y) =>
					<div
						onMouseUp={ () => this.cellActionController('mouseUp')}
						onMouseEnter={ () => this.cellActionController('mouseEnter', x, y) }
						onMouseDown={ () => this.cellActionController('click', x, y) }
						key={`item_${x}_${y}`}
						className={`cell ${ cell.alive ? 'alive' : 'dead'}`}>
					</div>
				)}
				</div>
			)}
		</div>


	render() {

		const { world, play } = this.state
		
		if (play) {
			this.timeout = setTimeout( () => this.nextGeneration(world), 800 )
		}

		return (
			<div className='app-container'>
				
				{ this.drawWorld(world) }
				
				<div className='controls'>
					<button onClick={play ? this.pause : this.play}>{`${play ? 'Pause' : 'Play'}`}</button>
					<button disabled={play} onClick={() => this.nextGeneration(world)}>Step</button>
					<button disabled={play} onClick={this.clear}>Clear</button>
					<button disabled={play} onClick={this.random}>Random</button>
				</div>
			</div>
		)
	}
}

export default App
