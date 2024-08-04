import Image from "next/image";
import Link from "next/link";

function FooterSection() {
  return (
    <div className="bg-[#222222] text-white py-8 mt-2 md:mt-5">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="logo mb-4">
            <Image
              src="/images/Footer/Footer - Sahrdaya Logo.png"
              alt="Sahrdaya Logo"
              height={200}
              width={200}
              className="h-20 w-auto"
              unoptimized
            />
          </div>
          <div className="logo mb-4">
            <Image
              src="/images/Footer/Footer - IEEE Logo.png"
              alt="IEEE Logo"
              height={200}
              width={200}
              className="h-16 w-auto"
              unoptimized
            />
          </div>
          <div className="logo mb-4">
            <Image
              src="/images/Footer/Footer - IEEE Kerala Section Logo.png"
              alt="IEEE Kerala Section Logo"
              height={200}
              width={200}
              className="h-16 w-auto"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-6">
          <p className="font-bold text-lg mb-4">Important Links</p>
          <div className="space-y-2">
            <Link href={"https://ieeexplore.ieee.org/Xplore/home.jsp"}>
              <p className="hover:underline">&gt; IEEE Xplore</p>
            </Link>

            <Link href={"https://students.ieee.org/"}>
              <p className="hover:underline">&gt; IEEE Students</p>
            </Link>

            <Link href={"https://ieee-link.org/"}>
              <p className="hover:underline">&gt; IEEE LINK</p>
            </Link>

            <Link href={"https://ieeekerala.org/"}>
              <p className="hover:underline">&gt; IEEE Kerala Section</p>
            </Link>
            <Link href={"https://www.ieeer10.org/"}>
              <p className="hover:underline">&gt; IEEE Region R10</p>
            </Link>

            <Link href={"https://sahrdaya.ac.in"}>
              <p className="hover:underline">
                &gt; Sahrdaya College of Engineering and Technology
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-6">
          <p className="font-bold text-lg mb-4 ">Contact Us</p>
          <div className="flex flex-col gap-2 mb-6">
            <p>Anil Antony - +91 97462 22670</p>
            <p>Robin Francis - +91 80782 56598</p>
          </div>
          <div className="flex space-x-4">
            <Link href={"https://www.facebook.com/Ieeesahrdaya/"}>
              <Image
                src="/images/Footer/fb-logo.png"
                alt="Facebook"
                className="h-8 w-8"
                height={10}
                width={10}
                unoptimized
              />
            </Link>
            <Link href={"https://www.instagram.com/Ieeesahrdaya/"}>
              <Image
                src="/images/Footer/instagram-logo.png"
                alt="Instagram"
                className="h-8 w-8"
                height={10}
                width={10}
                unoptimized
              />
            </Link>
            <Link href={"https://www.linkedin.com/company/ieeesahrdaya"}>
              <Image
                src="/images/Footer/linkedin-logo.png"
                alt="LinkedIn"
                className="h-8 w-8"
                height={10}
                width={10}
                unoptimized
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
