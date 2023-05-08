import './PhoneVerificationPopup.css'
import { useState, useRef, useEffect } from 'react'

function PhoneVerificationPopup() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Set focus to the first input when the component mounts
    inputRefs.current[0].focus()
  }, [])

  function handleInputChange(e, index) {
    const newOtp = [...otp]
    const inputValue = e.target.value

    // Only allow numeric characters
    if (!/^[0-9]*$/.test(inputValue)) {
      return
    }

    // Update the OTP array
    newOtp[index] = inputValue

    // Move focus to the next input if input value is not empty
    if (inputValue !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    // Set the new OTP state
    setOtp(newOtp)
  }

  function handleKeyDown(e, index) {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault()
        // Clear the current input and move focus to the previous input
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
        if (index > 0) {
          inputRefs.current[index - 1].focus()
        }
        break
      case 'ArrowLeft':
        // Move focus to the previous input
        if (index > 0) {
          inputRefs.current[index - 1].focus()
        }
        break
      case 'ArrowRight':
        // Move focus to the next input
        if (index < 5) {
          inputRefs.current[index + 1].focus()
        }
        break
      default:
        break
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('text/plain')
    if (pastedData.length === 6 && /^[0-9]*$/.test(pastedData)) {
      setOtp(pastedData.split(''))
      inputRefs.current[5].focus() // Move focus to the last input
    } else {
      setErrorMessage('Invalid OTP')
    }
  }

  function handleSubmit() {
    const enteredOtp = otp.join('')
    console.log('Entered OTP:', enteredOtp)
  }

  return (
    <div className="popup">
      <h2>Phone Verification</h2>
      <p>Enter the 6-digit OTP sent to your phone</p>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button onClick={handleSubmit} disabled={!otp.every((digit) => digit !== '')}>
        Submit
      </button>{' '}
    </div>
  )
}

export default PhoneVerificationPopup
