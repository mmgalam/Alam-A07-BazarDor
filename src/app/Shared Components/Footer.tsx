import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className='container mx-auto flex justify-between items-center py-6'>
                <p>
                    <Link href="#">বাজার দর</Link>
                    <span>— প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
                </p>

                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;