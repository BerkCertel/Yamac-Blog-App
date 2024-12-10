import AboutDescription from "./AboutDescription";
import AboutImage from "./AboutImage";

function About() {
  return (
    <main className="about-main-div container mx-auto px-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-5 mb-5 text-center text-4xl md:text-5xl">Hakkımda</h2>
        <hr className="w-1/2 mb-5 border-t border-mycolor4" />
      </div>

      <div className="flex flex-col lg:flex-row items-center p-1 justify-center lg:space-x-5 p- space-y-5 lg:space-y-0">
        <AboutImage />

        <AboutDescription />
      </div>
    </main>
  );
}

export default About;
