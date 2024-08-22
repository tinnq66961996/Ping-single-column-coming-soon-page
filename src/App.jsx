import { useState } from 'react';
import illustrationDashboard from './assets/images/illustration-dashboard.png';
import logo from './assets/images/logo.svg';

function App() {
  const [emailData, setEmailData] = useState({
    email: '',
  });

  const [errorEmail, setErrorEmail] = useState({
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
    setErrorEmail({ email: '' }); // Reset to an object with the same shape
    setSuccessMessage('');
  };

  const validate = () => {
    let isValid = true;
    let errors = {};
    if (!emailData.email) {
      errors.email = 'Email cannot be empty';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailData.email)) {
      errors.email = 'Looks like this is not an email';
      isValid = false;
    }
    setErrorEmail(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccessMessage('Form submitted successfully!'); // Set success message
      setEmailData({ email: '' }); // Optionally clear the form
    }
  };

  return (
    <div className="flex max-h-screen flex-col items-center justify-center gap-20">
      <img src={logo} alt="logo" className="h-[3.9rem] w-[9rem]" />
      <div className="text flex flex-col gap-4">
        <h2 className="text-[4.8rem] font-light text-[#969696]">
          We are launching{' '}
          <span className="text-[4.8rem] font-bold text-black">soon!</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="relative flex gap-[1.6rem]">
        <input
          type="text"
          name="email"
          placeholder="Your email address..."
          value={emailData.email}
          onChange={handleChange}
          className={`h-[5.6rem] w-[42.1rem] rounded-[28px] border p-[2rem] text-[1.6rem] font-light placeholder-[#B8C7ED] focus:placeholder-black ${errorEmail.email ? 'border-red-500' : 'border-[#B8C7Ed]'}`}
        />
        {errorEmail.email && !successMessage && (
          <>
            <p className="absolute mt-[65px] px-8 text-[11px] font-medium italic text-red-500">
              {errorEmail.email}
            </p>
          </>
        )}
        {successMessage && !errorEmail.email && (
          <>
            <p className="absolute mt-[65px] px-8 text-[11px] font-medium italic text-green-500">
              {successMessage}
            </p>
          </>
        )}

        <button
          className="h-[5.6rem] w-[20rem] rounded-[28px] bg-[#4C7BF3] text-[1.6rem] font-semibold text-white hover:bg-blue-500"
          type="submit"
        >
          Notify me
        </button>
      </form>
      <img
        src={illustrationDashboard}
        alt="avatar"
        className="h-[38.3rem] w-[64rem]"
      />
    </div>
  );
}

export default App;
