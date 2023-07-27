import React, { useState } from 'react';
import onLamp from './pics/on.png';
import offLamp from './pics/off.jpeg';

function Toggle() {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <div className='imageDiv'>
        <img
          style={{ width: '250px', height: '250px' }}
          src={isClicked ? onLamp : offLamp}
          alt={isClicked ? 'Turned on' : 'Turned off'}
        />
      </div>

      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
}

export default Toggle;
