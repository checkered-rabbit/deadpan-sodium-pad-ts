let delaying = 5000;

export const delay = <T, U extends Array<T>, V>(fn: (...args: U) => void, ...args: U): void => {
  if (delaying) {    
    setTimeout(function(){
      fn(...args);
    },delaying);
  } else {
    fn(...args);
  }
}

