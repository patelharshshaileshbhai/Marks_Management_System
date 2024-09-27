import About from '../About/About';
import Contact from '../Contact/Contact';
import Navbar from '../navbar/Navbar';
import './HomePage.css';
import saff from "../../assets/saff.jpg"
import Footer from "../Footer/Footer"

const HomePage = () => {
  return (
    <>
      <div className="homepage" id="home">
        {/* <ParticlesComponent/> */}
        <Navbar />
        <div className="content flex flex-col md:flex-row items-center justify-between p-8">
          {/* Left Side: Image */}
          <div className="image-section w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
            <img
              src={saff}
              alt="Saffrony Institute"
              className="w-full h-auto object-contain rounded-lg  border-4 border-[#7286ba] shadow-lg"
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="text-section w-full md:w-1/2 flex flex-col justify-center md:pl-8 h-full bg-gray-900 p-10 border-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold font-dosis text-[#ed5d35]">Saffrony Institute of Technology</h1>
            <p className="mt-4 text-lg font-dosis">
              Welcome to the official portal of Saffrony Institute of Technology.
            </p>
            <p className="mt-2 text-lg font-dosis">
              Here, students can view their mid-semester marks, results, and other essential academic records.
            </p>
          </div>
        </div>
      </div>
      <div className="separator my-20"></div>
      {/* About Section */}
      <section id="about" className="mt-10">
        <About />
      </section>
      <div className="separator my-20"></div>
      {/* Contact Section */}
      <section id="contact" className="mt-10">
        <Contact />
      </section>
      <Footer/>
    </>
  );
}

export default HomePage;
