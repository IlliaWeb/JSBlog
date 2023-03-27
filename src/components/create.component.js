import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'

export class CreateComponent extends Component {
    constructor(id) {
        super(id)
    }
    //work with form & submit
    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))//initialise 'create'(form)
    
        this.form = new Form(this.$el, {  //this.$el - it`s form
            title: [Validators.required],  // watch did we have str or nothing
            fulltext: [Validators.required, Validators.minLength(10)]//it is controls 
        })
        
    }
}

async function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value, //take value from select in html
            date: new Date().toLocaleDateString(),
            ...this.form.value()//to obj
        }

        await apiService.createPost(formData)//create post on firebase

        this.form.clear()//my clear func

        //alert('Saved in data base!')
    } 
}