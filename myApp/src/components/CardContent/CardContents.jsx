

import style from './CardContents.module.scss'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {

		return (
			<>
				
			</>
		)
	}

	return <AccessoriesContent />
}
const createGasolineContent = () => {
	const GasolineContent = () => {
		
		return (
			<>
			
			</>
		)
	}

	return <GasolineContent />
}
const createSparesContent = () => {
	const SparesContent = () => {
		
		return (
			<>
				
			</>
		)
	}

	return <SparesContent />
}
const CardContents = {
	accessories: createAccessoriesContent(),
	gasoline: createGasolineContent(),
	spares: createSparesContent(),
}

export default CardContents
