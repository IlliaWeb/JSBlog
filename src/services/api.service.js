//https://wfm-js-ilya-blog-default-rtdb.firebaseio.com/   link to DB

class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json',{//save in firebase like json
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)//do request, then pars and return json respons
        
        } catch (error) {
            console.error(error)
        }
    }

    async fetchPosts() {//fetching posts, get post from fb
        try {
            const request = new Request(`${this.url}/posts.json`,{
                method: 'get'
            })
            return useRequest(request)//do request, then pars and return json respons
        
        } catch(error) {
            console.error(error)
        }
    } 

    async fetchPostById(id) {//load in favorites
        try {
            const request = new Request(`${this.url}/posts/${id}.json`,{
                method: 'get'
            })
            return useRequest(request)//do request, then pars and return json respons
        
        } catch(error) {
            console.error(error)
        }
    }
}

async function useRequest(request) {//do request, then pars and return json respons
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://wfm-js-ilya-blog-default-rtdb.firebaseio.com')