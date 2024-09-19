import { useDispatch as _useDispatch, type UseDispatch } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";

export const useDispatch = _useDispatch as UseDispatch<
	ThunkDispatch<any, any, any>
>;
