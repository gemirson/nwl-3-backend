import Orphanage from "../models/Orphanages";
import imageView from '../views/Image_view';

export default{
    render(orphanage:Orphanage){
        return{
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            opening_on_weekends: orphanage.opening_on_weekends,
            images: imageView.renderMany(orphanage.images)
        }
    },
    renderMany(orphanage:Orphanage[]){

        return orphanage.map(orphanage=>this.render(orphanage))
    }
}