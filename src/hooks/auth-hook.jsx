import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	let location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const u = JSON.parse(localStorage.getItem("user"));

		if (u && new Date() < new Date(u.expireAt)) {
			const timeDiff = new Date(u.expireAt) - new Date();

			if (timeDiff <= 2 * 60 * 1000) {
				fetch(`http://localhost:1000/auth/refresh-token/${u.token}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: u.email,
						password: u.password,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.type === "success") {
							localStorage.setItem("user", JSON.stringify(data.data));
							setUser(data.data);
						}
					});
			} else {
				setUser(u);
			}
		} else {
			navigate(`/sign-in?returnUrl=${location.pathname}`, { replace: true });
		}

		return () => setUser(null);
	}, [location]);

	return { user };
};
