
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook,Instagram,MapPin, Mail ,Phone   } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Contact & Social */}
        <div>
          {/* Contact Section */}
          <div className="space-y-5 mb-8">
            <h4 className="text-xs tracking-[0.2em] font-bold mb-6">GET IN TOUCH</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 text-[#d4af37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-500 ">
                  Head Office: Basantapur Old Durbar Square, New Road, Kathmandu, Nepal
                </span>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="text-[#d4af37]">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@uchnepal.com" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">
                  info@uchnepal.com
                </a>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="text-[#d4af37]">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+9779851108418" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">
                  Call/Viber/Whatsapp: +977 9851108418
                </a>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <a href="https://www.facebook.com/uchnepal/" target='_blank' className="text-gray-400 hover:text-[#d4af37] transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="https://www.instagram.com/uchnepal/" target='_blank' className="text-gray-400 hover:text-[#d4af37] transition-colors"><Instagram className="w-6 h-6" /></a>
            
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="text-xs tracking-[0.2em] font-bold mb-6">NAVIGATION</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Home</Link></li>
            <li><Link to="/collections" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Collections</Link></li>
            <li><Link to="/color-chart" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Color Chart</Link></li>
            <li><Link to="/story" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Our Story</Link></li>
            <li><Link to="/blog" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Journal</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="text-xs tracking-[0.2em] font-bold mb-6">CUSTOMER CARE</h4>
          <ul className="space-y-4">
            <li><Link to="/shipping-returns" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Shipping & Returns</Link></li>
            <li><Link  to="/" state={{ scrollTo: "faq" }} className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors">Privacy Policy</Link></li>
            
          </ul>
        </div>

        {/* Column 4: Newsletter & QR Code */}
        <div className="flex flex-col">
          <h4 className="text-xs tracking-[0.2em] font-bold mb-6">NEWSLETTER</h4>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">Join our inner circle for early access to seasonal collections.</p>
          <div className="flex mb-10">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-gray-50 border border-gray-100 px-4 py-2 text-sm flex-grow focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 text-xs tracking-widest hover:bg-[#d4af37] transition-colors">JOIN</button>
          </div>

          {/* QR Code Section - Below Newsletter, no background */}
          <div className="pt-2 mx-auto">
            <div className="w-32 h-32 bg-white p-1 border border-gray-100 shadow-sm mb-3">
              <img 
                src="images/home/qr.png" 
                alt="Company QR Code" 
                className="w-full h-full"
              />
            </div>
            <p className="text-[12px] serif italic text-gray-500 tracking-wide">
              Scan to view company details
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-gray-100 pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.2em] text-gray-400">
        <p>© {new Date().getFullYear()} UCH NEPAL. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 uppercase">
          <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
