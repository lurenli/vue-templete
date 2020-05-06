// 1.工厂模式
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        alert(this.name);
    }

    return o;
}
var person1 = createPerson("DJL1", 22, "student1");
var person2 = createPerson("DJL2", 22, "student2");

alert(typeof createPerson("DJL2", 22, "student2"));//object

// 2.构造函数模式


function CreatePerson(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    }
}

var person1 = new CreatePerson("DJL1", 22, "student1");
var person2 = new CreatePerson("DJL2", 22, "student2");
alert(person1 instanceof CreatePerson);//true

new
    1创建新的对象

2 将构造函数的作用域赋给新对象（因此this就指向了新对象）

3 执行构造函数中的代码

4 返回新对象

3.原型模式

function CreatePerson() {

}

CreatePerson.prototype.name = "DJL";
CreatePerson.prototype.age = 22;
CreatePerson.prototype.job = "student";
CreatePerson.prototype.sayName = function () {
    alert(this.name);
}

var person1 = new CreatePerson();
person1.sayName();
var person2 = new CreatePerson();
person2.sayName();
alert(person1.sayName == person2.sayName);//true