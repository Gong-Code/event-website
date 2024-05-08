import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-between bg-gray-500 fixed bottom-0 w-full">
        <div className="p-2">
            <p>LOGO</p>
        </div>
        <div className="flex gap-8 m-auto text-center">
        <div className="">
            <ul>
                <li>Career</li>
                <Link href="/"><li>Avaliable jobs</li></Link>
                <Link href="/"><li>Our positions</li></Link>
                <Link href="/"><li>Work with us!</li></Link>
            </ul>
        </div>
        <div className="">
            <ul>
            <li>Terms of service</li>
            <Link href="/"><li>FAQ</li></Link>
            <Link href="/"><li>Terms</li></Link>
            </ul>
        </div>
        <div className="">
            <ul>
                <li>The company</li>
                <Link href="/"><li>Employees</li></Link>
                <Link href="/"><li>Contact</li></Link>
                <Link href="/"><li>Hej</li></Link>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Footer