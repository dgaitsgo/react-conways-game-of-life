import React, { Component } from 'react'
import Cell from 'classes/Cell'
import Map from 'classes/Map'
import History from 'utility/History'
import Dashboard from 'containers/Dashboard'
import GameGrid from 'components/GameGrid'
import './App.css'

const width = 20
const height = 20
const maxHistory = 10

class App extends Component {
	
	constructor () {
		
		super()
		this.state = {
			history : new History(maxHistory),
			world : new Map(width, height).newCellMap('empty'),
			play : false,
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
		this.setState({ world : new Map(width, height).newCellMap('empty'), history : new History(maxHistory)})

	random = () =>
		this.setState({ world : new Map(width, height).newCellMap('random') })

	nextGeneration = (currWorld) => {
		
		const { history } = this.state
		let nextWorld = currWorld.calcNextGeneration()
		let nextHistory = history.add(currWorld)
		this.setState({ world : nextWorld, history : nextHistory })
	}

	flipCell = (world, x, y) => {
		world.cellMap[x][y].alive = !world.cellMap[x][y].alive
		this.setState({ world })
	}

	cellActionController = (type, x, y) => {
		
		const { play, clickingDown, world } = this.state

		if (play)
			return ;
		else {
			if (type === 'click')
				this.setState({ clickingDown : true }, this.flipCell(world, x, y) )
			else if (type === 'mouseEnter')
				clickingDown && this.flipCell(world, x, y)
			else if (type === 'mouseUp')
				this.setState({ clickingDown : false })
		}
	}

	render() {

		const { world, play, history } = this.state
		
		if (play) {
			this.timeout = setTimeout( () => this.nextGeneration(world), 500 )
		}

		return (
			<div className='app-container'>
				
				<GameGrid world={world} controller={this.cellActionController} />
				
				<div className='controls'>
					<button onClick={play ? this.pause : this.play}>{`${play ? 'Pause' : 'Play'}`}</button>
					<button disabled={play} onClick={() => this.nextGeneration(world)}>Step</button>
					<button disabled={play} onClick={this.clear}>Clear</button>
					<button disabled={play} onClick={this.random}>Random</button>
				</div>

				<Dashboard history={history} />
			</div>
		)
	}
}

export default App
