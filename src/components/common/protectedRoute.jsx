import { render } from '@testing-library/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ component: Component, path, props, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				console.log(props);
				if (!auth.getCurrentUser())
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location.pathname },
							}}
						/>
					);
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
};

export default ProtectedRoute;
