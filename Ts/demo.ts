// interface Point {
//     x: number;
//     y: number;
// }

// function tsDemo(data: Point) {
//     console.log('123');
//     return Math.sqrt(data.x ** 2 + data.y ** 2);
// }
// class Person {}
// const numbers: number[] = [1, 2, 3];
// tsDemo({ x: 1, y: 2 });

// const hufangyi: Person = new Person();
// const getTotal: () => number = () => {
//     return 123;
// };

//type annotation 类型注解,我们来告诉 TS 变量是什么类型
// type inference 类型推断，TS会自动的去尝试分析变量的类型
// 如果 TS 能够自动分析变量类型，我们就什么也不需要做了
// 如果 TS分析无法变量类型的话，我们就需要使用类型注解
// let count: number;
// count = 123;
// let conutInference = 123;

// 定义函数

// function add(first: number, second: number): number {
//     return first + second;
// }
// const total = add(1, 2);
// function sayHello(): void {
//     console.log('hello');
// }
// function errorEmitter(): never {
//     throw new Error();
//     console.log(2);
// }

function add({ first, second }: { first: number; second: number }): number {
    return first + second;
}
const total = add({ first: 1, second: 2 });
