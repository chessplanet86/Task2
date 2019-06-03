var app = new Vue({
    el: "#app",
    data() {
        return {
            column: '',
            row: '',
            loc: 'D3',
            allowable: [],
            conclusion: '',
            error: false
        }
    },
    methods: {
        coordinates() {
            this.error = false;
            var newColumn = 0;
            var newRow = '';
            this.column = this.loc[0]; // координата по вертикали (буква A, В, C, D, E, F, G, H)
            this.row = Number(this.loc[1]); // Координата по горизонтали (цифра от 1 до 8)
            if (this.loc[0] >= 'A' && this.loc[0] <= 'H' && this.row > 0 && this.row < 9) {
                var A = this.loc[0].charCodeAt(0); // Получаем код симовла, но можно и без этого.
                this.allowable.length = 0; // обнуляем массив, чтобы каждый раз выводились только варианты для каждой клетки и не было мусора
                this.conclusion = ''; // обнуляем строку, чтобы вывод был чистым и не засорялся
                for (var i = 1; i < 3; i++) {
                    //Условие на поиск нижних возможных клеток, куда может попасть конь
                    if (this.row - i > 0) {
                        newRow = this.row - i;
                        if ((A - (3 - i)) > 64) {
                            newColumn = A - (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                        if ((A + (3 - i)) < 73) {
                            newColumn = A + (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                    }
                    if (this.row + i < 9) {
                        newRow = this.row + i;

                        if ((A - (3 - i)) > 64) {
                            newColumn = A - (3 - i);

                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }

                        if ((A + (3 - i)) < 73) {
                            newColumn = A + (3 - i);

                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                    }
                }

                this.allowable.forEach(element => {
                    this.conclusion += element + ' ';
                });

                alert('Возможные варианты хода: ' + this.conclusion);

            } else {
                
                this.error = true;
                this.notification = 'Вы ввели: '+ this.loc+'\nПервая координата должна быть латинской буквой (Возможные варианты: A, B, C, D, E, F, G, H).\nВторая координата должна быть цифрой от 1 до 8.';
                this.conclusion = 'Ошибка'
                this.loc='';
            }
        }
    }
})