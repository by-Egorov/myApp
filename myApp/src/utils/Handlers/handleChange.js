 export const handleBrandChange = (event, setSelectedBrand, setSelectedModel) => {
    const brand = event.target.value
    setSelectedBrand(brand)
    setSelectedModel('')
}
 export const handleModelChange = (event, setSelectedModel) => {
     const model = event.target.value
     setSelectedModel(model)
 }
 export const handleYearChange = (event, setSelectedYear) => {
     const year = event.target.value
     setSelectedYear(year)
 }
 export const handleMileageChange = (event, setSelectedMileage) => {
     const mileage = event.target.value
     setSelectedMileage(mileage)
 }