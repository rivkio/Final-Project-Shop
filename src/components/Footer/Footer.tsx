import './Footer.scss';

function Footer() {

    return (
        <footer className="footer">
            <div className="full-footer-content">
                <span className="text-sm text-gray-500 md:p-4 p-4 sm:text-center dark:text-gray-400">
                    2024 All Rights Reserved To Rivki Ozeri ©
                </span>
                <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </div>
            <div className="mobile-footer-content">
                <span className="text-gray-500">
                    All Rights Reserved ©
                </span>
                <ul>
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;






