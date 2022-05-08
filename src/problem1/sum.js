var sum_to_n_a = function (n) {
    let res = 0;
    for (let i = 0; i < n; i++) {
        res = res + i;
    }
    return res;
};

var sum_to_n_b = function (n) {
    if (n == 0) {
        return 0;
    }
    return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
    return n * (n + 1) / 2;
};

console.log("a: " + sum_to_n_a(5));
console.log("b: " + sum_to_n_b(5));
console.log("c: " + sum_to_n_c(5));