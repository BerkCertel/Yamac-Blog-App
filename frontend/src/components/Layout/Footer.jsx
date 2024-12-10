import { RiInstagramFill } from "react-icons/ri";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaBook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-main-div bg-mycolor4">
      <div className="w-full h-full container mx-auto flex flex-col sm:flex-row justify-around items-center  p-4 space-y-3">
        <p className="font-semibold sm:mt-0 mt-4 text-white text-center sm:text-left">
          Copyright © 2024, All Rights Reserved.
        </p>

        <div className="flex flex-wrap justify-center sm:space-x-6 space-x-4  sm:space-y-0 sm:justify-start">
          <a
            href="https://www.instagram.com/yamac_erdogan55213/profilecard/?igsh=bHp6cGZleDlobnA3"
            target="_blank"
            rel="noopener noreferrer"
            className=" border p-2 border-white rounded-full hover:border-black"
          >
            <RiInstagramFill className="text-black text-2xl" />
          </a>

          <a
            href="https://www.facebook.com/yamac.erdogan.39?mibextid=LQQJ4d%20br%20%20br%20X%20br%20%20br%20https%3A%2F%2Fx.com%2Fyamaerdoan3%3Fs%3D21&rdid=FGfSvbRkCImeuASi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19fap5PgXZ%2F%3Fmibextid%3DLQQJ4d%2Bbr%2B%2Bbr%2BX%2Bbr%2B%2Bbr%2Bhttps%253A%252F%252Fx.com%252Fyamaerdoan3%253Fs%253D21#"
            target="_blank"
            rel="noopener noreferrer"
            className=" border p-2 border-white rounded-full hover:border-black"
          >
            <FaFacebookF className="text-black text-2xl" />
          </a>

          <a
            href="https://twitter.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className=" border p-2 border-white rounded-full hover:border-black"
          >
            <FaTwitter className="text-black text-2xl" />
          </a>

          <a
            href="https://www.linkedin.com/in/yama%C3%A7-erdo%C4%9Fan-6487a4155/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 border-white rounded-full hover:border-black"
          >
            <FaLinkedinIn className="text-black text-2xl" />
          </a>

          <a
            href="https://youtube.com/@yamacerdogan?si=B2MYCfWdI3Id9Sh1"
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 border-white rounded-full hover:border-black"
          >
            <FaYoutube className="text-black text-2xl" />
          </a>

          <a
            href="https://1000kitap.com/yamac_114"
            target="_blank"
            rel="noopener noreferrer"
            className=" border p-2 border-white rounded-full hover:border-black"
          >
            <FaBook className="text-black text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
