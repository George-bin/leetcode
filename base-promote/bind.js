function bar () {
  console.log(this.name)
}

let f1 = {
  name: 'xiaoming'
};
let f2 = {
  name: 'xiaohong'
};

let a = bar.bind(f1);
let b = bar.bind(f2);
a();
b();
