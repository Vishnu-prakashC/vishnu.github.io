const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6">
      <h1 className="text-xl font-bold">Vishnu</h1>

      <ul className="flex gap-8">
        <li className="cursor-pointer hover:text-gray-400">
          <a href="#about">About</a>
        </li>
        <li className="cursor-pointer hover:text-gray-400">
          <a href="#projects">Projects</a>
        </li>
        <li className="cursor-pointer hover:text-gray-400">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
