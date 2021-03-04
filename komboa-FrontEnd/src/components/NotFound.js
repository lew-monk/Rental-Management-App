import {Link} from 'react-router-dom'
import NavBar from '../features/Nav/NavBar'
import './404.css'
const NotFound = () => {
    return (

        <div id="wrapper" class="wrapper clearfix">
        <NavBar />
        <section class="page-404 text-center bg-overlay bg-overlay-dark3 bg-section">
        {/* <div class="bg-section"><img src="assets/images/background/bg-1.jpg" alt="background"/></div> */}
        <div class="pos-vertical-center">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <img src="assets/images/404/404-icon.png" alt="icon"/>
                        <h3>Error - The page doesn’t exist!</h3>
                        <p>The page you were looking for was not found <Link to = '/'>Go Home</Link></p>
                    </div>
                </div>
                {/* <!-- .row end --> */}
            </div>
            {/* <!-- .cotainer end --> */}
        </div>
        {/* <!-- .cotainer end --> */}
    </section>
    </div>
    );
}
 
export default NotFound;