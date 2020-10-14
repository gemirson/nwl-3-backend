import Images from "../models/Images"

export default{
    render(image:Images){
        return{
            id: image.id,
            url: `http://localhost:3434/upload/${image.path}`
           
        }
    },
    renderMany(image:Images[]){

        return image.map(image=>this.render(image))
    }
}