import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const footerLinks = [
        {
            id: 'career',
            name: 'Career',
            items: [
                { name: 'Avaliable jobs', href: '#' },
                { name: 'Our positions', href: '#' },
                { name: 'Work with us!', href: '#' },
            ],
        },
        {
            id: 'tos',
            name: 'Terms of service',
            items: [
                { name: 'Terms', href: '#' },
                { name: 'FAQ', href: '#' },
            ],
        },
        {
            id: 'company',
            name: 'About us',
            items: [
                { name: 'Employees', href: '#' },
                { name: 'Contact', href: '#' },
            ],
        },
    ];

    return (
        <>
            <div className='bg-secondary-muted shadow h-auto overflow-hidden'>
                <div className='flex max-w-7xl items-center justify-evenly flex-col md:flex-row'>
                    <div className="mt-7 md:mt-8 md:mb-16">
                        <Image
                            className='size-10 rounded-full'
                            src='/assets/placeholder.jpg'
                            alt='Your Company'
                            width={32}
                            height={32}
                        />
                    </div>
                    <div className='flex gap-14 mt-8 mb-16'>
                        {footerLinks.map((link) => (
                            <div key={link.name}>
                                <p className="text-primary tracking-wide text-sm font-semibold border-b-2 border-b-tertiary w-fit">{link.name}</p>
                                <ul>
                                    {link.items.map((item) => (
                                        <li
                                            key={item.name}>
                                            <Link
                                                href={item.href}
                                                className='text-primary text-[13px] transition ease-in-out hover:opacity-55'>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
