import React from 'react';
import styled from 'styled-components';
import { Group } from '../../types/group.type';
import { User } from '../../types/user.type';
import Loader from '../Loaders/Loader';

const SearchPanel = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	::-webkit-scrollbar {
		width: 0px;
	}
	::-webkit-scrollbar-thumb {
		display: none;
	}
`;

const SearchCard = styled.div`
	height: 200px;
	background-color: var(--div-color);
	margin: 5px 0px;
`;
export default function SearchList(props: {
	searchItems: {
		group: Group;
		user: User;
	}[];
	hasMore: boolean;
	loading: boolean;
	refProp: (node: any) => void;
}) {
	return (
		<SearchPanel>
			{props.searchItems.map((item, index) => {
				return props.searchItems.length - 1 === index ? (
					<SearchCard key={index} ref={props.refProp}>
						{JSON.stringify(item)}
					</SearchCard>
				) : (
					<SearchCard key={index}>{JSON.stringify(item)}</SearchCard>
				);
			})}
			{props.searchItems.length === 0 ? <SearchCard>No items to display</SearchCard> : null}
			{props.loading && props.searchItems.length > 0 ? <Loader /> : null}
		</SearchPanel>
	);
}
