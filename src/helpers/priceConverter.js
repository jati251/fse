function convertPrice(price){
    // console.log(price, 'ini pricenya, helper')
    let process = price.split('.')[0]
    // console.log(process, 'ini processnya nge sp;litt, helper')
    let result = Number(process)
    // console.log(result, 'ini pricenya, helper')
    return result
}

export default convertPrice