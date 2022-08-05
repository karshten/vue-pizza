import {ref} from 'vue'
import {collection, getDocs} from 'firebase/firestore'
import {firestore} from "../firebase/config";

export const getCollection = async (collectionName) => {
    const documents = ref([])
    const error = ref(null)

    const collectionRef = collection(firestore, collectionName)

    try {
        const response = await getDocs(collectionRef)

        documents.value = response.docs.map(doc => ({...doc.data(), id: doc.id}))
    } catch (err) {
        error.value = err.message
    }

    return {documents, error}
}