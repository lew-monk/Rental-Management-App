import {useEffect, useState} from 'react'
import axios from 'axios'

const Tests = () => {

    const [image, setImage] = useState()

    const handleClick = (e) => {
        console.log(image)
    }
    
    const data = image
    useEffect(() => {
        axios.get('/tests')
        .then(response => {
            console.log(response)
            setImage(response.data[0].propertyGallery[0][0].data)
        })
        .catch(err => err.message)
    }, [])
    return (
        <div>
            <button onClick = {handleClick}> cHECK</button>
            <img src = {`data:image/jpeg;base64,${data}`} alt= 'sjddjsh'/>
        </div>
    ) ;
}
 
export default Tests;