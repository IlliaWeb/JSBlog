import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
       this.$el.addEventListener('click', buttonHandler.bind(this)) 
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(fbData)//obj posts to arr of obj
        const html = posts.map(post => renderPost(post, {withButton: true})).join(' ')//arr of html of posts
        
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html)
    }  

    onHide() {//posts clears when change tab
        this.$el.innerHTML = ''
    }
}

///////
function buttonHandler(event) {//get id to save or delete post
    const $el = event.target//button
    const id = $el.dataset.id//get id of elem
    const title = $el.dataset.title
    
    //console.log(posts);

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidate = favorites.find( p => p.id === id)
        if (candidate) {
            //if includes true - delet elem

            $el.textContent = 'Save'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
           
            favorites = favorites.filter(p => p.id !== id)
        } else {
            //add elem
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            
            $el.textContent = 'Delete'
            favorites.push({id, title})
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}
//сохранить в localstorage имя поста по схожему принципу как сохраняли и id поста
//lesson 16 