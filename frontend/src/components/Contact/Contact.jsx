const Contact = () => {
    return (
      <section className="h-screen bg-[#0D1321] text-white flex flex-col items-center justify-center" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 font-dosis">Contact Us</h2>
          <p className="text-center mb-8 font-dosis">We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
          <form className="bg-white rounded-lg shadow-xl p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-left font-semibold text-gray-700 mb-2 font-dosis">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border border-gray-300 font-dosis rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-left font-semibold text-gray-700 mb-2 font-dosis">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border border-gray-300 font-dosis rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-left font-semibold text-gray-700 mb-2 font-dosis">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 font-dosis rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left font-semibold text-gray-700 mb-2 font-dosis">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border border-gray-300 font-dosis rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 font-semibold font-dosis bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 text-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  };
  
  export default Contact;
  