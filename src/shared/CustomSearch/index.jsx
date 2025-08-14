import { TextField } from '@mui/material'
const CustomSearch = ({ query, setQuery, ...props }) => {

    const handleChange = (e) => {
        setQuery(e.target.value)
        console.log('query:- ', query)
    }
    return (
        <TextField value={query} onChange={handleChange} {...props} />
    )
}

export default CustomSearch;