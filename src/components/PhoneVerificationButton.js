import { Fragment, useState } from 'react'
import PhoneVerificationPopup from './PhoneVerificationPopup'
 import './PhoneVerificationButton.css'

function PhoneVerificationButton() {
  const [showPopup, setShowPopup] = useState(false)

  function handleButtonClick() {
    setShowPopup(true)
  }

  function handleClose() {
    setShowPopup(false)
  }

  return (
    <Fragment>
      <button onClick={handleButtonClick}>Verify Phone</button>
      {showPopup && (
        <div className="overlay">
          <div className="popup-container">
            <button className="close-button" onClick={handleClose}>X</button>
            <PhoneVerificationPopup onClose={handleClose} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default PhoneVerificationButton

