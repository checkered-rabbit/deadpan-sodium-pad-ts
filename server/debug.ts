let delaying = Number(process.env.DELAY || 2500);

export const delay = <T, U extends Array<T>, V>(fn: (...args: U) => void, ...args: U): void => {
  if (delaying) {    
    setTimeout(function(){
      fn(...args);
    },delaying);
  } else {
    fn(...args);
  }
}

//console.log(delay.toString());
