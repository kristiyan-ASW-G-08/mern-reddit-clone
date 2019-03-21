import React from 'react'
import useToggle from '../../hooks/useToggle'

const Toggle= props => {
    const [on,toggle] = useToggle(false)

    const {children} = props
    return children({
        on,
        toggle
    })
}
export default Toggle