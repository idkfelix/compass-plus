import SignOut from './SignOut';
import Back from './Back';

export default function Navbar() {
  return (
    <nav>
      <div style={{ display: 'flex', justifyContent: 'space-between'  }}
        className='p-10 px-14'>
        <Back />
        <h1 className="text-3xl text-pink font-extrabold text-primary text-center">
          Compass +
        </h1>
        <SignOut />
      </div>
    </nav>
  );
}
