'use client';
import Link from 'next/link';

const Sidebar = ({ countries, openSidebar, setOpenSidebar, openCountry, setOpenCountry }) => {
    const handleCountryClick = (country) => {
        setOpenCountry(openCountry === country.name ? null : country.name);
    };

    return (
        <div
            className={`transition-all duration-350 bg-white p-6 mr-1 ${openSidebar ? 'w-[250px]' : 'w-[80px]'}`}
        >
            <h2 className={`text-2xl font-semibold text-center mb-8 flex justify-between items-center`}>
                {openSidebar && '나라 선택'}
                <button
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="p-2 text-black hover:text-blue-500"
                >
                    {openSidebar ? '◀' : '▶'}
                </button>
            </h2>
            <div className={`space-y-4 ${openSidebar ? 'block' : 'hidden'}`}>
                {countries.map((country, index) => (
                    <div key={index}>
                        <button
                            onClick={() => handleCountryClick(country)}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 w-full text-left"
                        >
                            {country.name}
                        </button>
                        {openCountry === country.name && (
                            <div className="ml-4 mt-2 space-y-2">
                                {country.cities.map((city, idx) => (
                                    <Link key={idx} href={`/${country.name.toLowerCase()}/${city.toLowerCase()}`}>
                                        <button className="mt-2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full text-left">
                                            {city}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
