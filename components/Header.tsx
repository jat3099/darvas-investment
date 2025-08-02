import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
];

const Header: React.FC = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileNavOpen(false);
    }, [location]);

    const getLinkClass = (path: string, isMobile: boolean = false) => {
        const isActive = location.pathname === path;
        const baseClasses = `inline-block font-medium tracking-tight transition-all duration-300 rounded-full`;
        const desktopClasses = `px-5 py-2`;
        const mobileClasses = `px-6 py-3 text-2xl block w-full text-center`;

        const activeClasses = `bg-green-400 text-black`;
        const inactiveClasses = `text-white hover:bg-green-400 hover:text-black`;
        
        const sizeClasses = isMobile ? mobileClasses : desktopClasses;

        return `${baseClasses} ${sizeClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    return (
        <header className="relative z-50">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between pt-6 -m-2">
                    <div className="w-auto p-2">
                        <Link className="relative z-10 inline-block" to="/">
                            <span className="text-2xl font-bold text-white font-heading">Darvas Investment<span className="text-green-400">.</span></span>
                        </Link>
                    </div>
                    <div className="w-auto p-2">
                        <div className="flex flex-wrap items-center">
                            <div className="w-auto hidden lg:block">
                                <ul className="flex items-center gap-3">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link to={link.href} className={getLinkClass(link.href)}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-auto lg:hidden">
                                <button className="relative z-10 inline-block" onClick={() => setMobileNavOpen(true)}>
                                    <svg className="text-green-500" width="51" height="51" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="56" height="56" rx="28" fill="currentColor"></rect>
                                        <path d="M37 32H19M37 24H19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50 transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${mobileNavOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileNavOpen(false)}></div>
                <nav className="relative z-10 px-9 pt-8 h-full bg-black overflow-y-auto">
                    <div className="flex flex-wrap justify-between h-full">
                        <div className="w-full">
                            <div className="flex items-center justify-between -m-2">
                                <div className="w-auto p-2">
                                    <Link className="inline-block" to="/">
                                        <span className="text-2xl font-bold text-white font-heading">Darvas Investment<span className="text-green-400">.</span></span>
                                    </Link>
                                </div>
                                <div className="w-auto p-2">
                                    <button className="inline-block text-white" onClick={() => setMobileNavOpen(false)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-16 w-full">
                            <ul className="w-full space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href} className={getLinkClass(link.href, true)}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;