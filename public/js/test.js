function functionOne() {
  console.log("function one");
}

setTimeout(function functionOne() {
  console.log("function two");
}, 3000);

functionOne();
