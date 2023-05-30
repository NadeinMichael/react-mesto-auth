import { useContext } from 'react';

import AppContext from '../../contexts/AppContext';
import usePopupClose from '../../hooks/usePopupClose';

const InfoTooltip = ({ title, img, isOpen }) => {
  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className="tooltip" onClick={closeAllPopups}>
      <div className="tooltip__container" onClick={(e) => e.stopPropagation()}>
        <button className="tooltip__btn-close" onClick={closeAllPopups} />
        <img className="tooltip__img" src={img} alt="tooltip" />
        <h2 className="tooltip__title">{title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
