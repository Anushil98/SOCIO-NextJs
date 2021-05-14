import { Groups as staticgroupsdata } from "../../staticData/groups";
import { users } from "../../staticData/users";
import { Group } from "../../types/group.type";
import { User } from "../../types/user.type";

export const searchApi = (page: number,type:"All"|"User"|"Group",searchText:string): Promise<{group:Group,user:User}[]> => {
	return new Promise((resolve, reject) => {
        if(searchText === ""){
            return [];
        }
		if(type==="All"){
            const staticgroups:{group:Group,user:User}[] = staticgroupsdata.filter(grp=>grp.grpName.includes(searchText)).map(po=>{return {group:po,user:null}});
            const staticusers:{group:Group,user:User}[] = users.filter(grp=>grp.firstname.includes(searchText)).map(user=>{return {group:null,user}});
            setTimeout(() => resolve([...staticgroups,...staticusers].slice((page - 1) * 3, page * 3)), 1000);
        }
        if(type==="User"){
            const staticusers:{group:Group,user:User}[] = users.filter(grp=>grp.firstname.includes(searchText)).map(user=>{return {group:null,user}});
            setTimeout(() => resolve([...staticusers].slice((page - 1) * 3, page * 3)), 1000);
        }
        if(type==="Group"){
            const staticgroups:{group:Group,user:User}[] = staticgroupsdata.filter(grp=>grp.grpName.includes(searchText)).map(po=>{return {group:po,user:null}});
            setTimeout(() => resolve([...staticgroups].slice((page - 1) * 3, page * 3)), 1000);
        }
	});
};
