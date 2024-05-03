import React from "react";
import logo from "../../assets/logo_itworks.png";
import facebook from "../../assets/icons/facebook-icon.svg";
import instagram from "../../assets/icons/instagram-icon.svg";
import youtube from "../../assets/icons/youtube-icon.svg";

const Header = () => {
  return (
    <header className="shrink-0 flex justify-between items-center p-3 shadow">
      <img src={logo} alt="It Works" className="w-36 sm:w-52" />
      <div className="flex gap-2">
        <a href="https://www.facebook.com/itworksfiscal/" target="_blank">
          <img
            src={facebook}
            alt="Perfil ITWorks no Facebook"
            className="cursor-pointer w-9 sm:w-12"
          />
        </a>
        <a
          href="https://www.instagram.com/impostograma_byitworks/"
          target="_blank"
        >
          <img
            src={instagram}
            alt="Perfil ITWorks no Instagram"
            className="cursor-pointer w-9 sm:w-12"
          />
        </a>
        <a href="https://www.youtube.com/@itworksoficial" target="_blank">
          <img
            src={youtube}
            alt="Canal ITWorks no Youtube"
            className="cursor-pointer w-9 sm:w-12"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
