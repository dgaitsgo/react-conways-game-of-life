import React, { Component } from 'react'
import {XYPlot, LineSeries, XAxis, YAxis } from 'react-vis'

import 'react-vis/dist/style.css'

class Spline extends Component {
	
	render() {
		
		const { width, height, data } = this.props
	    
	    return (
			<div className="data">
				<XYPlot height={300} width={600}>
					<XAxis title='Generation'/>
					<YAxis title='Population'/>
					<LineSeries
						animation={{ damping: 9, stiffness: 10 }}
						curve={'curveMonotoneX'}
						data={data} />
				</XYPlot>
			</div>
	    )
	}
}

export default Spline