import React,{useState,useEffect} from 'react'
import postData from '../../../util/postData'
import getData from '../../../util/getData'
import deleteData from '../../../util/deleteData'
import PostsContainer from '../../PostsContainer/PostsContainer'
import Report from './Report'
const ReportsPage = ({communityId,token}) => {
    const [reports,setReports] = useState(null)
    useEffect(() => {
        const apiUrl = `http://localhost:8080/community/reports/${communityId}`
        getData(apiUrl,token)
        .then(data => {
            if(data.reports){
                setReports(data.reports)
            }
        })
    },[])

    const deletePost = async(reportId) => {
        console.log(reportId)
        const apiUrl = `http://localhost:8080/community/report/${reportId}`
        console.log(apiUrl)
        const responseData = await deleteData(apiUrl,token)
        console.log(responseData)
    }
    return (
        <>
        <div className="reports-container">
        {reports ? reports.map(report => <Report key={report._id} report={report} deletePost={deletePost}/>) : 'No Reports'}
        </div>
        </>
    )
}
export default ReportsPage