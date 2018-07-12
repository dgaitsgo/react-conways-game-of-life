export const headsOrTails = () => Math.random() >= 0.5

export const randomInt = max => Math.random() * Math.floor(max)

export const randomColor = () => ({
	r : randomInt(255),
	g : randomInt(255),
	b : randomInt(255),
	a : 1.0
})