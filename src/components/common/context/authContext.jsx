// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "../../Auth/Firebase/Firebase"
// import { useEffect } from "react"

// const AuthContext = React.createContext()

// export function useAuth(){
//     return useContext(AuthContext)
// }

// export function AuthContext({children}){
//     const [currentUser, setCurrentUser] = useState(null)
//     const [userLoggedIn, setUserLoggedIn] = useState(false)
//     const [ loading, setLoading] = useSate(true)

//     useEffect(()=>{
//         const unsubscribed = onAuthStateChanged(auth, initiualizeUser)
//         return unsubscribed
//     }, [])

//     async function initiualizeUser(user){
//         if(user){
//             setCurrentUser({...user})
//             setUserLoggedIn(true)
//         }else{
//             setCurrentUser(null)
//             setUserLoggedIn(false) 
//         }
//         setLoading(false)
//     }

//     const value = {
//         currentUser,
//         userLoggedIn,
//         loading
//     }

//     return <AuthContext.Provider value={value}>
//         {!loading && children}
//     </AuthContext.Provider>
// }