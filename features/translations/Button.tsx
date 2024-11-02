export const Button = ({
	className,
	onClick,
	children,
	...props
}: {
	onClick: () => void;
	className?: string;
	children: React.ReactNode;
}) => (
	<button
		className={`px-6 py-2  text-white rounded-lg  focus:outline-none shadow-md ${className}`}
		onClick={onClick}
		{...props}
	>
		{children}
	</button>
);
