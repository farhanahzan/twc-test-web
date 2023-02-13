import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo2 from '../public/assets/logo2.svg';
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Logo({text1, text2}) {
  const query = useRouter();

  return (
    <div
      onClick={() => query.push('/')}
      className="text-left text-slate-50 cursor-pointer"
    >
      <Image
        src={logo2}
        alt="logo"
        // width={text1 ? 60 : 26}
        // height={text1 ? md:60 : 22}
        className={classNames('float-left', text1 ? 'h-[22px] md:h-[60px] w-[26px] md:w-[60px]' : ' h-[22px] w-[26px]')}
      />
      <span
        className={classNames(
          'text-3xl  font-normal leading-4 ',
          text1 && 'text-black text-3xl md:text-6xl font-semibold leading-4 md:leading-[42px]'
        )}
      >
        twc
      </span>
      <h1
        className={classNames(
          'text-4xl  font-bold leading-6 pb-2 font-FutuBold',
          text2 &&
            'text-transparent bg-clip-text bg-gradient-to-r to-emerald-900 from-primary text-4xl md:text-[78px] md:pt-6  md:pb-8 font-FutuBold font-bold'
        )}
      >
        contacts
      </h1>
      <p
        className={classNames(
          'text-3xl  font-medium leading-8 font-FutuLight',
          text2 &&
            'text-transparent bg-clip-text bg-gradient-to-r to-emerald-900 from-primary text-3xl md:text-[78px] font-FutuBold font-semibold tracking-wide md:pb-10'
        )}
      >
        portal
      </p>
    </div>
  );
}

export default Logo;
