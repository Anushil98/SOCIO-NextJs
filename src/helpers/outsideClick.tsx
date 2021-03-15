import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref, setChange: React.Dispatch<React.SetStateAction<number>>) {
	useEffect(
		() => {
			/**
         * Alert if clicked on outside of element
         */
			function handleClickOutside(event) {
				// console.log(ref);
				// console.log(event);
				if (ref.current && !ref.current.contains(event.target)) {
					// alert('You clicked outside of me!');
					const prev = (ref.current as HTMLElement).className;
					// console.log((ref.current as HTMLElement).className);
					(ref.current as HTMLElement).className =
						(ref.current as HTMLElement).className.split(' ').pop() === 'hide'
							? (ref.current as HTMLElement).className
							: (ref.current as HTMLElement).className
									.split(' ')
									.slice(0, (ref.current as HTMLElement).className.split(' ').length - 1)
									.concat([ 'hide' ])
									.join(' ');
					// console.log((ref.current as HTMLElement).className);
					if (prev !== (ref.current as HTMLElement).className) {
						if (prev.split(' ').pop() === 'show') setChange(0);
					}
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
