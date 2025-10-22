import { FaYoutube, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Copyright */}
        <div>
          <h2 className="flex items-center text-2xl font-bold">
            <span className="text-blue-600 text-3xl mr-2">+</span>
            Medicare
          </h2>
          <p className="text-sm mt-2">
            Copyright © 2025 developed by Vikas all right reserved.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link to="/youtube" className="p-2 border rounded-full  hover:bg-blue-600 hover:text-white">
              <FaYoutube />
            </Link>
            <Link to="/github" className="p-2 border rounded-full hover:bg-blue-600 hover:text-white">
              <FaGithub />
            </Link>
            <Link to="/instagram" className="p-2 border rounded-full hover:bg-blue-600 hover:text-white">
              <FaInstagram />
            </Link>
            <Link to="/linkedin" className="p-2 border rounded-full hover:bg-blue-600 hover:text-white">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        {/* I want to */}
        <div>
          <h3 className="font-semibold text-lg mb-3">I want to:</h3>
          <ul className="space-y-2">
            <li><Link to="/find-doctor" className="hover:underline">Find a Doctor</Link></li>
            <li><Link to="/request-appointment" className="hover:underline">Request an Appointment</Link></li>
            <li><Link to="/find-location" className="hover:underline">Find a Location</Link></li>
            <li><Link to="/get-opinion" className="hover:underline">Get a Opinion</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/donate" className="hover:underline">Donate</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
