import React,{useState,useMemo} from 'react'
const errorFunc = (errorArr,name) => {
  let error = false
if(errorArr.length > 0){
  if(errorArr.includes(name)){
    error = true
  }
  
}
return error
}
 const Input = props => {
  const {name,setHook,placeholder,value,type,errorArr} = props
  const error = useMemo(() => errorFunc(errorArr,name),[errorArr,name])
    return (
        <input
        className={`input ${error ? 'error': ''}`}
        onChange={e => setHook(e.target.value)}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        required
      />
    )
}
export default Input