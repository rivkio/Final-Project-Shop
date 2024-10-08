import { FiAlertCircle, FiHome, FiMail } from 'react-icons/fi';
import './Footer.scss';
import { Tooltip } from 'flowbite-react';

function Footer() {
    return (
        <footer className="footer dark:bg-[#374151]">
            <div className="full-footer-content">
                <span className="text-sm md:p-9 p-4 sm:text-center dark:text-gray-200 text-[#1a6e5a] font-medium">
                    2024 All Rights Reserved To Rivki Ozeri ©
                </span>
                <ul className="flex flex-wrap items-center text-base font-medium mr-5 text-[#1a6e5a] dark:text-slate-200">
                    <li>
                        <Tooltip content="Home" placement="top" className="text-xs bg-gray-700 rounded px-1 py-1">
                            <a href="/" className="hover:underline dark:text-gray-200"><FiHome size={20} /></a>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="About" placement="top" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                            <a href="/about" className="hover:underline dark:text-gray-200"><FiAlertCircle size={20} /></a>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Contact" placement="top" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                            <a href="/contact" className="hover:underline dark:text-gray-200"><FiMail size={20} /></a>
                        </Tooltip>
                    </li>
                </ul>
            </div>
            <div className="mobile-footer-content">
                <span className="mobile-footer text-gray-500 dark:text-[#f0e6f6]">
                    All Rights Reserved ©
                </span>
                <ul className="dark:text-[#f0e6f6]">
                    <li><a href="/" className="hover:underline dark:text-[#f0e6f6]"><FiHome /></a></li>
                    <li><a href="/about" className="hover:underline dark:text-[#f0e6f6]"><FiAlertCircle /></a></li>
                    <li><a href="/contact" className="hover:underline dark:text-[#f0e6f6]"><FiMail /></a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;



