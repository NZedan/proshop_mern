import React from 'react';
import { Alert } from 'react-bootstrap';

// Variant controls Bootstrap element, children will be the text in the alert
const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
