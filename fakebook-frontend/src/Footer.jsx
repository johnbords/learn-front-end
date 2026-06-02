
function Footer(){
    return(
        <footer className="footer mt-auto py-4 bg-dark text-white text-center"> 
            <div className="container"> 
                <p className="mb-0 pt-1">
                    &copy; {new Date().getFullYear()} Fakebook. All rights reserved.
                </p>
            </div> 
        </footer>
    );
}

export default Footer;