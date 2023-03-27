import {Component} from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = []//arr witn navigation tabs
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {//in index.js call func
        this.tabs = tabs//in this.tabs from constructor - put value from func args
    }
}

function tabClickHandler(event) {//for tabs navigation
    event.preventDefault()//for remove '#' from link in link space
    if (event.target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab=> {
            tab.classList.remove('active')
        })
        event.target.classList.add('active')
        //for content under tabs
        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)//find tab by name
        this.tabs.forEach(t => t.component.hide())//hide another tabs
        activeTab.component.show() 
    }
}