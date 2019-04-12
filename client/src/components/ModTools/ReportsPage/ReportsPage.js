import React,{useState,useEffect} from 'react'
import postData from '../../../util/postData'
import getData from '../../../util/getData'
import deleteData from '../../../util/deleteData'
import Report from './Report'
import useModalContext from '../../../hooks/useModalContext/useModalContext'
const ReportsPage = ({communityId,token}) => {
    const [reports,setReports] = useState(null)
    const {toggleModalReducer} = useModalContext()
    useEffect(() => {
        const apiUrl = `http://localhost:8080/community/reports/${communityId}`
        getData(apiUrl,token)
        .then(data => {
            if(data.reports){
                setReports(data.reports)
            }
        })
    },[])

    const deleteReport = async(reportId,deletePost) => {
        const apiUrl = `http://localhost:8080/community/report/${reportId}?deletePost=${deletePost}`
        const responseData = await deleteData(apiUrl,token)
        if(responseData.msg = 'Deleted'){
            const editedReports = reports.filter(report => report._id !== reportId)
            setReports(editedReports)
            const message = deletePost ? 'post Deleted' : 'Report Dismissed'
            toggleModalReducer({on:true,message})
        }
    }
    const banHandler = async (authorId,author) => {
        const apiUrl = `http://localhost:8080/community/ban/${communityId}?type=ban`
        const responseData = await postData(apiUrl,{authorId,author},token)
        toggleModalReducer({on:true,message:responseData.msg})
    }
    return (
        <> 
        <div className="reports-container">
        {reports && reports.length > 0 ? reports.map(report => <Report key={report._id} report={report} deleteReport={deleteReport} banHandler={banHandler}/>) : 'No Reports'}
        </div>
        </>
    )
}
export default ReportsPage