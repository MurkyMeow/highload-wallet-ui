import {
	cloneElement,
	type ComponentType,
	type FC,
	type ReactNode,
} from "react";

type ContextComposerProps = {
	contexts: ComponentType[];
	children?: ReactNode;
};

/**
 * A more convinient version to use:
 *
 * <ContextComposer contexts={[Context1, Context2]} />
 *
 * instead of:
 *
 * <ContextComposer contexts={[<Context1 key="1" />, <Context2 key="2" />]} />
 */
export const ContextComposer: FC<ContextComposerProps> = ({
	contexts,
	children,
}) => {
	return (
		<>
			{contexts.reduceRight(
				(child, Parent, index) =>
					cloneElement(<Parent key={index} />, {}, child),
				children,
			)}
		</>
	);
};
