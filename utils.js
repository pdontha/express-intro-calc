const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  try {
      result = strNums.map(el=> {
        let intEl = parseInt(el);
        if (!intEl) throw new BadRequestError(`${el} is not a number`);
        return intEl;
      })
      return result;
  } catch(err){
      return err;
  }
}


module.exports = { convertStrNums };