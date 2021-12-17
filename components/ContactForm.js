import { useEffect, useRef, useState } from 'preact/hooks';
import Reaptcha from 'reaptcha';
import Cross from './icons/Cross';

const defaultFailureMessage =
  'Something went wrong. If this issue persists, there could be a problem. Try again later.';
const displayInfoDuration = 5000;
let infoTimeoutID = undefined;
const clearInfoTimeout = () => {
  if (infoTimeoutID) {
    clearTimeout(infoTimeoutID);
    infoTimeoutID = undefined;
  }
};

const ContactForm = ({ endpoint }) => {
  const captchaRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [infoType, setInfoType] = useState('failure');
  const [infoText, setInfoText] = useState(defaultFailureMessage);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const showSuccess = (message) => {
    clearInfoTimeout();
    setDisplayInfo(true);
    setInfoType('success');
    setInfoText(message);
    infoTimeoutID = setTimeout(() => {
      setDisplayInfo(false);
    }, displayInfoDuration);
  };

  const showError = (message) => {
    clearInfoTimeout();
    setDisplayInfo(true);
    setInfoType('failure');
    setInfoText(message || defaultFailureMessage);
  };

  if (hydrated) {
    return (
      <div className="contact">
        <div className="contact-para">
          Use this form to fill out your requirements or other details, and
          I&apos;ll get back to you with a quote (or answer) at no charge. You
          can also just email me at{' '}
          <a
            href="mailto:mail@arvind.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            mail@arvind.io
          </a>
        </div>
        <div className="form">
          <label htmlFor="name">Name / Company</label>
          <input type="text" id="name" placeholder="John Doe" ref={nameRef} />
          <label htmlFor="email">
            Email address (I&apos;ll use this to get back to you)
          </label>
          <input
            type="email"
            id="email"
            placeholder="someone@example.com"
            ref={emailRef}
          />
          <label htmlFor="message">
            Details about your requirements / question / message
          </label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            rows="5"
            ref={messageRef}
          ></textarea>
          <button
            className={loading ? 'disabled' : undefined}
            onClick={() => {
              if (!loading) {
                if (captchaRef.current && captchaRef.current.execute) {
                  captchaRef.current.execute();
                } else {
                  showError();
                }
              }
            }}
          >
            Submit
          </button>
          <Reaptcha
            ref={captchaRef}
            sitekey="6LeWOCEUAAAAAPVh4ObNT7avzud3Ifsr2Tsx3HLX"
            size="invisible"
            onVerify={(token) => {
              setLoading(true);
              fetch(`${endpoint}/api/client-form`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  recaptchaToken: token,
                  name: nameRef.current ? nameRef.current.value : '',
                  email: emailRef.current ? emailRef.current.value : '',
                  message: messageRef.current ? messageRef.current.value : ''
                })
              })
                .then((response) => response.json())
                .then((response) => {
                  if (response.error) {
                    showError(response.message);
                  } else {
                    showSuccess(response.message);
                    if (
                      nameRef.current &&
                      emailRef.current &&
                      messageRef.current
                    ) {
                      nameRef.current.value = '';
                      emailRef.current.value = '';
                      messageRef.current.value = '';
                    }
                  }
                  setLoading(false);
                })
                .catch((err) => {
                  showError();
                  setLoading(false);
                });
              captchaRef.current.reset();
            }}
          />
          <div className="recaptcha-disclaimer">
            This page is protected by reCAPTCHA and the Google{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://policies.google.com/privacy"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://policies.google.com/terms"
            >
              Terms of Service
            </a>{' '}
            apply.
          </div>
        </div>
        <div
          className={['info', infoType, displayInfo ? 'visible' : '']
            .join(' ')
            .trim()}
        >
          <div className="info-text">{infoText}</div>
          <Cross
            className="info-cross"
            onClick={() => {
              setDisplayInfo(false);
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="nocontact">
        Looks like you&apos;ve disabled Javascript on your browser, so you
        won&apos;t be able to use the handy contact form I&apos;d written for
        you to get in touch with me. No matter, you can still email me your
        requirements or other details at{' '}
        <a
          href="mailto:mail@arvind.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          mail@arvind.io
        </a>
        , and I&apos;ll get back to you with a quote (or answer) at no charge.
      </div>
    );
  }
};

export default ContactForm;
