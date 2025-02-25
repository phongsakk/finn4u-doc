"use client"
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import dayjs from "dayjs";
import { apiRefreshToken } from "@utils/api/internal";
import { apiRefreshTokenResponseSchema } from "@libs/validate/auth";

const TokenRefresher = () => {
	const { data: session, update } = useSession();

	useEffect(() => {
		if (!session || !session.user.accessTokenExpiredAt) return;

		const interval = setInterval(async () => {
			const isExpired = dayjs().isAfter(dayjs(session.user.accessTokenExpiredAt));
			const isTimeout = dayjs().isAfter(dayjs(session.user.refreshTokenExpiredAt));
			console.log("Access token expired:", dayjs(session.user.accessTokenExpiredAt));

			if (isExpired && !isTimeout) {
				console.log("🔄 Access token expired, refreshing...");

				const response = await apiRefreshToken({ refresh_token: session.user.refreshToken });

				if (!response) {
					console.error("❌ Refresh failed, logging out...");
					signOut();
					return;
				}

				const refreshed = await apiRefreshTokenResponseSchema.parseAsync(response.data);
				console.log(refreshed);

				await update({
					id: refreshed.data.refresh_token,
					image: refreshed.data.refresh_token,
					accessToken: refreshed.data.access_token,
					refreshToken: refreshed.data.refresh_token,
					accessTokenExpiredAt: dayjs(refreshed.data.access_expires_in),
					refreshTokenExpiredAt: dayjs(refreshed.data.refresh_expires_in),
				});

				console.log("✅ Token refreshed successfully");
			} else {
				signOut();
			}
		}, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, [session]);

	return null;
};

export default TokenRefresher;
