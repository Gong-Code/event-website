const { db } = require("@/firebase.config")

//GET BY ID, hämta en event via ID 
export const fetchDataByID = (collection, id) => {
    return db.collection(collection).doc(id).get()
}

//PATCH by ID


//DELETE BY ID
export const deleteById = (collection, id) => {
    const removedEvent = db.collection(collection).doc(id)
    removedEvent.delete().then(() => {
        console.log('Successfully deleted the event')
    }).catch((err) => {
        console.log('Something went wrong', err)
    })
}



