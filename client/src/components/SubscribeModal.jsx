// src/components/SubscribeModal.js
import React from 'react';
import './SubscribeModal.css';

const SubscribeModal = ({ isOpen, onClose , darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose} >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Subscribe to our Newsletter</h2>
        <h2 className="text-2xl mb-4">SUBSCRIBE</h2>
        <form
          action="https://outlook.us13.list-manage.com/subscribe/post?u=714bc61a24e44bf36865fa604&amp;id=d8ee8b80d9&amp;f_id=005b4eedf0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          noValidate
          className="validate"
        >
          <div id="mc_embed_signup_scroll">
            <div className="indicates-required ${darkMode ? 'dark-mode3' : 'light-mode3'}">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label >
                Email Address <span >*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className={`required email w-full mb-2 mt-2 px-3 py-2 border rounded ${darkMode ? 'dark-mode3' : 'light-mode3'}`}
                id="mce-EMAIL"
                required
                
              />
            </div>
            
            {/* <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div> */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input type="text" name="b_714bc61a24e44bf36865fa604_d8ee8b80d9" tabIndex="-1" value="" />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  value="Subscribe"
                />
                <p style={{ margin: '0 auto' }}>
                  <a href="http://eepurl.com/iRRaMQ" title="Mailchimp - email marketing made easy and fun">
                    <span style={{ display: 'inline-block', backgroundColor: 'transparent', borderRadius: '4px' }}>
                      <img
                        className="refferal_badge"
                        src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                        alt="Intuit Mailchimp"
                        style={{ width: '220px', height: '40px', display: 'flex', padding: '2px 0', justifyContent: 'center', alignItems: 'center' }}
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeModal;