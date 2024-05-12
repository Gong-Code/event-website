const { db } = require("@/firebase.config")

//GET BY ID, hämta en event via ID 
export const fetchDataByID = (collection, id) => {
    return db.collection(collection).doc(id).get()
}

//PATCH by ID
//DELETE BY ID