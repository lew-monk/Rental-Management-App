import FlashMessage from 'react-flash-message'
 
const Message = () =>{
    return(
        <FlashMessage duration={5000} persistOnHover={true} message = 'Hello'>
            <p>{Message}</p>
        </FlashMessage>
    );
}
export default Message