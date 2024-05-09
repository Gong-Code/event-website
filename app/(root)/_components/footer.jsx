import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-between pb-2 bg-secondary-muted fixed bottom-0 w-full">
      <div className="flex gap-24 m-auto text-center">
        <div>
          <p className="text-lg ">Career</p>
          <ul className="text-sm">
            <Link href="/"><li>Avaliable jobs</li></Link>
            <Link href="/"><li>Our positions</li></Link>
            <Link href="/"><li>Work with us!</li></Link>
          </ul>
        </div>
        <div>
          <p className="text-lg">Terms of service</p>
          <ul className="text-sm">
            <Link href="/"><li>Terms</li></Link>
            <Link href="/"><li>FAQ</li></Link>
          </ul>
        </div>
        <div>
          <p className="text-lg">The company</p>
          <ul className="text-sm">
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