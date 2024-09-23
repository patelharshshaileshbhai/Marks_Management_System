const About = () => {
  return (
    <section className="min-h-screen bg-[#0D1321] text-white flex flex-col md:flex-row items-center justify-center" id="about">
      {/* Video Section */}
      <div className="w-full md:w-1/2 px-4 md:px-8 mb-8 md:mb-0 flex justify-center">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg border-4 border-[#7286ba] shadow-lg"
            src="https://www.youtube.com/embed/iomsXM2qFUE?autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* About Content Section */}
      <div className="max-w-4xl mx-auto text-center md:text-left px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-6 font-dosis">About Us</h1>
        <p className="text-lg mb-4 text-justify font-dosis">
          The trust in its noble endeavour to serve humanity through education,
          set up Saffrony Institute of Technology Campus comprising S. P. B. Patel
          Degree and Diploma Engineering Colleges, also offering Post Graduate and
          Doctoral Degrees in 2006. Both Institutions are approved by Government
          of Gujarat, affiliated to Gujarat Technological University and
          recognized by regulatory bodies like UGC and AICTE.
        </p>
        <p className="text-lg mb-4 text-justify font-dosis">
          The college is set amidst 30 acres of beautiful, lush green, tranquil
          surroundings located in North Gujarat, about 40 km from Ahmedabad and 14
          km from Mehsana. The students enjoy access to modern learning
          infrastructure, laboratories and pedagogical tools, smart board equipped
          classrooms, e-learning, library, well-equipped departmental laboratories
          with the latest software, audio-visual teaching aids, discussion rooms,
          stationery store, open-air amphitheatre, playground, boys & girls
          hostels, canteen facility, conference halls, seminar hall, and an
          auditorium. The convergence of the best human and material
          infrastructure facilitates a robust academic experience which transcends
          to technical and cultural festivals, expert lectures, seminars, and
          conferences, Wi-Fi Campus.
        </p>
        <p className="text-lg mb-4 text-justify font-dosis">
          The college has a versatile expert faculty board comprising veterans and
          intellectual giants from both industry and academia. In fact, CEOs and
          Directors of some of the most reputed MNCs often come to interact with
          the students on a regular basis and share industry perspective on their
          curriculum. Key strengths of the college are a blend of young,
          experienced, and well-qualified faculty, modern laboratory
          infrastructure, rich library resources and focus on holistic development
          of students and faculty through innovative pedagogy, research, training,
          and consulting to enable them to emerge as confident and technically
          competent professionals to take on the challenges of the world at large.
        </p>
      </div>
    </section>
  );
};

export default About;
