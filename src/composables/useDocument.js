import { ref } from 'vue'
import { collection, addDoc } from "firebase/firestore"
import { firestore } from '../firebase/config'

export const useDocument = (collectionName) => {

    const addDocument = async (object) => {
        const error = ref(null)
        try {
            const collectionRef = collection(firestore, collectionName)
            await addDoc(collectionRef, object)
            error.value = null
        } catch (err) {
            error.value = err.message
        }

        return {error}
    }

    return {addDocument}
}