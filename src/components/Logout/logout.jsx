import { useEffect } from 'react';
import { toast } from 'react-toastify';
import auth from '../../services/authService';

const Logout = () => {
	useEffect(() => {
		auth.logout();
		toast.success('LOGOUT SUCCESS');
		window.location = '/movies';
	}, []);
	return null;
};

export default Logout;
