import React,{useState,useEffect} from 'react'
import postData from '../../../util/postData'
import getData from '../../../util/getData'
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
    return (
        <>
        <div className="reports-container">
        {reports ? reports.map(report => <Report key={report._id} report={report} />) : 'No Reports'}
        </div>
        </>
    )
}
export default ReportsPage