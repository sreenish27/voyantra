import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleProfileDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
        
    return (
        <>
        <nav className = "relative">
            <a href="/"><div className="text-sky-500 hover:text-sky-600 font-sans font-bold text-2xl absolute top-10 left-20">voyantra</div></a>
            <div className = "absolute top-10 right-20">
                <div>
                    <button onClick={handleProfileDropdownClick} type = "button" className="inline-flex justify-center gap-x-1.5 rounded-lg px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 hover:shadow-md" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <svg className="-mr-1 h-10 w-20 hover:bg-gray-50" aira-hidden = "true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="23%" viewBox="0 0 384 218" enable-background="new 0 0 384 218" xml:space="preserve">
                            <path fill="#FFFFFF" opacity="1.000000" stroke="none" 
	d="
M385.000000,11.000000 
	C385.000000,77.354225 385.000000,143.708450 384.655609,210.560394 
	C381.874146,213.705399 379.437073,216.352707 377.000000,219.000000 
	C251.723389,219.000000 126.446762,219.000000 1.085073,219.000000 
	C1.085073,146.423019 1.085073,73.845909 1.085073,1.000000 
	C125.020767,1.000000 249.041718,1.000000 373.553955,1.346659 
	C377.696808,4.795546 381.348389,7.897773 385.000000,11.000000 
M369.524567,80.992180 
	C358.740814,47.244186 324.710724,21.393497 289.415894,19.323586 
	C248.329666,16.914036 210.735367,41.962856 196.748871,79.624374 
	C181.288864,121.253639 199.939484,171.303619 239.632370,191.962372 
	C279.140106,212.524765 325.840393,203.482010 353.987488,168.853027 
	C375.013123,142.985504 379.907654,113.547325 369.524567,80.992180 
M93.198700,82.385612 
	C66.524002,82.385612 39.849300,82.385612 13.302339,82.385612 
	C13.302339,85.877426 13.302339,88.604897 13.302339,91.340775 
	C41.354000,91.340775 69.052925,91.340775 97.047859,91.340775 
	C97.047859,89.087868 97.382736,87.024239 96.919975,85.158440 
	C96.650261,84.071014 95.103508,83.300323 93.198700,82.385612 
M37.499882,115.614540 
	C57.264931,115.614540 77.029976,115.614540 96.735374,115.614540 
	C96.735374,112.215622 96.735374,109.467667 96.735374,106.708267 
	C68.683243,106.708267 40.946495,106.708267 13.264587,106.708267 
	C13.264587,109.784302 13.264587,112.532272 13.264587,115.614426 
	C21.216093,115.614426 28.857996,115.614426 37.499882,115.614540 
M33.500381,130.385468 
	C26.730478,130.385468 19.960573,130.385468 13.267962,130.385468 
	C13.267962,133.791016 13.267962,136.537949 13.267962,139.287994 
	C41.321991,139.287994 69.057274,139.287994 96.732063,139.287994 
	C96.732063,136.209045 96.732063,133.462097 96.732063,130.385559 
	C75.777603,130.385559 55.138958,130.385559 33.500381,130.385468 
z"/>
<path fill="#DFDFDF" opacity="1.000000" stroke="none" 
	d="
M385.000000,10.513435 
	C381.348389,7.897773 377.696808,4.795546 374.022583,1.346659 
	C377.582031,1.000000 381.164093,1.000000 385.000000,1.000000 
	C385.000000,4.006354 385.000000,7.016613 385.000000,10.513435 
z"/>
<path fill="#DFDFDF" opacity="1.000000" stroke="none" 
	d="
M377.494751,219.000000 
	C379.437073,216.352707 381.874146,213.705399 384.655609,211.029053 
	C385.000000,213.582458 385.000000,216.164917 385.000000,219.000000 
	C382.666077,219.000000 380.327789,219.000000 377.494751,219.000000 
z"/>
<path fill="#6C6C6C" opacity="1.000000" stroke="none" 
	d="
M369.705536,81.346359 
	C379.907654,113.547325 375.013123,142.985504 353.987488,168.853027 
	C325.840393,203.482010 279.140106,212.524765 239.632370,191.962372 
	C199.939484,171.303619 181.288864,121.253639 196.748871,79.624374 
	C210.735367,41.962856 248.329666,16.914036 289.415894,19.323586 
	C324.710724,21.393497 358.740814,47.244186 369.705536,81.346359 
M246.847092,138.255524 
	C237.811371,143.393326 229.918671,149.818451 223.808029,158.204834 
	C252.726181,196.546600 314.187225,196.496674 342.170197,158.157440 
	C332.687927,145.301483 319.685699,137.275101 304.397125,131.999817 
	C327.176880,114.223900 325.484497,88.202789 312.452789,73.573326 
	C297.514587,56.803658 272.556763,55.408051 256.778198,70.251320 
	C248.752716,77.801033 244.352158,87.043182 244.065460,97.987068 
	C243.695267,112.118713 250.020035,123.104324 261.452087,131.622726 
	C256.517944,133.823563 251.995590,135.840744 246.847092,138.255524 
z"/>
<path fill="#383838" opacity="1.000000" stroke="none" 
	d="
M93.665016,82.386368 
	C95.103508,83.300323 96.650261,84.071014 96.919975,85.158440 
	C97.382736,87.024239 97.047859,89.087868 97.047859,91.340775 
	C69.052925,91.340775 41.354000,91.340775 13.302339,91.340775 
	C13.302339,88.604897 13.302339,85.877426 13.302339,82.385612 
	C39.849300,82.385612 66.524002,82.385612 93.665016,82.386368 
z"/>
<path fill="#383838" opacity="1.000000" stroke="none" 
	d="
M36.999893,115.614487 
	C28.857996,115.614426 21.216093,115.614426 13.264587,115.614426 
	C13.264587,112.532272 13.264587,109.784302 13.264587,106.708267 
	C40.946495,106.708267 68.683243,106.708267 96.735374,106.708267 
	C96.735374,109.467667 96.735374,112.215622 96.735374,115.614540 
	C77.029976,115.614540 57.264931,115.614540 36.999893,115.614487 
z"/>
<path fill="#383838" opacity="1.000000" stroke="none" 
	d="
M34.000347,130.385513 
	C55.138958,130.385559 75.777603,130.385559 96.732063,130.385559 
	C96.732063,133.462097 96.732063,136.209045 96.732063,139.287994 
	C69.057274,139.287994 41.321991,139.287994 13.267962,139.287994 
	C13.267962,136.537949 13.267962,133.791016 13.267962,130.385468 
	C19.960573,130.385468 26.730478,130.385468 34.000347,130.385513 
z"/>
<path fill="#FFFFFF" opacity="1.000000" stroke="none" 
	d="
M247.160156,138.056717 
	C251.995590,135.840744 256.517944,133.823563 261.452087,131.622726 
	C250.020035,123.104324 243.695267,112.118713 244.065460,97.987068 
	C244.352158,87.043182 248.752716,77.801033 256.778198,70.251320 
	C272.556763,55.408051 297.514587,56.803658 312.452789,73.573326 
	C325.484497,88.202789 327.176880,114.223900 304.397125,131.999817 
	C319.685699,137.275101 332.687927,145.301483 342.170197,158.157440 
	C314.187225,196.496674 252.726181,196.546600 223.808029,158.204834 
	C229.918671,149.818451 237.811371,143.393326 247.160156,138.056717 
z"/>
                        </svg>
                    </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-custom bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className = "py-1" role="none">
                        <Link to="/signup" className="text-gray-700 font-normal hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" tabindex = "-1" id="menu-item-0">Sign up</Link>
                        <Link to="/login" className = "text-gray-700 font-light hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" tabindex = "-1" id = "menu-item-1">Log in</Link>
                    </div>
                    <div className = "py-1" role="none">
                        <a href="#" className = "text-gray-700 font-light hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Premium ⚡</a>
                        <a href="#" className = "text-gray-700 font-light hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Support</a>
                    </div>
                        
                </div>
                )}
                
                </div>
                
            
            </div>
        </nav>
        </>
    );
};

export default NavBar;