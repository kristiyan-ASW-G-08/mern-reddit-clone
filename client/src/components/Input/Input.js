import React,{useState,useMemo} from 'react'
const errorFunc = (errorArr,name) => {
  let error = false
  console.log(errorArr,name)
if(errorArr && errorArr.length > 0){
  if(errorArr.includes(name)){
    error = true
  }
  
}
return error
}
 const Input = props => {
  const {name,setHook,placeholder,value,type,errorArr,textArea} = props
  const error = useMemo(() => errorFunc(errorArr,name),[errorArr,name])
  let component = <input
  className={`input  ${error ? 'input--error': ''}`}
  onChange={e => setHook(e.target.value)}
  value={value}
  type={type}
  placeholder={placeholder}
  name={name}
  required
/>
  if(textArea){
    component = <textarea
    className={`input  ${error ? 'input--error': ''}`}
    onChange={e => setHook(e.target.value)}
    type={type}
    placeholder={placeholder}
    name={name}
    rows={7}
    value={value}
    required
  ></textarea>
  }
    return component
}
export default Input