
export class TransformService {//write this service in another style 
    static fbObjectToArray(fbData) {//fbData - is object from fb
        return Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
            return item
        })
    }
}