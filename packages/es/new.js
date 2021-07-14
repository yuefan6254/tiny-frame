function anew(fn) {
    let obj = Object.create(fn.prototype);
    const args = [].slice.call(arguments, 1);
    let res = fn.apply(obj, args);
    return res ? res : obj;
}

function bnew(fn){
    let obj = Object.setPrototypeOf({},fn.prototype);
}

module.exports = bnew;