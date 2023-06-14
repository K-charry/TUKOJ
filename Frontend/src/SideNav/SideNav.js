import React from 'react'
import SideNavItem from './SideNavItem'
import menuData from '../sidebar/menuData.json' //나중에 json 파일 받으면 그거로 하면 됨
import {SnContainer} from'./Sn.style'

function SideNav ({items}){
    const nest = (menuData, menuId = "ROOT", link = 'pmenuId') =>
    menuData.filter(item => item[link] === menuId)
      .map(item => ({ ...item, childrens: nest(menuData, item.menuId) }));
  const tree = nest(menuData);
  console.log(tree)
    return(
    <SnContainer>
      {tree.map((item, index) => ( // 수정된 부분
        <SideNavItem item={item} key={index} />
      ))}
    </SnContainer>
    );
}

export default SideNav;
