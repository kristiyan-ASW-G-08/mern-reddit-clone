const useToggle = initialState => {
    const [on, setOn] = useState(initialState)
    const toggle = () => setOn(!on)
    return [on, toggle]
  }
  export default useToggle