import React from 'react'
 const Input = props => {
  const {name,setHook,placeholder,value,type,errorArr} = props
  let error = false
  if(errorArr.length > 0){
    if(errorArr.includes(name)){
      error = true
    }
  }
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