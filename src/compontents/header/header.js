import React from 'react';
import PropTypes from 'prop-types';
import './header.css';

function Header(props) {
	return <div className="header">{props.title}</div>;
}

Header.propTypes = {
	title: PropTypes.string
};
export default Header;
