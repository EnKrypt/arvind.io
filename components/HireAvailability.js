import { useEffect, useState } from 'preact/hooks';

const HireAvailability = ({ endpoint }) => {
  const [status, setStatus] = useState('');
  useEffect(() => {
    fetch(`${endpoint}/api/available`)
      .then((response) => response.json())
      .then((availability) => {
        setStatus(availability.message);
      });
  }, [endpoint]);

  if (status === 'available') {
    return (
      <div>
        <div className="available">I am currently available!</div>
        <div className="available">
          This means I am not catering to another client&apos;s needs at present
          and will be able to pick up new projects immediately. If you are in
          need of my services, we should get in touch to discuss your
          requirements. Use the form below or
          <a
            href="mailto:mail@arvind.io"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {' '}
            email me
          </a>
          .
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="unavailable">I am currently unavailable!</div>
        <div className="unavailable">
          This means I am at present either involved with another client, or I
          am preoccupied / taking time off for personal reasons. I will still
          however respond to queries and offer technical advice on the side. If
          you are in need of my services, we should get in touch so I can take
          you on as my next client as soon as I am available. Use the form below
          or
          <a
            href="mailto:mail@arvind.io"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {' '}
            email me
          </a>
          .
        </div>
      </div>
    );
  }
};

export default HireAvailability;
