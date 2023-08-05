const paginate = (limit, pageNumber, list) => {
    return list.filter((_, index) => {
        const skip =  limit * (pageNumber - 1);
        console.log(skip)
        const slice = new Array(limit).fill().map((item, index2) => index2 + skip);
        return slice.includes(index);
    })
} 

module.exports = {
    paginate
}
