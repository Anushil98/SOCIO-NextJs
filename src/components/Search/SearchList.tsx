import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Router from 'next/router';
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
	height: fit-content;
	background-color: var(--div-color);
	margin: 3px 0px 3px 0px;
	display: flex;
	justify-content: flex-start;
	padding: 5px 0px 5px 10px;
`;

const Avatar =
	styled.div <
	{ bgImg: string } >
	`
	height:60px;
	width:60px;
	background-image:${(props) => {
		return `url(${props.bgImg})`;
	}};

	border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;
const Details = styled.div`
	font-family: shanti;
	color: var(--text-color);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-left: 10px;
	margin-top: 10px;
`;
const Name = styled.div`
	font-family: shanti;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 200px;
	white-space: nowrap;
	:nth-child(2n) {
		color: var(--color3);
		font-size: small;
	}
`;

const NoItems = styled.div`
	height: fit-content;
	color: var(--text-color);
	font-size: 100px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 31px 0px 0px 31px;
	align-items: center;
	p {
		font-size: medium;
		margin: 10px;
		text-align: center;
	}
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
					<SearchCard
						key={index}
						ref={props.refProp}
						onClick={() => {
							if (item.user) Router.push(`/profile/${item.user.id}`);
							else Router.push(`/groups/${item.group.grpId}`);
						}}
					>
						<Avatar
							bgImg={
								item.group ? (
									item.group.cover || '/default/avatar.jpg'
								) : (
									item.user.avatar || '/default/avatar.jpg'
								)
							}
						/>
						<Details>
							<Name>
								{item.group ? item.group.grpName : `${item.user.firstname} ${item.user.lastname}`}
							</Name>
							<Name>@{item.group ? item.group.grpHandle : item.user.username}</Name>
						</Details>
					</SearchCard>
				) : (
					<SearchCard
						key={index}
						onClick={() => {
							if (item.user) Router.push(`/profile/${item.user.id}`);
							else Router.push(`/groups/${item.group.grpId}`);
						}}
					>
						<Avatar
							bgImg={
								item.group ? (
									item.group.cover || '/default/avatar.jpg'
								) : (
									item.user.avatar || '/default/avatar.jpg'
								)
							}
						/>
						<Details>
							<Name>
								{item.group ? item.group.grpName : `${item.user.firstname} ${item.user.lastname}`}
							</Name>
							<Name>@{item.group ? item.group.grpHandle : item.user.username}</Name>
						</Details>
					</SearchCard>
				);
			})}
			{props.searchItems.length === 0 ? (
				<NoItems>
					<ErrorOutlineIcon fontSize={'inherit'} />
					<p>Type in the search bar to get your desired results</p>
				</NoItems>
			) : null}
			{props.loading && props.searchItems.length > 0 ? <Loader /> : null}
		</SearchPanel>
	);
}
