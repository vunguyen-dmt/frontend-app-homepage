import React from "react";
import PropTypes from 'prop-types';

function IconInfo({imageSource, textInfo, uppercase, padding, flex}) {

    const updateClass = "" + flex + padding;

    return (
       <p className={updateClass}>
            <img src={imageSource}/>
            <span className={uppercase ? 'text-uppercase pl-1' : 'pl-1'}>{textInfo}</span>
       </p> 
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