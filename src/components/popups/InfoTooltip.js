const InfoTooltip = ({ title, img, handleClose, onClose }) => {
  return (
    <div className="tooltip" onClick={onClose}>
      <div className="tooltip__container" onClick={(e) => e.stopPropagation()}>
        <button className="tooltip__btn-close" onClick={handleClose} />
        <img className="tooltip__img" src={img} alt="tooltip" />
        <h2 className="tooltip__title">{title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
