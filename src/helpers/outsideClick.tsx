import { useEffect } from 'react';
import { OptionType } from './NavBarContext';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(
	ref,
	setChange: (data: { postId?: string; userId?: string; grpId?: string; options?: OptionType }) => void
) {
	useEffect(
		() => {
			/**
         * Alert if clicked on outside of element
         */
			function handleClickOutside(event) {
				// console.log(ref);
				// console.log(event);
				if (ref.current && !ref.current.contains(event.target)) {
					setChange({ options: undefined });
				}
			}
			// Bind the event listener
			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mousedown', handleClickOutside);
			};
		},
		[ ref ]
	);
}
