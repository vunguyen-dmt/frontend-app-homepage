import React from "react";
import PropTypes from 'prop-types';

function IconInfo({imageSource, textInfo, uppercase, padding, flex}) {

    const updateClass = flex + " py-1 " + padding;

    return (
       <div className={updateClass}>
            <img src={imageSource}/>
            <span className={uppercase ? 'text-uppercase pl-1' : 'pl-1'}>{textInfo}</span>
       </div> 
    )
}

IconInfo.propTypes = {
    imageSource: PropTypes.string,
    textInfo: PropTypes.string,
    uppercase: PropTypes.bool,
    padding: PropTypes.string,
    flex: PropTypes.string,
}

IconInfo.defaultProps = {
    uppercase: false,
};

export default IconInfo;