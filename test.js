function fun() {
    try {
        1 / 0
    } catch (error) {
        throw error
    }
    return "success"
}

console.log(fun());


//javascript 搞笑图

// 代码大全2 

try {
    //无法捕捉异步异常
} catch (error) {
    
}