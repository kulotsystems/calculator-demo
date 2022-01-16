# Calculator Demo
A simple standard calculator.

## Pseudocode 

###  States / Variables
The following values inside curly braces are the states or variables in the program. For simplicity, the `this` keyword refers to the instance of the program.
```javascript
    this: {
        temp   : '',  // temporary value
        operand: '',  // arithmetic operand to be used
        value1 : '',  // left value
        value2 : '',  // right value
        result : '',  // the result of arithmetic operation
        pressed: '',  // latest button pressed (for reference)
    }
```

###  Events
The program is divided into independent blocks called 'events'.

#### 1. numberPressed
Called when a numeric button is pressed.
<table>
    <thead>
        <tr>
            <td>Parameter</td>
            <td>Description</td>
        </tr>
    </thead>
    <tr>
        <td><b>n</b></td>
        <td>the pressed number</td>
    </tr>
</table>

```javascript
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
    }
```

#### 2. operandPressed
Called when an operand button is pressed.
<table>
    <thead>
        <tr>
            <td>Parameter</td>
            <td>Description</td>
        </tr>
    </thead>
    <tr>
        <td><b>o</b></td>
        <td>the pressed operand</td>
    </tr>
</table>

```javascript
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
    }
```

#### 3. equalPressed
Called when the equal button is pressed.
```javascript
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
    }
```

#### 4. calculateResult
Produces the result of the arithmetic operation.
```javascript
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
```

#### 5. clearPressed
Called when the `C` button is pressed.
```javascript
    clearPressed()
    {
        // clear the states / variables
        this.temp    = '';
        this.operand = '';
        this.value1  = '';
        this.value2  = '';
        this.result  = '';
    
        // record 'clear' as the pressed button
        this.pressed = 'clear';
    }
```

#### 6. backPressed
Called when the `arrow-left` button is pressed.
```javascript
    backPressed()
    {
        // remove the last character in temp
        this.temp = this.temp.slice(0, -1);
    
        // record 'back' as the pressed button
        this.pressed = 'back';
    }
```

#### 6. negPressed
Called when `+-` button is pressed.
```javascript
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
    }
```

#### 6. negPressed
Called when `.` button is pressed.
```javascript
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
    }
```
