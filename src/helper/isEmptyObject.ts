
interface Arg {
  [key: string]: any;
}

export const isEmptyObject = (obj: Arg) => {
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}