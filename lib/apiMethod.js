function apiMethod(rules) {
    if (typeof rules !== 'object') {
        return console.log(
            `apiMethod error: parameters must be array {"method", function (req, res)}`
        );
    }
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (req.method === rule[i][0]) {
            rule[i][1]();
        }
    }
}

export { apiMethod };
