const baseClasses =
	"flex items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-white";
const variantClasses = {
	primary: "bg-blue-600 disabled:bg-blue-400",
	success: "bg-green-600 disabled:bg-green-400",
	danger: "bg-red-600 disabled:bg-red-400",
};

function Button({
	variant = "primary",
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	//? Instead of letting users pass arbitrary classNames,
	//? we'll use pre-styled variants to make the buttons look more consistent.
	//? More info here:
	//? https://www.protailwind.com/just-in-time-friendly-style-variants-in-tailwind-css-ui-components-part-2#ok-but-how-about-merging-both-classname-attributes
	className?: "Design System decision: Use one of the pre-styled variants!";
	variant?: keyof typeof variantClasses;
}) {
	return (
		<button
			{...props}
			className={`${baseClasses} ${variantClasses[variant]}`}
		/>
	);
}

export default Button;
