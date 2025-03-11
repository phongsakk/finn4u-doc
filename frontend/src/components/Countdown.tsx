"use client";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

function Countdown({toDate} : {
	toDate : Date
}) {

	const calculateTimeLeft = () => {
		const now = new Date();
		const difference = toDate.getTime() - now.getTime();
		if (difference <= 0) {
			return {days: 0, hours: 0, minutes: 0, seconds: 0};
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

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return() => clearInterval(timer);
	}, [toDate]);

	return (
		<span className="btn btn-outline-success pe-none"
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
		} </span>
	);
}

export default Countdown;
