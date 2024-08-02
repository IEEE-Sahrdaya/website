import React from "react";


function FooterSection() {

  return (
    <div className="bg-[#222222] text-white py-8 mt-2 md:mt-5">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="logo mb-4">
            <img src="/images/Footer/Footer - Sahrdaya Logo.png" alt="Sahrdaya Logo" className="h-20" />
          </div>
          <div className="logo mb-4">
            <img src="/images/Footer/Footer - IEEE Logo.png" alt="IEEE Logo" className="h-20" />
          </div>
          <div className="logo mb-4">
            <img
              src="/images/Footer/Footer - IEEE Kerala Section Logo.png"
              alt="IEEE Kerala Section Logo"
              className="h-20"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-6">
          <p className="font-bold text-lg mb-4">Important Links</p>
          <div className="space-y-2">
            <p className="hover:underline">IEEE Xplore</p>
            <p className="hover:underline">IEEE Students</p>
            <p className="hover:underline">IEEE LINK</p>
            <p className="hover:underline">IEEE Kerala Section</p>
            <p className="hover:underline">IEEE Region R10</p>
            <p className="hover:underline">Sahrdaya College of Engineering and Technology</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-6">
          <p className="font-bold text-lg mb-4">Contact</p>
          <div className="flex space-x-4">
            {/* Replace with actual social media icons */}
            <img src="/images/Footer/facebook-icon.png" alt="Facebook" className="h-8 w-8" />
            <img src="/images/Footer/twitter-icon.png" alt="Twitter" className="h-8 w-8" />
            <img src="/images/Footer/instagram-icon.png" alt="Instagram" className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
