import React, { useState } from 'react';
import Slider from 'rc-slider';
import passwordGif from '../../assets/gif/password.gif'
import 'rc-slider/assets/index.css';
import { ReactComponent as RefreshIcon } from '../../assets/icons/refresh.svg';
import Checkbox from '../Checkbox';
import './index.css';

const generatePassword = (length, uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked) => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()';

  let characters = '';
  if (uppercaseChecked) characters += uppercaseLetters;
  if (lowercaseChecked) characters += lowercaseLetters;
  if (numbersChecked) characters += numbers;
  if (specialCharsChecked) characters += specialChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [uppercaseChecked, setUppercaseChecked] = useState(true);
  const [lowercaseChecked, setLowercaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [specialCharsChecked, setSpecialCharsChecked] = useState(true);
  const [password, setPassword] = useState(generatePassword(passwordLength, uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked));
  const [passwordStrength, setPasswordStrength] = useState('Weak');
  const [copiedPassword, setCopiedPassword] = useState('');

  const refreshPassword = () => {
    const newPassword = generatePassword(passwordLength, uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked);
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    // Show "Copied" text for 1 second
    setCopiedPassword(password);
    setTimeout(() => {
      setPasswordStrength(getPasswordStrength(password));
      setCopiedPassword(null);
    }, 1000);
  };

  const onChangePasswordLength = (value) => {
    setPasswordLength(value);
    const newPassword = generatePassword(value, uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked);
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const getPasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);

    if (password.length < 8) {
      return 'Too short';
    } else if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      return 'Strong';
    } else if (
      (hasUppercase && hasLowercase && hasNumber) ||
      (hasUppercase && hasLowercase && hasSpecialChar) ||
      (hasUppercase && hasNumber && hasSpecialChar) ||
      (hasLowercase && hasNumber && hasSpecialChar)
    ) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const onCheckboxChange = (checkboxName) => {
    switch (checkboxName) {
      case 'uppercase':
        setUppercaseChecked(!uppercaseChecked);
        break;
      case 'lowercase':
        setLowercaseChecked(!lowercaseChecked);
        break;
      case 'numbers':
        setNumbersChecked(!numbersChecked);
        break;
      case 'specialChars':
        setSpecialCharsChecked(!specialCharsChecked);
        break;
      default:
        break;
    }
  };

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="Your password" value={password} readOnly />
          <RefreshIcon onClick={refreshPassword} />
        </div>
        <button className="copy-btn" onClick={copyPassword}>
          {/* <CopyIcon /> Copy */}

          {copiedPassword === password ?  <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-copy"></i>}
        </button>
      </div>
      <span className={`fw-500 ${passwordStrength.toLowerCase() === 'strong' ? 'success' : passwordStrength.toLowerCase() === 'medium' ? 'warning' : 'danger'}`}>
         {passwordStrength}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length:</label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox
          id="uppercase"
          label="Uppercase"
          checked={uppercaseChecked}
          name="uppercase"
          onChange={() => onCheckboxChange('uppercase')}
        />
        <Checkbox
          id="lowercase"
          label="Lowercase"
          checked={lowercaseChecked}
          name="lowercase"
          onChange={() => onCheckboxChange('lowercase')}
        />
        <Checkbox
          id="numbers"
          label="Numbers"
          checked={numbersChecked}
          name="numbers"
          onChange={() => onCheckboxChange('numbers')}
        />
        <Checkbox
          id="specialChars"
          label="Special Characters"
          checked={specialCharsChecked}
          name="specialChars"
          onChange={() => onCheckboxChange('specialChars')}
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;