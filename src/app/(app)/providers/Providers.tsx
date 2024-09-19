import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useMemo, type ReactNode } from "react";

import { ContextComposer } from "@/shared/utils/react/ContextComposer/ContextComposer";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { ReduxProvider } from "./ReduxProvider";

function AntdRegistry2({ children }: { children?: ReactNode }) {
	return <AntdRegistry>{children}</AntdRegistry>;
}

export function Providers({ children }: { children?: ReactNode }) {
	const contexts = useMemo(() => {
		return [
			// list your contexts here
			ReduxProvider,
			ReactQueryProvider,
			AntdRegistry2,
		];
	}, []);

	return <ContextComposer contexts={contexts}>{children}</ContextComposer>;
}
