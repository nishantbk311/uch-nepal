import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const FAQS = [
  {
    question: "Shipping and handling",
    answer: "Shipping and handlingPurchased items are shipped via courier service like DHL, UPS, FedEx or Cargo or as per request made by you. Shipping and handling cost depends on the destination (country) and weight. Heavier shipments are cheaper and lighter ships are comparatively expensive. These courier companies provide door-to-door delivery. They can pick up our shipments from 8:00 hours to 20:00 hours. Universal Cashmere House handles the every shipment until the custom clearance. We are supported by the experienced courier agents. They are able to handle or tackle in every problem that may arise. In most of the shipment (by cargo), our agent books space in advance up to the destination and arranges the delivery to the Airlines. Also, we can trace most of the status in the internet. Courier charge is included with quoted selling prices. The charge for bulk shipment is reasonable in Nepal. We are connected with road, ship or air cargos as per requirements. In the product section, choose your items and quantity. Once you confirm the products, the system will transcribe its code and will send us an order from you informing your needs and the items with quantity. Universal Cashmere House within 24 hours (except for Saturday) will send you an invoice in your email address. This invoice will give details of the cost of items and shipping cost of items."
  },
  {
    question: "Manufacturing and delivery information",
    answer: "If the goods are in stock we will dispatch you immediately. If not then please give us 7 working days from the date of confirmation. Once the product is ready for shipping, we will email you the information. You then have to transfer the remaining 50% of payment in the bank account. This is very necessary because according to the export rules and regulations of Nepal Government, we the exporter has to submit Foreign Currency Income Certificate at the time of custom clearance. This certificate has to be issued by the Commercial Bank. After submitting this information to the supplier they will prepare a GSP certificate (GSP certificate is Generalized System of Preference- Certificate of origin. By showing this certificate you will be able to pay less custom duty charge in your country."
  },
  {
    question: "Order procedure",
    answer: "After going through the invoice and finalizing the purchase from you, send us 50% of the money mentioned in the invoice as an advance. The money will be used to buy the raw materials for the products you have chosen. This is necessary because with this money poor craftsmen will buy the raw materials in credit from the local market."
  },
  {
    question: "Our Products",
    answer: "Our motto is to make our customers happy wherever they receive our hand-made products of skill hand. Universal Cashmere House is the direct collector and producer of cashmere clothes from skilled craftsmen so you can be sure that you are getting the best possible choice and price on all your supplies. These craftsmen are experienced in producing hand-woven items (muffler, scarf, stole, throws, blanket garment, and décor) and hand-knitted & crochet items (muffler, scarves, stole, throws, blanket, glove, sock, pullover, cardigan, poncho, etc.), and other cashmere accessories according to your design with print, embroidery and natural dyes. Likewise, Universal Cashmere House is looking for wholesale buyers from all over the world. Universal Cashmere House has reasonable pricing for all buyers. Also, if you are interested in being our distributor please contact us. All the products you get from the Universal Cashmere House are exclusively handmade in Nepal by experienced craftsmen. Most of the craftsmen are poor women who have migrated to Kathmandu from rural parts of Nepal."
  },
  {
    question: "Raw Materials",
    answer: "We have specialized on cashmere, bamboo and hemp yarn works. We are expecting to add more organic products in near future."
  },
  {
    question: "New Sample Development - Time, Process & Cost",
    answer: "New samples could be developed upon the order with fifty percent extra charge. We need fifteen to forty-five days for this which includes shipment time as well. However, the production duration of new design depends on availability of raw materials and volume of design."
  },
  {
    question: "Coloring & Color",
    answer: "Our hand products are individually colored so they may look different up to ten percent. We use SWISS dye, which represents a good quality and is environment friendly at the same time. Besides plain coloring, we are well equipped with resources and technology for print, shade, tie-dye and vegetable dye can be done upon the request. You can select color from the chart provided in the first order which is free."
  },
  {
    question: "Sizes",
    answer: "We can produce muffler to blanket of cm 25x165 to 225x225 respectively from our handloom. Also, we can knit up to 150 cm width blanket."
  },
  {
    question: "Delivery Time",
    answer: "After we receive confirmed order, normally it takes three to nine days to reach parcel to the recipients anywhere abroad. Sometimes, delivery time could be prolonged due to stock availability, design alteration or third-party issues."
  },
  {
    question: "Payment",
    answer: "Retail delivery could be done after full payment. For wholesales delivery, fifty percent of total amount to confirm the order needed and the rest fifty before shipment. We accept any mode of payment but frequently used are T/T and L/C. Payment method is advance payment through bank’s telegraph transfer or swift transfer. It is globally convenient and easy to trace the wire status through the bank."
  },
 
];

const FAQSection: React.FC = () => {
  const faqRef = useRef<HTMLElement>(null);

  // Listen for custom state passed via Link
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "faq") {
      faqRef.current?.scrollIntoView({ behavior: "smooth" });
      // Optional: remove state from history to prevent re-scrolling
      window.history.replaceState({}, "");
    }
  }, [location]);

  return (
    <section className="bg-white py-24 md:py-32" ref={faqRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-black block mb-4"
          >
            Assistance
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl serif italic text-black"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group focus:outline-none"
      >
        <span className="text-lg md:text-xl serif font-medium text-gray-800 group-hover:text-[#d4af37] transition-colors pr-8">
          {question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-black border-black text-white rotate-45' : 'text-gray-400 group-hover:border-black group-hover:text-black'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-6 pb-2 text-gray-500 font-light leading-relaxed text-justify">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQSection;