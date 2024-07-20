import React from "react";
import Image from "next/image";

function AboutSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-black p-4">About Us</h1>


      <div className="flex justify-center items-center h-auto w-full">
        <div className="bg-black h-auto flex justify-center items-center w-1/2 p-4">
          <p className="text-black text-lg p-4 ">
            IEEE Sahrdaya is a dynamic space where connections flourish and
            growth takes root. We offer an inviting environment that encourages
            networking and the forging of meaningful professional relationships.
            Our diverse range of events is meticulously designed to amplify both
            leadership and technical skills. From engaging workshops and
            enlightening seminars to spirited technical competitions, we provide
            a pathway for members to excel and innovate. As a community, we are
            dedicated to nurturing the latent potential of each individual.
            Through interactive experiences and knowledge-sharing, we strive to
            kindle the flames of creativity and ingenuity. Join us at IEEE
            Sahrdaya to embark on an exciting journey of learning,
            collaboration, and empowerment, as we collectively shape the
            ever-evolving landscape of technology and its impact on society.
          </p>
        </div>
        <div className="auto p-4">
          <div className="flex justify-center px-4">
            <Image
              src="/images/AboutIMG.jpg"
              alt="About"
              width={3000}
              height={1200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
