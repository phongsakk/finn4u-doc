function Loading({ num = 3 }: { num?: number }) {
	return (
		<>
			{[...Array(num)].map((_, i) => (
				<div key={i} className="loader row mb-4">
					<div className="load-image col-sm-5 bg-light"></div>
					<div className="load-detail col">
						{[...Array(6)].map((_, j) => (
							<div key={j} className="load-items bg-light"></div>
						))}
					</div>
				</div>
			))}
		</>
	);
}

export default Loading;
