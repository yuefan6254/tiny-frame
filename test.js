function* myGenerator() {
  let a = yield Promise.resolve(1);
  let b = yield Promise.resolve(2);
  let c = yield Promise.resolve(3);
  return a + b + c;
}

run(myGenerator).then(res => {
  console.log('mygenerator函数的结果,', res); // mygenerator函数的结果, 6
})

//实现run方法
function run(generator) {
  return new Promise((resolve, reject) => {
      let it = generator();
      const next = (newValue) => {
          let {value, done} = it.next(newValue);
          if (!done) {
              Promise.resolve(value).then(next); 
              // 用Promise.resolve包裹value值是预防yield后面为primitive值的情况
          } else {
              resolve(value)
          }
      }
      next();
  })
}
console.log('fdjsjkdf');
run(myGenerator);
console.log("jdjlksdf");