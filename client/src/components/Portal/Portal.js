import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const portalRoot = document.getElementById('portal')

class Portal extends Component{

    constructor(){
        super();
        this.element = document.createElement('div')
    }
    componentDidMount = () => {
      portalRoot.appendChild(this.element)
    }
    componentWillUnmount =() => {
        portalRoot.removeChild(this.element)
    }
    render(){
        const {children} = this.props
        return ReactDOM.createPortal(children,this.element)
    }
}

export default Portal