
export const handleShowAddImage = (setAddImage, addImage) => {
	setAddImage(!addImage)
}
export const handleResetImage = (setUserCarImage) => {
	setUserCarImage(null)
	localStorage.removeItem('userCarImage')
}