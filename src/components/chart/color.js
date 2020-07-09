export const colorMap = {
  访问数据: [
    ['#5b89dd', '#EEF3FF'],
    ['#862FB7', '#F6EEFF'],
    ['#F676A8', '#FFEEEE']
  ],
  用户数: [
    ['#5b89dd', '#EEF3FF'],
    ['#862FB7', '#F6EEFF'],
    ['#F676A8', '#FFEEEE'],
    ['#a64d7f', '#ffecfc'],
    ['#4d8ba6', '#edfaff']
  ],
  链接数: [
    ['#5b89dd', '#EEF3FF'],
    ['#862FB7', '#F6EEFF'],
    ['#F676A8', '#FFEEEE'],
    ['#a64d7f', '#ffecfc'],
    ['#4d8ba6', '#edfaff'],
    ['#a66d4d', '#fff3ec'],
    ['#96a64d', '#f7ffec'],
    ['#086ca2', '#EEF3FF'],
    ['#5b89dd', '#EEF3FF'],
    ['#862FB7', '#F6EEFF'],
    ['#F676A8', '#FFEEEE']
  ]
}

const colorArr = [...colorMap['访问数据'], ...colorMap['用户数'], ...colorMap['链接数']]

export const colorArr1 = colorArr.map((item) => item[0])
