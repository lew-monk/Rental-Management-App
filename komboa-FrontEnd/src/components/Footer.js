import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer id="footer" className="footer footer-1 bg-white">
        <section id="cta" className="cta cta-1 text-center bg-overlay bg-overlay-dark pt-90 bg-section" >
            {/* <div className="bg-section"><img src=" alt="Background"/></div> */}
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <h3>Join our professional team & agents to start selling your house</h3>
                        <Link to = '#'className="btn btn--primary">Contact</Link>   
                    </div>
                    {/* <!-- .col-md-6 --> */}
                </div>
                {/* <!-- .row --> */}
            </div>
            {/* <!-- .container --> */}
        </section>
                    <div className="footer-widget">
                    <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3 widget--about">
                            <div className="widget--content">
                                <div className="footer--logo">
                                    <img src="/assets/images/logo/logo-dark2.png" alt="logo"/>
                                </div>
                                
                                <div className="footer--contact">
                                    <ul className="list-unstyled mb-0">
                                        <li>+2547 16 957 910 </li>
                                        <li><Link to = '#'>Lewmonk@gmail.com</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- .col-md-2 end --> */}
                        <div className="col-xs-12 col-sm-3 col-md-2 col-md-offset-1 widget--links">
                            <div className="widget--title">
                                <h5>Company</h5>
                            </div>
                            <div className="widget--content">
                                <ul className="list-unstyled mb-0">
                                    <li><Link to = '#'>About us</Link></li>
                                    <li><Link to = '#'>Career</Link></li>
                                    <li><Link to = '#'>Services</Link></li>
                                    <li><Link to = '#'>Properties</Link></li>
                                    <li><Link to = '#'>Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- .col-md-2 end --> */}
                        <div className="col-xs-12 col-sm-3 col-md-2 widget--links">
                            <div className="widget--title">
                                <h5>Learn More</h5>
                            </div>
                            <div className="widget--content">
                                <ul className="list-unstyled mb-0">
                                    <li><Link to = '#'>Privacy</Link></li>
                                    <li><Link to = '#'>Terms & Conditions</Link></li>
                                    <li><Link to = '#'>Account</Link></li>
                                    <li><Link to = '#'>FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- .col-md-2 end --> */}
                        <div className="col-xs-12 col-sm-12 col-md-4 widget--newsletter">
                            <div className="widget--title">
                                <h5>newsletter</h5>
                            </div>
                            <div className="widget--content">
                                <form className="newsletter--form mb-40">
                                    <input type="email" className="form-control" id="newsletter-email" placeholder="Email Address"/>
                                    <button type="submit"><i className="fa fa-arrow-right"></i></button>
                                </form>
                                <h6>Get In Touch</h6>
                                <div className="social-icons">
                                    <Link to = '#'><i className="fa fa-twitter"></i></Link>
                                    <Link to = '#'><i className="fa fa-facebook"></i></Link>
                                    <Link to = '#'><i className="fa fa-vimeo"></i></Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- .col-md-4 end --> */}

                    </div>
                </div>
                {/* <!-- .container end --> */}
            </div>
            <div className="footer--copyright text-center">
                <div className="container">
                    <div className="row footer--bar">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <span>© 2021 <Link to ="#">Komboa</Link>, All Rights Reserved.</span>
                        </div>

                    </div>
                    {/* <!-- .row end --> */}
                </div>
                {/* <!-- .container end --> */}
            </div>
            {/* <!-- .footer-copyright end --> */}
        </footer>
    );
}
 
export default Footer;