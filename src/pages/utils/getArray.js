const getArray = (len = 10) => {
    let arr = []
    for (let i =0; i < len ; i ++){
        arr.push(i)
    }
    return arr
}

export {
    getArray
}