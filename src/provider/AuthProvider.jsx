import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null);



const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    

    useEffect(()=>{
        const unSubscribe =
        onAuthStateChanged(auth, currentUser =>{
            console.log('user in auth state', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        } 
    },[])
    


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
    }
    return (
       <AuthContext.Provider value ={authInfo}>
    {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;