import * as IconList from '@ant-design/icons'
import Icon from '@ant-design/icons'

export default function (iconName) {
    const IconItem = IconList[iconName];
    return <>
    <Icon component={IconItem}></Icon>
    </>
}