import React from 'react';

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 0L92.9372 67.0628L160 80L92.9372 92.9372L80 160L67.0628 92.9372L0 80L67.0628 67.0628L80 0Z" fill="#84E46E"/>
    </svg>
);

export const StarIcon2: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 0L92.9372 67.0628L160 80L92.9372 92.9372L80 160L67.0628 92.9372L0 80L67.0628 67.0628L80 0Z" fill="url(#paint0_linear_248_170)"/>
        <defs>
            <linearGradient id="paint0_linear_248_170" x1="80" y1="0" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#84E46E"/>
                <stop offset="1" stopColor="#84E46E" stopOpacity="0"/>
            </linearGradient>
        </defs>
    </svg>
);

export const CheckedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" fill="#84E46E" stroke="#84E46E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 12L11.1667 15L16.5 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 0.75L1 11.25" stroke="white" strokeWidth="1.43182" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M11.5 10.3781V0.75H1.87187" stroke="white" strokeWidth="1.43182" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export const HeartIcon: React.FC = () => (
    <svg className="mr-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8.41398 13.8731C8.18732 13.9531 7.81398 13.9531 7.58732 13.8731C5.65398 13.2131 1.33398 10.4597 1.33398 5.79307C1.33398 3.73307 2.99398 2.06641 5.04065 2.06641C6.25398 2.06641 7.32732 2.65307 8.00065 3.55974C8.67398 2.65307 9.75398 2.06641 10.9607 2.06641C13.0073 2.06641 14.6673 3.73307 14.6673 5.79307C14.6673 10.4597 10.3473 13.2131 8.41398 13.8731Z" stroke="#9F9FA0" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export const CommentIcon: React.FC = () => (
    <svg className="mr-2.5" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.247 8.07345C12.8137 10.7001 10.8604 12.7201 8.24702 13.2135C6.81369 13.4868 5.45368 13.2735 4.28035 12.7201C4.08701 12.6268 3.77367 12.5868 3.56701 12.6335C3.12701 12.7401 2.38703 12.9201 1.76037 13.0668C1.16037 13.2135 0.78704 12.8401 0.933706 12.2401L1.36702 10.4401C1.42035 10.2335 1.37368 9.91345 1.28035 9.72012C0.747012 8.60012 0.533693 7.30012 0.753693 5.93345C1.18036 3.30678 3.30037 1.18012 5.92703 0.746784C10.2604 0.0467841 13.9537 3.74012 13.247 8.07345Z" stroke="#9F9FA0" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export const TwitterIcon: React.FC = () => <img src="https://picsum.photos/seed/twitter/32/32" alt="Twitter"/>;
export const InstagramIcon: React.FC = () => <img src="https://picsum.photos/seed/instagram/32/32" alt="Instagram"/>;
export const TiktokIcon: React.FC = () => <img src="https://picsum.photos/seed/tiktok/32/32" alt="Tiktok"/>;