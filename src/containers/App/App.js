import React, { Component } from 'react'
import Cell from 'classes/Cell'
import Map from 'classes/Map'
import GameGrid from 'components/GameGrid'
import './App.css'
import * as d3 from 'd3'

function drawGraph(ext) {

	function nextGeneration (currWorld) {
		return (currWorld.calcNextGeneration())
	}

	function setupWorlds(n, width, height) {
		
		let worlds = []
		
		for (var i = 0; i < n; i++) {
			if (i === n - 1)
				worlds.push(new Map(width, height).newCellMap('random'))
			else
				worlds.push(new Map(width, height).newCellMap('empty'))
		}
		return (worlds)
	}

	var n = 10

	let worlds = setupWorlds(n, 20, 20)

	var margin = {
		top : 20,
		right : 20,
		bottom : 20,
		left : 20
	}

	var width = 800
	var height = 600
	var horizontalMargin = margin.left + margin.right
	var verticalMargin = margin.top + margin.bottom
	var plotAreaWidth = width + horizontalMargin
	var plotAreaHeight = height + verticalMargin

	var svg = d3.select('body')
		.append('svg')
		.attr('width', plotAreaWidth)
		.attr('height', plotAreaHeight)


	var graph = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	var xScale = d3.scaleLinear()
		.domain([0, n - 1])
		.range([0, width])

	var yScale = d3.scaleLinear()
		.domain([0, 180])
		.range([height, 0])

	var line = d3.line()
		.x( (d, i) => xScale(i) )
		.y( (d, i) => yScale(d.population) )

	graph.append('defs').append('clipPath')
		.attr('id', 'clip')
		.append('rect')
			.attr('width', width)
			.attr('height', height)

	graph.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', `translate(0, ${yScale(0)})`)
		.call(d3.axisBottom(xScale))

	graph.append('g')
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(yScale))

	graph.append('g')
		.attr('clip-path', 'url(#clip)')
		.append('path')
			.datum(worlds)
			.attr('class', 'line')
			.transition()
			.duration(1000)
			.ease(d3.easeLinear)
			.on('start', tick)

	function tick() {

		worlds.push(nextGeneration(worlds[worlds.length - 1]))

		d3.select(this)
			.attr('d', line)
			.attr('transform', null)

		d3.active(this)
			.attr('transform', `translate(${xScale(-1)}, 0)`)
			.transition()
			.on('start', tick)

		worlds.shift()

		ext.setState({ worlds })
	}
}


class App extends Component {


	constructor () {
		
		super()
		this.state = {
			play : false,
		}

		// this.worlds = this.setupWorlds()
		this.timeout = null
	}

	componentDidMount() {
		drawGraph(this)
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

		const { play, history, worlds } = this.state

		return (
			<div className='app-container'>

				{worlds && <GameGrid world={worlds[worlds.length - 1]} controller={this.cellActionController} /> }
				
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
