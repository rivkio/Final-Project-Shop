import { FiAlertCircle, FiHome, FiMail } from 'react-icons/fi';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer dark:bg-[#374151]">
            <div className="full-footer-content">
                <span className="text-sm md:p-6 p-4 sm:text-center dark:text-gray-200 text-[#1a6e5a] font-medium">
                    2024 All Rights Reserved To Rivki Ozeri ©
                </span>
                <ul className="flex flex-wrap items-center text-sm font-medium mr-3 text-[#1a6e5a] dark:text-slate-200">
                    <li><a href="/" className="hover:underline dark:text-gray-200">Home</a></li>
                    <li><a href="/about" className="hover:underline dark:text-gray-200">About</a></li>
                    <li><a href="/contact" className="hover:underline dark:text-gray-200">Contact</a></li>
                </ul>
            </div>
            <div className="mobile-footer-content">
                <span className="mobile-footer text-gray-500 dark:text-[#f0e6f6]">
                    All Rights Reserved ©
                </span>
                <ul className="dark:text-[#f0e6f6]">
                    <li><a href="/" className="hover:underline dark:text-[#f0e6f6]"><FiHome/></a></li>
                    <li><a href="/about" className="hover:underline dark:text-[#f0e6f6]"><FiAlertCircle /></a></li>
                    <li><a href="/contact" className="hover:underline dark:text-[#f0e6f6]"><FiMail/></a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;



