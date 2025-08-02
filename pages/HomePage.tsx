

import React, { useState } from 'react';
import { CheckedIcon, ArrowIcon, HeartIcon, CommentIcon } from '../components/Icons';
import ThreeCanvas from '../components/ThreeCanvas';

const whyUsCards = [
  { tag: 'Secure', title: 'Your assets, secured and insured', image: 'https://picsum.photos/seed/card1/400/500' },
  { tag: 'Data-driven', title: 'Powerful analysis at your fingertips', image: 'https://picsum.photos/seed/card2/400/500' },
  { tag: 'Growth', title: 'Grow your portfolio with confidence', image: 'https://picsum.photos/seed/card3/400/500' }
];

const featureTabs = [
  { id: 'introduction', label: 'Introduction', image: 'https://picsum.photos/seed/dashboard1/800/400' },
  { id: 'aggregation', label: 'Aggregation', image: 'https://picsum.photos/seed/dashboard2/800/400' },
  { id: 'pricing', label: 'Transparent Pricing', image: 'https://picsum.photos/seed/dashboard3/800/400' },
  { id: 'integrations', label: 'Integrations', image: 'https://picsum.photos/seed/dashboard4/800/400' },
  { id: 'api', label: 'API & Webhooks', image: 'https://picsum.photos/seed/dashboard5/800/400' },
];

const testimonials = [
  { name: 'Leslie Alexander', handle: '@lesliealexnader', text: 'Finances are very important to me. I regularly plan my expenses and save for the future.', avatar: 'https://picsum.photos/seed/avatar1/48/48' },
  { name: 'Kristin Watson', handle: '@kristinawatson', text: 'Finances are very important to me. I regularly plan my expenses and save for the future.', avatar: 'https://picsum.photos/seed/avatar2/48/48' },
  { name: 'Marvin McKinney', handle: '@marvinmckinney', text: 'Finances are a part of life that needs constant attention. I try to regularly analyze my expenses.', avatar: 'https://picsum.photos/seed/avatar3/48/48' },
  { name: 'Kathryn Murphy', handle: '@kathrynmurphy', text: 'I\'m not very knowledgeable about finances, but I try to stay on top of my expenses and take advice from experts.', avatar: 'https://picsum.photos/seed/avatar4/48/48' },
  { name: 'Brooklyn Simmons', handle: '@brooklynsimmons', text: 'Finances are a matter of responsibility and discipline for me. I try to monitor my expenses and savings.', avatar: 'https://picsum.photos/seed/avatar5/48/48' },
  { name: 'Devon Lane', handle: '@devonlane', text: 'Finances are a part of life that needs constant attention. I try to regularly analyze my expenses.', avatar: 'https://picsum.photos/seed/avatar6/48/48' },
  { name: 'Arlene McCoy', handle: '@arlenemccoy', text: 'I\'m interested in new technologies in the field of finance, like blockchain or robo-advisors.', avatar: 'https://picsum.photos/seed/avatar7/48/48' },
  { name: 'Jerome Bell', handle: '@jeromebell', text: 'I\'m convinced that investing in education and acquiring new skills is a key factor in building a stable financial future.', avatar: 'https://picsum.photos/seed/avatar8/48/48' },
  { name: 'Ronald Richards', handle: '@ronaldrichards', text: 'Managing finances can be stressful, but I know it is important to take care of them.', avatar: 'https://picsum.photos/seed/avatar9/48/48' },
];

const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden">
    <ThreeCanvas />
    <div className="relative pt-20 lg:pt-28">
      <div className="relative z-10 container px-4 mx-auto">
        <div className="relative mb-24 text-center md:max-w-4xl mx-auto">
          <span className="inline-block mb-2.5 text-base text-green-400 font-medium">Investment Platform</span>
          <h1 className="font-heading mb-10 text-7xl lg:text-8xl xl:text-[9rem] leading-none text-white tracking-tighter">Data-driven investing for everyone</h1>
          <a className="inline-block px-8 py-4 bg-green-400 hover:bg-green-500 text-black font-medium focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300" href="#">Start now</a>
        </div>
        <div className="relative max-w-max mx-auto">
          <img src="https://picsum.photos/seed/invest-hero/1000/600" alt="Investment Dashboard" className="rounded-3xl"/>
        </div>
      </div>
    </div>
    <img className="absolute top-0 left-48 opacity-20" src="https://shuffle.dev/zeus-assets/images/headers/layer-blur.svg" alt=""/>
    <img className="absolute bottom-0 right-0 opacity-40" src="https://shuffle.dev/zeus-assets/images/headers/lines2.svg" alt=""/>
  </section>
);

const WhyUsSection: React.FC = () => (
  <section className="pt-20 pb-24 bg-[#141518]">
    <div className="container px-4 mx-auto">
      <div className="text-center">
        <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Why us</span>
        <h2 className="font-heading mb-6 text-7xl lg:text-8xl text-white tracking-tighter md:max-w-md mx-auto">Protecting you and your money</h2>
        <p className="mb-20 text-gray-300 md:max-w-md mx-auto">Darvas Investment is focused on helping you achieve your financial goals through strategic analysis and data-driven insights.</p>
      </div>
      <div className="flex flex-wrap -m-4">
        {whyUsCards.map((card, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="relative mb-8 overflow-hidden rounded-[2.5rem]">
              <img className="w-full transform hover:scale-110 transition duration-1000" src={card.image} alt={card.title}/>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">{card.tag}</span>
                <a className="group inline-block max-w-sm" href="#">
                  <h3 className="mb-4 text-3xl text-white tracking-tight hover:underline">{card.title}</h3>
                </a>
                <a className="group inline-flex items-center" href="#">
                  <span className="mr-3.5 text-white font-medium">Learn more</span>
                  <ArrowIcon className="transform group-hover:rotate-45 transition duration-300"/>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CoreFeaturesSection: React.FC = () => (
    <section className="relative py-24 overflow-hidden">
        <div className="container px-4 mx-auto">
            <div className="mb-20 md:max-w-xl text-center mx-auto">
                <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Core Platform</span>
                <h2 className="font-heading text-7xl lg:text-8xl text-white tracking-tighter">Features</h2>
            </div>
            <div className="relative mb-10 py-20 px-4 sm:px-16 bg-[radial-gradient(ellipse_at_center,rgba(38,42,48,1),rgba(15,17,19,1))] overflow-hidden border border-gray-900 border-opacity-30 rounded-[2.5rem]">
                <div className="max-w-6xl mx-auto">
                    <div className="relative z-10 flex flex-wrap items-center -m-8">
                        <div className="w-full md:w-1/2 p-8">
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="mb-6 text-5xl sm:text-7xl text-white tracking-tighter">Smart Portfolio Management</h2>
                                <p className="text-white text-opacity-60">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-8">
                            <img className="mx-auto md:mr-0 rounded-2xl" src="https://picsum.photos/seed/dashboard-feature/600/400" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const SecureAccessSection: React.FC = () => (
    <section className="relative py-24 overflow-hidden">
        <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center -m-8">
                <div className="w-full md:w-1/2 p-8">
                    <div className="relative z-10 md:max-w-md">
                        <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Secure Access</span>
                        <h2 className="font-heading mb-6 text-6xl md:text-7xl text-white tracking-tighter">Control your finances</h2>
                        <p className="mb-8 text-white text-opacity-60">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <ul className="space-y-3.5">
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Real-time portfolio tracking and performance</span></li>
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Webhooks to power altering use cases for customers</span></li>
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Advanced tools to analyze market trends</span></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <img className="mx-auto" src="https://picsum.photos/seed/secure-invest/600/600" alt=""/>
                </div>
            </div>
        </div>
        <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30" src="https://shuffle.dev/zeus-assets/images/features/bg-blur.png" alt=""/>
    </section>
);


const TestimonialsSection: React.FC = () => {
    const [showContent, setShowContent] = useState(false);
    const visibleTestimonials = showContent ? testimonials : testimonials.slice(0, 8);

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center">
                    <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">24/7 Security</span>
                    <h2 className="font-heading mb-6 text-7xl lg:text-8xl text-white tracking-tighter md:max-w-md mx-auto">Loved by our customers</h2>
                    <p className="mb-20 text-gray-300 md:max-w-md mx-auto">See what our community of successful investors is saying about our platform.</p>
                </div>
                <div className="flex flex-wrap -m-3">
                    {visibleTestimonials.map((testimonial, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-3">
                            <div className="p-6 h-full border border-gray-800 rounded-[2.5rem] flex flex-col">
                                <div className="flex flex-wrap items-center -m-3 mb-3">
                                    <div className="w-auto p-3"><img className="rounded-full" src={testimonial.avatar} alt={testimonial.name}/></div>
                                    <div className="w-auto p-3">
                                        <h2 className="text-lg text-white">{testimonial.name}</h2>
                                        <p className="text-sm text-gray-400">{testimonial.handle}</p>
                                    </div>
                                </div>
                                <p className="mb-4 text-white text-sm flex-grow">{testimonial.text}</p>
                                <div className="flex flex-wrap items-center -m-2.5 mt-auto">
                                    <div className="flex items-center w-auto p-2.5"><HeartIcon /><p className="text-sm text-gray-400">232</p></div>
                                    <div className="flex items-center w-auto p-2.5"><CommentIcon /><p className="text-sm text-gray-400">81</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {!showContent && (
                <div className="absolute bottom-0 left-0 z-10 flex items-end justify-center w-full pt-32 pb-16 bg-gradient-to-t from-[#0F1113] to-transparent">
                    <button className="inline-block px-8 py-4 font-medium bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300" onClick={() => setShowContent(true)}>
                        Show more
                    </button>
                </div>
            )}
        </section>
    );
};

const TabbedFeaturesSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('introduction');
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="mb-12 md:max-w-4xl text-center mx-auto">
                    <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">More about our features</span>
                    <h2 className="font-heading text-7xl lg:text-8xl text-white tracking-tighter">Investment tools that keep up with the market</h2>
                </div>
                <ul className="mb-20 flex flex-wrap justify-center gap-2 sm:gap-4">
                    {featureTabs.map(tab => (
                        <li key={tab.id}>
                            <button
                                className={`inline-block px-5 py-3 font-medium text-sm sm:text-base tracking-tighter border rounded-full transition duration-200 ${activeTab === tab.id ? 'text-green-400 border-green-400' : 'text-gray-300 border-transparent hover:border-gray-700'}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="relative min-h-[300px] md:min-h-[400px]">
                  {featureTabs.map(tab => (
                      <img key={tab.id} className={`mx-auto rounded-2xl transition-opacity duration-500 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 right-0'}`} src={tab.image} alt={tab.label} />
                  ))}
                </div>
            </div>
        </section>
    );
};

const CallToActionSection: React.FC = () => (
    <section className="py-24 bg-[#141518]">
        <div className="container px-4 mx-auto">
            <div className="relative py-20 px-4 sm:px-16 bg-[radial-gradient(ellipse_at_center,rgba(38,42,48,1),rgba(15,17,19,1))] overflow-hidden border border-gray-900 border-opacity-30 rounded-[2.5rem] text-center">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Get Started</span>
                    <h2 className="font-heading mb-6 text-5xl sm:text-7xl text-white tracking-tighter">Ready to take control of your financial future?</h2>
                    <p className="mb-10 text-white text-opacity-60">Join Darvas Investment today and unlock the tools you need for data-driven investing. Your journey to a smarter portfolio starts now.</p>
                    <a className="inline-block px-8 py-4 bg-green-400 hover:bg-green-500 text-black font-medium focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300" href="#">
                        Join The Waitlist
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />
            <WhyUsSection />
            <CoreFeaturesSection />
            <SecureAccessSection />
            <TestimonialsSection />
            <TabbedFeaturesSection />
            <CallToActionSection />
        </>
    );
};

export default HomePage;