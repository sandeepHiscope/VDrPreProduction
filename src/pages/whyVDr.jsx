import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Users, FileText, TrendingUp } from 'lucide-react';

const WhyVDr = () => {
  const [stats, setStats] = useState({ count: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation for counter
    const interval = setInterval(() => {
      if (stats.count < 18) {
        setStats(prevStats => ({ count: prevStats.count + 1 }));
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    // Intersection observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      clearInterval(interval);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Don't Be <span className="text-yellow-300">Scammed</span>.<br />
                Verify With <span className="text-yellow-300">TrueDoc</span>.
              </h1>
              <p className="text-xl mb-8">
                Document fraud claims thousands of victims each year. 
                We verify documents so you can trust what you see.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 text-lg">
                  Verify Now
                </button>
                <button className="bg-transparent hover:bg-blue-800 border-2 border-white py-3 px-6 rounded-lg shadow-lg transition duration-300 text-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-center h-48 mb-4 bg-blue-50 rounded">
                  <Shield size={100} className="text-blue-700" />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="bg-blue-100 h-3 rounded-full w-2/3"></div>
                  <div className="bg-green-100 h-3 rounded-full w-1/3"></div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-blue-100 h-3 rounded-full w-1/4"></div>
                  <div className="bg-green-100 h-3 rounded-full w-2/4"></div>
                  <div className="bg-yellow-100 h-3 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-800 mb-2">${stats.count}B+</div>
              <p className="text-gray-600">Lost to document fraud yearly</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-800 mb-2">240K+</div>
              <p className="text-gray-600">Identity theft victims monthly</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-800 mb-2">98%</div>
              <p className="text-gray-600">Accuracy in our verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Growing Document Fraud Crisis</h2>
            <p className="text-xl text-gray-600">
              Document fraud isn't just a financial problem—it's destroying lives and causing real harm.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll transition-all duration-500 transform translate-y-8 opacity-0" style={{transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0}}>
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Medical Licenses</h3>
              <p className="text-gray-600">
                Fake medical licenses lead to untrained individuals performing procedures, 
                causing injuries and deaths to unsuspecting patients.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll transition-all duration-500 transform translate-y-8 opacity-0" style={{transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0, transitionDelay: '0.2s'}}>
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Property Deeds</h3>
              <p className="text-gray-600">
                Forged property documents result in families losing their homes and savings 
                to sophisticated real estate scams.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll transition-all duration-500 transform translate-y-8 opacity-0" style={{transform: isVisible ? 'translateY(0)' : 'translateY(2rem)', opacity: isVisible ? 1 : 0, transitionDelay: '0.4s'}}>
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Educational Credentials</h3>
              <p className="text-gray-600">
                Counterfeit degrees and certificates allow unqualified individuals to secure jobs, 
                compromising workplace safety and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How TrueDoc Protects You</h2>
              <p className="text-xl mb-8 text-gray-600">
                Our advanced technology uses blockchain verification, AI pattern recognition, 
                and direct source validation to ensure documents are authentic.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-full">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Real-time Verification</h3>
                    <p className="text-gray-600">Get instant results on document authenticity with our state-of-the-art scanning technology.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-full">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Source Authentication</h3>
                    <p className="text-gray-600">We directly confirm with issuing authorities to validate documents at their source.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-full">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tamper Detection</h3>
                    <p className="text-gray-600">Our technology identifies even the most sophisticated document alterations that human eyes miss.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-blue-200 px-3 py-1 rounded-md text-blue-800 text-sm font-medium">
                    Secure Verification
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FileText size={20} className="text-blue-700 mr-2" />
                      <span className="font-semibold">Document_Certificate.pdf</span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">Verifying</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Analyzing security features</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FileText size={20} className="text-blue-700 mr-2" />
                      <span className="font-semibold">Medical_License_124.pdf</span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">Verified</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-600 mr-2" />
                      <span>Issuing authority confirmed</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-600 mr-2" />
                      <span>Security watermarks authentic</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-600 mr-2" />
                      <span>Digital signature valid</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">People We've Protected</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Users size={24} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold">Sarah Thompson</h3>
                  <p className="text-gray-600 text-sm">Home Buyer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TrueDoc saved me from buying a property with forged deed documents. 
                Their verification flagged inconsistencies I would have never noticed.
                I avoided losing my entire life savings."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Users size={24} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold">David Chen</h3>
                  <p className="text-gray-600 text-sm">Medical Administrator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We implemented TrueDoc's verification system in our hospital hiring process 
                and caught three falsified medical credentials in the first month alone.
                Patient safety is our priority."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Users size={24} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold">Michelle Rodriguez</h3>
                  <p className="text-gray-600 text-sm">HR Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Our company avoided a potential disaster when TrueDoc helped us identify
                falsified engineering certifications. The verification process was quick,
                thorough, and potentially saved lives."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Leave Your Trust to Chance</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands who verify before they trust. Our system can protect you 
            from fraud that costs millions of people their savings, safety, and peace of mind each year.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 text-lg">
              Start Verifying Now
            </button>
            <button className="bg-transparent hover:bg-blue-700 border-2 border-white py-3 px-8 rounded-lg shadow-lg transition duration-300 text-lg">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">TrueDoc</h3>
              <p className="max-w-xs">
                Protecting people and organizations from document fraud through advanced verification technology.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Our Team</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Individual Verification</a></li>
                  <li><a href="#" className="hover:text-white transition">Business Solutions</a></li>
                  <li><a href="#" className="hover:text-white transition">API Integration</a></li>
                  <li><a href="#" className="hover:text-white transition">Bulk Verification</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 TrueDoc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhyVDr;

