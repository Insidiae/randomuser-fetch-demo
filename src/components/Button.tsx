function Button(
	props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
		//? For now, let's just use the same classNames for every single button
		//? In the future, consider using variant props instead
		//? More info here:
		//? https://www.protailwind.com/just-in-time-friendly-style-variants-in-tailwind-css-ui-components-part-2#ok-but-how-about-merging-both-classname-attributes
		className?: "Design System decision: All buttons should look the same (for now)!";
	},
) {
	return (
		<button
			{...props}
			className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-center text-white disabled:bg-blue-400"
		/>
	);
}

export default Button;
