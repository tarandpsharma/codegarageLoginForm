import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [fullName, setFullName] = useState('');
    const [nameError, setNameError] = useState('');
    const [contact, setContact] = useState('');
    const [contactError, setContactError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [birthdateError, setBirthdateError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);



    const handleFullName = (e) => {
        const item = e.target.value;
        const nameRegex = /^([a-zA-Z]+(?:\s+[a-zA-Z]+)*)$/;

        if (!item.trim()) {
            setNameError('Full name cannot be empty. Please try later.');
        } else if (!nameRegex.test(item) || item.length < 3) {
            setNameError('Invalid full name. Please enter valid name.');
        } else {
            setNameError('');
        }

        setFullName(item);
    };

    const handleContact = (e) => {
        let contValue = e.target.value;
    
        const numericValue = contValue.replace(/\D/g, "");
    
        contValue = numericValue.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
    
        setContact(contValue);
    
        const contactPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    
        if (!contValue.trim()) {
            setContactError('Contact cannot be empty.');
        } else if (!contactPattern.test(contValue)) {
            setContactError('Sorry, contact is invalid. Please enter a valid contact number.');
        } else {
            setContactError('');
        }
    };
    


    const validateEmail = (email) => {
        const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return result.test(String(email).toLowerCase());
    };

    const handleEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue)

        if (!emailValue.trim()) {
            setEmailError('Email cannot be empty.');
        }
        else if (!validateEmail(emailValue)) {
            setEmailError('Sorry, this email address is not valid . Please try again.');
        }
    
        else {
            setEmailError('');
        }
    };

    const handlePassword = (e) => {
        const passValue = e.target.value;
        setPassword(passValue);

        const capitalLetterRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

        if (!passValue.trim()) {
            setPasswordError('Password cannot be empty.');
        } else if (passValue.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else if (!capitalLetterRegex.test(passValue)) {
            setPasswordError('Password must contain at least one capital letter.');
        } else if (!numberRegex.test(passValue)) {
            setPasswordError('Password must contain at least one number.');
        } else if (!specialCharacterRegex.test(passValue)) {
            setPasswordError('Password must contain at least one special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPassword = (e) => {
        const confPassValue = e.target.value;
        setConfirmPassword(confPassValue);

        if (!confPassValue.trim()) {
            setConfirmPasswordError('Confirm password cannot be empty.');
        }
        else if (password !== confPassValue) {
            setConfirmPasswordError('Invalid confirm password. Please try again later.')
        }
        else {
            setConfirmPasswordError('');
        }
    }

    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        setDay(selectedDay);

        const isValidDate = validateDate(selectedDay, month, year);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);

        const isValidDate = validateDate(day, selectedMonth, year);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        const isValidDate = validateDate(day, month, selectedYear);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };

    const validateDate = (day, month, year) => {
        if (!day || !month || !year) {
            return false;
        }

        const selectedDate = new Date(`${month} ${day}, ${year}`);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            return false;
        }

        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const daysInMonth = new Date(year, month, 0).getDate();
        if (month === '2' && day > 29) {
            return false;
        } else if (month === '2' && day === 29 && !isLeapYear) {
            return false;
        } else if (day < 1 || day > daysInMonth) {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName || !contact || !email || !password || !confirmPassword || !day || !month || !year) {
            toast.error("Form is empty. Please fill in all required fields.", {
                position: "top-right",
                theme: "colored",
                hideProgressBar: true,
                closeOnClick: false,
                bodyClassName: "text-xs"
            });
            return;
        }

        if (birthdateError) {
            toast.error(birthdateError, {
                position: "top-right",
                theme: "colored",
                hideProgressBar: true,
                closeOnClick: false,
                bodyClassName: "text-xs"
            });
            return;
        }

        formSubmit();
    }

    const formSubmit = () => {
        toast.success("User account successfully created.", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            closeOnClick: false,
            bodyClassName: "text-sm"
        });

        setFullName('');
        setNameError('');
        setContact('');
        setContactError('');
        setEmail('');
        setEmailError('');
        setPassword('');
        setPasswordError('');
        setConfirmPassword('');
        setConfirmPasswordError('');
        setDay('');
        setMonth('');
        setYear('');
        setBirthdateError('');
    }

    const handleCancel = () => {

        toast.error("Form cancelled successfully.", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            closeOnClick: false,
            bodyClassName: "text-sm"
        });

        setFullName('');
        setNameError('');
        setContact('');
        setContactError('');
        setEmail('');
        setEmailError('');
        setPassword('');
        setPasswordError('');
        setConfirmPassword('');
        setConfirmPasswordError('');
        setDay('');
        setMonth('');
        setYear('');
        setBirthdateError('');
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <h1 className="text-gray-700 text-lg font-bold mt-10 mb-5 sm:ml-0 xs:ml-0 md:ml-0 lg:ml-0">Create User Account</h1>

            {/* Starting of Form */}
            <form className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input id="full_name" value={fullName} type="text" placeholder="Full Name" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${nameError && 'border-red-500'} ${focusedInput === 'fullName' && 'border-red-500'}`} onChange={handleFullName} onFocus={() => setFocusedInput('fullName')} onBlur={() => setFocusedInput(null)} />
                    {(nameError) && <span className="text-red-500 text-xs">{nameError}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact</label>
                    <input id="contact" type="text" value={contact} placeholder="Contact" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${contactError && 'border-red-500'} ${focusedInput === 'contact' && 'border-red-500'}`} onChange={handleContact} onFocus={() => setFocusedInput('contact')} onBlur={() => setFocusedInput(null)} />
                    {(contactError) && <span className="text-red-500 text-xs"> {contactError} </span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">Birthdate</label>
                    <div className="flex">
                        <select value={day} onChange={handleDayChange} className={`border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${birthdateError && 'border-red-500'} ${focusedInput === 'birthdate' && 'border-red-500'}`}>
                            <option>Day</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select value={month} onChange={handleMonthChange} className={`border ml-3 rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${birthdateError && 'border-red-500'} ${focusedInput === 'birthdate' && 'border-red-500'}`}>
                            <option>Month</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <select value={year} onChange={handleYearChange} className={`border ml-3 rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${birthdateError && 'border-red-500'} ${focusedInput === 'birthdate' && 'border-red-500'}`}>
                            <option>Year</option>
                            {Array.from({ length: 105 }, (_, i) => 2024 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {(birthdateError) && <span className="text-red-500 text-xs">{birthdateError}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input id="email" type="email" value={email} onChange={handleEmail} placeholder="Email" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${emailError && 'border-red-500'} ${focusedInput === 'email' && 'border-red-500'}`} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} />
                    {(emailError) && <span className="text-red-500 text-xs">{emailError}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input id="password" type="password" value={password} onChange={handlePassword} placeholder="Password" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${passwordError && 'border-red-500'} ${focusedInput === 'password' && 'border-red-500'}`} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} />
                    {(passwordError) && <span className="text-red-500 text-xs"> {passwordError} </span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input id="confirm_password" type="password" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm Password" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${confirmPasswordError && 'border-red-500'} ${focusedInput === 'confirmPassword' && 'border-red-500'}`} onFocus={() => setFocusedInput('confirmPassword')} onBlur={() => setFocusedInput(null)} />
                    {(confirmPasswordError) && <span className="text-red-500 text-xs"> {confirmPasswordError} </span>}
                </div>
            </form>
            {/* Ending of Form */}

            {/*Starting of  Buttons */}
            <div className="lg:flex justify-center mt-12 mb-5">
                <button className="bg-white border border-teal-600 text-teal-600 pl-10 pr-10 sm: w-full xs: w-full py-2 px-4 rounded mb-2 lg:mb-0 lg:mr-2 lg:w-auto focus:outline-none focus:shadow-outline" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="bg-teal-600 text-white py-2 pl-10 pr-10 px-4 sm: w-full xs: w-full rounded border lg:w-auto focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
                    Submit
                </button>
                <ToastContainer />
            </div>
            {/*End  of  Buttons */}

        </div>
    );
};

export default Form;
