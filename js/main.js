(function convert() {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    const method = 'GET';
    const input = document.getElementById('firstInput');
    let result = document.querySelector('.result');
    let valutes = null;

    (async function converterVal() {
        const select1 = document.getElementById('first');
        const select2 = document.getElementById('second');

        const currencyVal = document.getElementById('currencyVal');

        let error = new Error('Error has happened');

        function calc(value = 1) {
            const fromValue = valutes[select1.value.toUpperCase()].Value;
            const toValue = valutes[select2.value.toUpperCase()].Value;
            return  +(value * (fromValue / toValue)).toFixed(4)
        }

        function startValutes() {
            const currencyFirst = document.getElementById('currencyFirst');
            const currencySecond = document.getElementById('currencySecond');
            currencyFirst.innerHTML = `1 ${select1.value.toUpperCase()}`;
            currencySecond.innerHTML = select2.value.toUpperCase();
        }

        try {
            const request = await fetch(url, {method});
            let data = await request.json();
            valutes = data.Valute;
            input.addEventListener('keyup', function (e) {
                result.innerHTML = calc(e.target.value);
            });
            startValutes();
            currencyVal.innerHTML = calc();
            [select1, select2].forEach(item => {
                item.addEventListener('change', function (e) {
                    result.innerHTML = calc(input.value);
                    currencyVal.innerHTML = calc();
                    startValutes();
                })
            })
        }
        catch (e) {
            console.log(error)
        }
    })();
})();








