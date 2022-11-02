import React from "react";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div>
        <h5>
          This page is brought to you by Hiu Sum Jaime Yue & Ryan McCarthy
        </h5>
      </div>
      <div>
        <h5>
          <a
            href="https://hiusumjaimeyue.github.io/React-Portfolio-2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jaime's Portfolio
          </a>
        </h5>
      </div>
      <div>
        <h5>
          <a
            href="https://ryanofeastview.github.io/personal-bio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ryan's Portfolio
          </a>
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
