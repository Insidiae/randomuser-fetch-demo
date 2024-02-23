//? Credits: EpicWeb.dev's Error Handling lesson
//? https://foundations.epicweb.dev/07
import {
	isRouteErrorResponse,
	useParams,
	useRouteError,
	type ErrorResponse,
} from "react-router-dom";

type StatusHandler = (info: {
	error: ErrorResponse;
	params: Record<string, string | undefined>;
}) => JSX.Element | null;

function getErrorMessage(error: unknown) {
	if (typeof error === "string") return error;
	if (
		error &&
		typeof error === "object" &&
		"message" in error &&
		typeof error.message === "string"
	) {
		return error.message;
	}
	console.error("Unable to get error message for error", error);
	return "Unknown Error";
}

export function GeneralErrorBoundary({
	defaultStatusHandler = ({ error }) => (
		<p>
			{error.status} {error.data}
		</p>
	),
	statusHandlers,
	unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
	defaultStatusHandler?: StatusHandler;
	statusHandlers?: Record<number, StatusHandler>;
	unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}) {
	const error = useRouteError();
	const params = useParams();

	if (typeof document !== "undefined") {
		console.error(error);
	}

	return (
		<div className="container mx-auto flex h-full w-full items-center justify-center bg-red-600 p-20 text-3xl text-white">
			{isRouteErrorResponse(error)
				? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
						error,
						params,
					})
				: unexpectedErrorHandler(error)}
		</div>
	);
}
