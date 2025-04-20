import {  initializeApp } from 'firebase-admin';
import {cert, getApps} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase/auth';

const initFireBaseAdmin = () => {
    const apps = getApps();

    if(!apps.length) {
        initializeApp({credential: cert({
            projectId: process.env.FIREBASE_PRIVATE_ID,
            clientEmail:  process.env.FIREBASE-CLIENT-EMAIL,
            privateKey:process.env.FIREBASE_PRIVATE-KEY?.replace(/\\n/g,"\n")
        })})
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

export const { auth , db } = initFireBaseAdmin()