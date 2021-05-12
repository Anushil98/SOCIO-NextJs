import { createContext } from 'react';

export enum OptionType {
	CreatePost = 'createpost',
	PostOptions = 'postoptions'
}
export type NavBarInput = {
	changeOptions?: (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => void;
	showSideBar?: React.Dispatch<React.SetStateAction<number>>;
};
export const NavBarContext = createContext<NavBarInput>({ changeOptions: () => {} });
