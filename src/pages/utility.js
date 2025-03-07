export const drawRect = ( detections , ctx ) => {


    detections.forEach(prediction => {
        const  [x,y,weight,height] = prediction["box"];

        const text = prediction["class"];
        
    });

}