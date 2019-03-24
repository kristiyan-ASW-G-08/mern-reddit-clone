import React,{useEffect,useContext,useState} from 'react'
import Breadcrumbs from './Breadcrumbs'
import getData from '../../util/getData'
import {AuthContextData} from '../../AuthContext/AuthContext'
import CommunitiesContainer from '../Community/CommunitiesContainer/CommunitiesContainer';
const UserCommunities = props => {
    const [communities,setCommunities] = useState(false)
    const [page,setPage] = useState(1)
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId} = authState
    useEffect(() => {
        const apiUrl = `http://localhost:8080/user-get-communities/${userId}`
        if(isAuth){
           getData(apiUrl)
           .then(data => {
            if(data.communities){
                console.log(data)
                setCommunities(data.communities)
            }
        })
    
        }
        
    },[])
    return (
        <>
        <div className="user-page">
            <Breadcrumbs />
        </div>
         <CommunitiesContainer communities={communities}/>
        </>
    )
}
export default UserCommunities 