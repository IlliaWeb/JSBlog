//import {Component} from '../core/component'

export class Form {
    constructor(form, controls) {
        this.form = form
        this.controls = controls
    }

    value() {
        const value = {}
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })
        return value
    }

    clear() {//clear form contols
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]
        
            let isValid = true
            validators.forEach(validator => {
               isValid = validator(this.form[control].value) && isValid
            })
            
            //set or remove field error message
            isValid ? clearError(this.form[control]) : setError(this.form[control])

            isFormValid = isFormValid && isValid            
        })

        return isFormValid
    }
}

function setError($control) {//add info that control is invalid
    clearError($control)
    const error = '<p class="validation-error">Input correct text</p>'
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend',error)
}

function clearError($control) {//clear error if control haven`t err message
    $control.classList.remove('invalid')
    if ($control.nextSibling) {
      $control.closest('.form-control').removeChild($control.nextSibling)  
    }
    
}