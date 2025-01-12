import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce" aria-describedby={id} type="button" onClick={handleClick}>
        New List
      </Button>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody className="mt-16">
          
          <input placeholder="enter a name" name="text" type="text" />
          <Button> 
            Send  
          </Button>
        </PopupBody>
      </BasePopup>
    </div>
  );
}

const PopupBody = styled('div')();

const Button = styled('button')();
