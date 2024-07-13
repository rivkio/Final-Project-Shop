import "./Header.scss";
import Nav from "../Navbar/Navbar";
import Search from "../Search/Search";


function Header() {

    return (
        <header className="bg-blue-300 text-blue-950 dark:bg-blue-950 p-5 dark:text-white text-5xl font-extralight h-40 text-center">
        <Nav />
        <Search />
        </header>
    );
}

export default Header;