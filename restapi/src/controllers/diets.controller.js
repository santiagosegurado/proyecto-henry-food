import Diet from "../models/Diet.js"




const getDiets = async(req, res) =>{

    
    try {
        const diets = await Diet.findAll();
        res.json(diets)
    } catch (error) {
        res.status(404).send(error.message);
    }
}


export {
    getDiets
}