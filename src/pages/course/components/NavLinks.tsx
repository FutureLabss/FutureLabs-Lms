import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLinks() {
  const { pathname } = useRouter();

  const links = [
    { name: 'Course Overview', href: '/course/overview' },
    { name: 'What You Will Learn', href: '/course/what-you-will-learn' },
    { name: 'Admission Requirements', href: '/course/admission' },
  ];

  return (
    <div className='flex justify-around'>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={clsx('font-inter text-[.6rem] sm:text-[1.125rem] xl:text-[20px] text-nowrap font-normal  rounded-[1.875rem]  w-full py-[1rem] text-center ', pathname.startsWith(link.href) ? " bg-[#222D4B] text-white" : "text-[#D9D9D9]")}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}
