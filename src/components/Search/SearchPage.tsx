import { debounce } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FetchSearchItems } from './FetchSearchItems';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

const Search = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;
export default function SearchPage(props: { types: 'User' | 'Group' | 'All'; invite?: boolean }) {
	const [ searchText, setsearchText ] = useState('');
	const [ mainText, setmainText ] = useState<string>('');
	const [ page, setpage ] = useState(1);
	const [ flush, setflush ] = useState(false);
	const changeHandler = useCallback(
		debounce((text: string) => {
			setflush(true);
			setpage(1);
			setmainText(text);
			setflush(false);
		}, 500),
		[]
	);

	useEffect(
		() => {
			changeHandler(searchText);
		},
		[ searchText, changeHandler ]
	);
	const { hasMore, loading, items } = FetchSearchItems(page, props.types, mainText, flush);
	const observer = useRef(null);
	const lastElement = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setpage((x) => x + 1);
					}
				},
				{ root: document.querySelector('body'), threshold: 0.75 }
			);
			if (node) {
				observer.current.observe(node);
			}
		},
		[ loading, hasMore ]
	);

	return (
		<Search>
			<SearchBar type={props.types} changeValue={setsearchText} />
			{typeof window !== 'undefined' ? (
				<SearchList searchItems={items} hasMore={hasMore} loading={loading} refProp={lastElement} />
			) : null}
		</Search>
	);
}
