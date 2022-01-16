const app = new Vue({
    el  : '#app',
    data: {
        temp   : '',
        operand: '',
        value1 : '',
        value2 : '',
        result : '',
        pressed: '',
    },
    methods: {
        /**
         * Called when a numeric button is pressed.
         * @param n - the pressed number
         */
        numberPressed(n)
        {
            // call clearPressed() when the latest pressed button is 'equal'
            if(this.pressed === 'equal')
                this.clearPressed();

            // overwrite temporary value when it is equal to 0
            if(this.temp === '0')
                this.temp = '';

            // append the pressed number to the temporary value
            this.temp += n.toString();

            // record 'number' as the pressed button
            this.pressed = 'number';
        },


        /**
         * Called when an operand button is pressed.
         * @param o - the pressed operand
         */
        operandPressed(o)
        {
            if(this.temp !== '' || this.value1 !== '') {

                // if value1 is still empty...
                if(this.value1 === '') {
                    // assign operand
                    this.operand = o;

                    // transfer temp to value1 if 'equal' was the latest button pressed
                    if(this.pressed !== 'equal')
                        this.value1 = this.temp;
                }

                // if value1 is not empty...
                else {
                    // transfer result to value1 if 'equal' was the latest button pressed
                    if(this.pressed === 'equal')
                        this.value1 = this.result;

                    // handle consecutive operation...
                    else {
                        this.value2 = this.temp;
                        this.calculateResult();
                        this.value1 = this.result;
                    }
                    this.operand = o;
                }

                // clear temp
                this.temp = '';
            }

            // else if result is not empty, transfer it to value1
            else if(this.result !== '')
                this.value1 = this.result;


            // record 'operand' as the pressed button
            this.pressed = 'operand';
        },


        /**
         * Called when the equal button is pressed.
         */
        equalPressed()
        {
            // if operand is not empty, do the following:
            if(this.operand !== '') {
                // if there's already a result, transfer it to value1
                if(this.result !== '')
                    this.value1 = this.result;

                // if temp is not empty, transfer it to value2
                if(this.temp !== '')
                    this.value2 = this.temp;
            }

            // otherwise, if operand is empty, transfer temp to result
            else
                this.result = this.temp;

            // clear temp
            this.temp = '';

            // call calculateResult()
            this.calculateResult();

            // record 'equal' as the pressed button
            this.pressed = 'equal';
        },


        /**
         * Called when the C button is pressed.
         */
        clearPressed()
        {
            // clear the state / variables
            this.temp    = '';
            this.operand = '';
            this.value1  = '';
            this.value2  = '';
            this.result  = '';

            // record 'clear' as the pressed button
            this.pressed = 'clear';
        },


        /**
         * Called when the arrow-left button is pressed.
         */
        backPressed()
        {
            // remove the last character in temp
            this.temp = this.temp.slice(0, -1);

            // record 'back' as the pressed button
            this.pressed = 'back';
        },


        /**
         * Called when +- button is pressed.
         */
        negPressed()
        {
            // if there's already a result and 'equal' was the latest pressed button,
            // operate on the result
            if(this.result !== '' && this.pressed === 'equal') {
                this.value1  = '';
                this.operand = '';
                this.value2  = ''
                this.temp    = this.result.toString();
            }

            // if temp is not empty...
            if(this.temp !== '') {
                if(parseFloat(this.temp) !== 0) {
                    // apply negative sign on temp
                    if(!this.temp.startsWith('-'))
                        this.temp = '-' + this.temp;
                    // remove negative sign on temp
                    else
                        this.temp = this.temp.substring(1);
                }
            }

            // if value1 is empty, make temp as the result
            if(this.value1 === '')
                this.result = this.temp;

            // record 'neg' as the pressed button
            this.pressed = 'neg';
        },


        /**
         * Called when dot (.) button is pressed.
         */
        dotPressed()
        {
            // call clearPressed() when the latest pressed button is 'equal'
            if(this.pressed === 'equal')
                this.clearPressed();

            // if temp is empty or 0, initialize it to '0.'
            if(this.temp === '' || parseFloat(this.temp) === 0)
                this.temp = '0.';

            // otherwise, append . if temp has no . yet
            else if(this.temp.indexOf('.') <= 0)
                this.temp = this.temp + '.';

            // record 'dot' as the pressed button
            this.pressed = 'dot';
        },


        /**
         * Produces the result of the arithmetic operation.
         */
        calculateResult()
        {
            // get val1, 0 if value1 is empty
            let val1 = this.value1 === '' ? 0 : parseFloat(this.value1);

            // get val2, 0 if value2 is empty
            let val2 = this.value2 === '' ? 0 : parseFloat(this.value2);

            // compute result depending on the operand used
            if(this.operand === '+')
                this.result = val1 + val2;
            else if(this.operand === '-')
                this.result = val1 - val2;
            else if(this.operand === '*')
                this.result = val1 * val2;
            else if(this.operand === '/')
                this.result = val1 / val2;
        }
    },
});


// number pressed
$('.btn-num').on('click', function() {
    let val = $(this).text().trim();
    app.numberPressed(val);
});


// operand pressed
$('.btn-op').on('click', function() {
    let op = $(this).text().trim();
    app.operandPressed(op);
});


// equal pressed
$('.btn-eq').on('click', function() {
    app.equalPressed();
});


// clear pressed
$('.btn-cls').on('click', function() {
    app.clearPressed();
});


// back pressed
$('.btn-bck').on('click', function() {
    app.backPressed();
});


// neg pressed
$('.btn-neg').on('click', function() {
    app.negPressed();
});


// dot pressed
$('.btn-dot').on('click', function() {
    app.dotPressed();
});
