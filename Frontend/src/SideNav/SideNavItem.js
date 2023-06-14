import React from 'react'
import {SnTitle, SnSub} from './Sn.style'

function SideNavItem ({item, depth = 0}){
    return(
        <div>
            <SnTitle style={{paddingLeft: depth * 20}}>[{depth}]{item.menuNm}</SnTitle>
            <SnSub>
                {item.childrens.map((child) => (
                <SideNavItem item={child} depth={depth + 1}/>
            ))}
        </SnSub>
      </div>
    );
}

export default SideNavItem;