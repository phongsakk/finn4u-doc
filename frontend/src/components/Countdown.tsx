"use client";
import { useEffect, useState, useRef } from "react";

function Countdown({ fromDate, toDate }: {
	fromDate: Date,
	toDate: Date
}) {
	const calculateTimeLeft = () => {
		const now = new Date();
		const difference = toDate.getTime() - now.getTime();
		if (difference <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor(
				(difference / (1000 * 60 * 60)) % 24
			),
			minutes: Math.floor(
				(difference / (1000 * 60)) % 60
			),
			seconds: Math.floor(
				(difference / 1000) % 60
			)
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [StartAuction, setStartAuction] = useState(true)
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const intervalAuction = setInterval(() => {
			const now = new Date();
			const checkStart = now.getTime() - fromDate.getTime();
			if (checkStart <= 0) {
				setStartAuction(true);
			} else {
				setStartAuction(false);
				clearInterval(intervalAuction);
			}
		}, 1000);
		return () => clearInterval(intervalAuction);
	}, [fromDate]);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			const newTimeLeft = calculateTimeLeft();
			setTimeLeft(newTimeLeft);
			if (
				newTimeLeft.days === 0 &&
				newTimeLeft.hours === 0 &&
				newTimeLeft.minutes === 0 &&
				newTimeLeft.seconds === 0
			) {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
			}
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [toDate]);

	return (
		<>
			{StartAuction ? <span className="btn btn-outline-danger pe-none">ยังไม่เริ่มการประมูล</span> : <span className="btn btn-outline-success pe-none"
				style={
					{
						backgroundColor: "#30B1753D"
					}
				}>
				{
					String(timeLeft.days).padStart(2, "0")
				}:{
					String(timeLeft.hours).padStart(2, "0")
				}:{
					String(timeLeft.minutes).padStart(2, "0")
				}:{
					String(timeLeft.seconds).padStart(2, "0")
				} </span>}

		</>
	);
}

export default Countdown;
