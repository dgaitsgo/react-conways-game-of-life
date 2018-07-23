import React from 'react'

const GameGrid = ({ world, controller }) =>
	<div className='cell-map'>
		{world.cellMap.map( (row, x) =>
			<div key={`row_${x}`} className='row'>
			{row.map( (cell, y) =>
				<div
					onMouseUp={ () => controller('mouseUp')}
					onMouseEnter={ () => controller('mouseEnter', x, y) }
					onMouseDown={ () => controller('click', x, y) }
					key={`item_${x}_${y}`}
					className={`cell ${ cell.alive ? 'alive' : 'dead'}`}>
				</div>
			)}
			</div>
		)}
	</div>

export default GameGrid