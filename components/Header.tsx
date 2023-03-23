import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="p-5 flex justify-between  sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image
          src="https://links.papareact.com/4t3"
          alt="logo"
          height={30}
          width={30}
        />
        <div>
          <h1 className="font-bold">
            The PAPAFAM <span className="text-violet-500">AI</span> Image
            Generator 1234
          </h1>
          <h2 className="text-xs">Powered by DALL·E 2 & Chat GPT</h2>
        </div>
      </div>

      <div className="flex divide-x text-gray-500 items-center text-xs md:text-base">
        <Link
          href="https://www.papareact.com"
          className="px-2 font-light text-right"
        >
          Join Zero to Full Stack Hero
        </Link>
        <Link
          href="https://links.papareact.com/microsoft-youtube-build"
          className="px-2 font-light"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
