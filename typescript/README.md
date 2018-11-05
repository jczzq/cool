# 快速上手

## 安装 TypeScript

```
npm install -g typescript
```

## 编译代码

```
tsc ./greeter.ts
```

## 类型注解

TypeScript 提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

```
function greeter(person: string) {
    return "Hello, " + person;
}
```

## 接口

在 TypeScript 里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句。

```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

# 类

TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。注意类和接口可以一起共作，开发者可以自行决定抽象的级别。

还要注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。

```
class Student {
   fullName: string;
   constructor(public firstName, public middleInitial, public lastName) {
       this.fullName = firstName + " " + middleInitial + " " + lastName;
   }
}

interface Person {
   firstName: string;
   lastName: string;
}

function greeter(person : Person) {
   return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

# 参考链接

https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html
