import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <div style={{ display: 'flex', justifyContent: 'center'  }}
        className='p-10 px-14'>
        {/* <Back /> */}
        <Link href={'/dashboard'}>
          <h1 className="text-3xl text-pink font-extrabold text-primary text-center">
            Compass⁺
          </h1>
        </Link>
        {/* <SignOut /> */}
      </div>
    </nav>
  );
}
