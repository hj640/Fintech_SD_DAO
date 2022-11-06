import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useToast } from '@chakra-ui/react'
import { BellIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { getWalletAddress, getWeb3Provider } from '../api/api';
import { getShortAccountHash } from '../api/utils';

const navigation_loggedout = [
  { name: 'Home', href: `/` },
  { name: 'Vote', href: `/vote` },
];

const navigation_loggedin = [
  { name: 'Dashboard', href: '/'},
  { name: 'Vote', href: `/vote` },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const toast = useToast()
  const router = useRouter();
  const [address, setAddress] = useState('');

  useEffect(() => {
    getWalletAddress().then((address) => setAddress(address));
  }, []);

  // Pending Log In Page 

  // const login = async () => {
  //   const provider = getWeb3Provider();
  //   if (provider !== undefined) {
  //     await provider.send('eth_requestAccounts', []);
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();
  //     setAddress(address || '');
  //   }
  // };
  
  const [login, setLoginState] = useState(false);

  // const logout = async () => {
  //   setAddress('');
  //   const provider = getWeb3Provider();
  //   if (provider !== undefined) {
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();
  //     setAddress(address || '');
  //   }
  // };

  function loggedInNavbar() {
    return (
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          {/* <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <CloseIcon h={12} w={12} /> // block?
            ) : (
              <HamburgerIcon h={12} w={12} /> // block?
            )}
          </Disclosure.Button> */}
        </div>
        
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 items-center hidden sm:flex">
            <img src='/fintech_logo.png' alt='Fintech Logo' width='110px'/>
          </div>

          <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 pr-5">
                {navigation_loggedin.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a
                      className={classNames( 'pr-3 py-2 rounded-md text-sm font-Inter text-white hover:underline')}
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
          {/* Bell notifications */}
          <button className="hidden sm:block sm:ml-6 text-xl p-1 rounded-full text-white">
            <BellIcon/>
          </button>

          {/* Profile Dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                {/* Placeholder Image */}
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href={`/profile`} passHref>
                        <a
                          className={classNames(
                            active ? 'bg-gray-200' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Profile
                        </a>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/setting"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700' 
                      )} onClick={() => setLoginState(!login)}
                    >
                      Log Out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        
      </div>
    );
  }

  function loggedOutNavbar() {
    return (
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          {/* <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <CloseIcon h={12} w={12} /> // block?
            ) : (
              <HamburgerIcon h={12} w={12} /> // block?
            )}
          </Disclosure.Button> */}
        </div>

        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 items-center hidden sm:flex">
            <img src='/fintech_logo.png' alt='Fintech Logo' width='110px'/>
          </div>
        </div>
            
        <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 px-5">
              {navigation_loggedout.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <a
                    className={classNames( 'px-3 py-2 rounded-md text-sm font-Inter text-white hover:underline')}
                    aria-current={
                      router.pathname === item.href ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <button className="bg-fintech-yellow text-black rounded-2xl px-5 py-1.5 w-full font-chakraPetch tracking-widest" onClick={() => setLoginState(!login)}>
            SIGN IN
          </button>
        </div>
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="bg-fintech-blue drop-shadow-2xl">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            {login ? loggedInNavbar() : loggedOutNavbar()}
          </div>

          {/* Mobile menu dropdown */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {login ? 
                navigation_loggedin.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a
                      className={classNames(
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-500 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                )) 
                :
                navigation_loggedout.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a
                      className={classNames(
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-500 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                )) 
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
