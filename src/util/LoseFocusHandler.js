import React, { useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useLoseFocusHandler(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch({type: 'CLOSE_SIDEDRAWER'});
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function LoseFocusHandler(props) {
  const wrapperRef = useRef(null);
  useLoseFocusHandler(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}

LoseFocusHandler.propTypes = {
  children: PropTypes.element.isRequired
};

export default LoseFocusHandler;
