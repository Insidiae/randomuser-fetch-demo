function UserCardSkeleton() {
	return (
		<article className="flex items-center gap-4 rounded-md border border-black p-4">
			<div className="h-16 w-16 animate-pulse  rounded-full bg-slate-500" />
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-bold">Loading...</h2>
				<div className="h-4 w-64 animate-pulse bg-slate-500" />
			</div>
		</article>
	);
}

export default UserCardSkeleton;
