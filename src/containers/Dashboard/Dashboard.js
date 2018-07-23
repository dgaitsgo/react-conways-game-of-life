import React, { Component } from 'react'
import * as d3 from 'd3'
import Spline from './components/Spline'
import './Dashboard.css'

class Dashboard extends Component {
	
	constructor () {
		super()
	}

	getPopulations = history =>
		history.data.map(world => ({
			x : world.generation,
			y : world.population

		}))

	render() {

		const { history } = this.props
		
		let populationData = this.getPopulations(history)
		if (populationData.length === 0) {
			populationData[0] = {x : 0, y : 0}
		}

		return (
			<div className="data-viz">
				<Spline width={600} height={200} data={populationData} />
			</div>
		)
	}
}



export default Dashboard