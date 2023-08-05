const list1 = new Array(10).fill();

const limit = 4;
const pageNumber = 2;

const skip =  limit * (pageNumber - 1);
const slice = new Array(limit).fill().map((item, index) => index + skip);

console.log(limit, pagenumber, skip)

