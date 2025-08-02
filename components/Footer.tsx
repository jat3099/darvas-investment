import React from 'react';
import { Link } from 'react-router-dom';
import { TwitterIcon, InstagramIcon, TiktokIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="py-14 bg-black rounded-b-[50px]"></div>
      <div className="py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center -m-8 mb-28">
            <div className="w-full md:w-1/2 lg:w-4/12 p-8">
              <div className="md:max-w-xs">
                <Link to="/" className="mb-7 inline-block">
                  <span className="text-2xl font-bold text-black font-heading">Darvas Investment<span className="text-green-500">.</span></span>
                </Link>
                <p className="text-gray-500 font-medium">
                  Darvas Investment provides data-driven financial analysis to help you make smarter investment decisions.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/12 p-8">
              <h3 className="mb-6 text-lg text-black font-medium">Company</h3>
              <ul>
                <li className="mb-2.5"><Link className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300" to="/about">About Us</Link></li>
                <li className="mb-2.5"><Link className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300" to="/services">Services</Link></li>
                <li><a className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300" href="#">Careers</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:flex-1 p-8">
              <div className="flex flex-wrap -m-2">
                <div className="w-full p-2">
                  <a className="block py-5 px-8 bg-white rounded-full" href="#">
                    <div className="flex flex-wrap items-center -m-2">
                      <div className="w-auto p-2"><TwitterIcon /></div>
                      <div className="flex-1 p-2">
                        <p className="text-black">Follow us on Twitter for updates</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full p-2">
                  <a className="block py-5 px-8 bg-white rounded-full" href="#">
                    <div className="flex flex-wrap items-center -m-2">
                      <div className="w-auto p-2"><InstagramIcon /></div>
                      <div className="flex-1 p-2">
                        <p className="text-black">Follow us on Instagram for updates</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full p-2">
                  <a className="block py-5 px-8 bg-white rounded-full" href="#">
                    <div className="flex flex-wrap items-center -m-2">
                      <div className="w-auto p-2"><TiktokIcon /></div>
                      <div className="flex-1 p-2">
                        <p className="text-black">Follow us on TikTok for updates</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between -m-2">
            <div className="w-auto p-2">
              <p className="inline-block text-sm font-medium text-black text-opacity-60">© 2024 Darvas Investment</p>
            </div>
            <div className="w-auto p-2">
              <div className="flex flex-wrap items-center -m-2 sm:-m-7">
                <div className="w-auto p-2 sm:p-7"><a className="inline-block text-sm text-black text-opacity-60 hover:text-opacity-100 font-medium transition duration-300" href="#">Terms of Use</a></div>
                <div className="w-auto p-2 sm:p-7"><a className="inline-block text-sm text-black text-opacity-60 hover:text-opacity-100 font-medium transition duration-300" href="#">Privacy Policy</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;