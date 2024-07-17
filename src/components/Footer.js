import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
    return (
        <div>
            <footer className="w-full py-6 bg-gray-900 text-white">
                <div className="container mx-auto flex flex-col items-center">
                    <p className="text-sm mb-2">© 2024 Code Geniuses Team</p>
                    <p className="text-xs mb-2">Lablab AI Codestral Hackathon</p>
                    <p className="text-xs mb-4">Team Members:</p>
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/tayyabadev/"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Tayyaba Tabassum (Team Leader)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/shehroz-arshad/"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Shehroz Arshad
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/osama-ghaffar-9593aa290"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Osama Ghaffar
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/quaid-khalid"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Quaid Khalid
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/zartashiaafzal/"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Zartashia Afzal
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                Zeeshan Ahmad
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
