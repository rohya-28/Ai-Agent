'use server';

import { auth, db } from "@/firebase/admin";
import { promises } from "dns";

import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000 ;

export async function signUp(params : SignUpParams){
   const {uid, name, email} = params;

   try {

    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
        return{
            success:false,
            message: 'User Does Not Exist'
        }
    }

    await db.collection('users').doc(uid).set({
        name,email
    })

    return{
        success: true,
        message: 'Ac Created SuccessFully'
    }
    
   } catch (e: any) {
    console.log('Error while Creating User', e);
    
    if (error.code === 'auth/email-already-exists') {
        return{
            success: false,
            message:'This Email is Already in use.'
        }
    }

    return{
        success: false,
        message:'Failed To Create an Account'
    }
   }
}
 
export async function signIn(params: SignInParams) {
    const { email, idToken} = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return{
                success: false,
                message: 'User Does Not Exist'
            }            
        }

        await setSessionCookie(idToken)
    } catch (error) {
        console.log(error);

        return{
            success: false,
            message: 'Failed to Login'
        }
        
    }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken,{
    expiresIn: ONE_WEEK ,
  })

  cookieStore.set('session', sessionCookie, {maxAge: ONE_WEEK, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
  
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) return null;
  
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
  
      // get user info from db
      const userRecord = await db
        .collection("users")
        .doc(decodedClaims.uid)
        .get();
      if (!userRecord.exists) return null;
  
      return {
        ...userRecord.data(),
        id: userRecord.id,
      } as User;
    } catch (error) {
      console.log(error);
  
      // Invalid or expired session
      return null;
    }
  }

  export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
  }

