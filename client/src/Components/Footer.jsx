

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-2">QuickJob</h3>
          <p className="text-sm text-gray-400">
            Connecting talents with opportunities worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/jobs" className="hover:text-white">Find Jobs</a></li>
            <li><a href="/companies" className="hover:text-white">Companies</a></li>
            <li><a href="/post-job" className="hover:text-white">Post a Job</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/register" className="hover:text-white">Register</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-400">Email: quickjob@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-gray-300 text-xl">
            <a href="https://facebook.com" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="https://linkedin.com" className="hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://twitter.com" className="hover:text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} QuickJob. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
