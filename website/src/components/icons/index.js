import * as IconList from '@ant-design/icons'
import Icon from '@ant-design/icons'

export default function (iconName) {
  const IconItem = IconList[iconName]
  // console.log(IconList);
  return (
    <>
      <Icon component={IconItem}></Icon>
    </>
  )
}
