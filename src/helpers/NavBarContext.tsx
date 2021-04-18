import { createContext } from 'react';

export enum OptionType {
	CreatePost = 'createpost',
	PostOptions = 'postoptions'
}
export type NavBarInput = {
	changeOptions?: (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => void;
};
export const NavBarContext = createContext<NavBarInput>({ changeOptions: () => {} });
