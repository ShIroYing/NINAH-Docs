# [义警检查机制](https://ninah.wiki.gal.tf/mechanics/vigilante)

*义警* 会在 **第八天** 到来，不会检查主角

在 **第十天** 再来时，则会第一次检查

在 **第十二天** 则会第二次检查

<Callout type="warn">
  在第一次检查中检查过的部位无法在第二次检查中重复检查！
</Callout>

在两次检查中若被他判为伪人，则会直接对枪进入**插曲结局**

## 主角自身特征 [#主角自身特征]

<Callout type="warn">
  电视播出的伪人特征均不属实，然而义警却盲目听信从而滥杀无辜，
  所以在检查时要确保自身特征不符合电视播出的伪人特征才可以通过检查

  <Callout title="通常建议让义警检查以下内容">
    * **不挖洞**或挖洞后已经**洗手**: 检查双手
    * 没喝过**饮料**/**咖啡**: 检查眼睛
    * 已经**自查**过腋下: 检查腋下
  </Callout>
</Callout>

<TypeTable
  type="{
  牙齿: {
    type: '依情况通过',
    description: (
      <>
        牙齿本来就很白，会被认定为伪人，可以通过<strong>吸烟</strong>来使得牙黄，然后才可检查牙齿
      </>
    ),
    required: true
  },
  双手: {
    type: '依情况通过',
    description: (
      <>
        双手在不挖洞的情况下不会有泥土，可以直接检查
        <br />
        挖洞后可以通过<strong>自查</strong>来清洗双手
      </>
    ),
    required: true
  },
  眼睛: {
    type: '依情况通过',
    description: (
      <>
        眼睛会在喝<strong>饮料</strong>或<strong>咖啡</strong>后变红，需要等几天才可消红
      </>
    ),
    required: true
  },
  腋下: {
    type: '依情况通过',
    description: (
      <>
        腋下会<strong>每隔几天</strong>或<strong>喝茶后</strong>长真菌，可以通过<strong>自查</strong>
        来清洗腋下
      </>
    ),
    required: true
  },
  拍照: {
    type: '未知情况',
    description: '机制暂时未知，如果图片中头部有迷雾而其他地方正常，则可以通过检查',
    required: true
  },
  耳朵: {
    type: '无法通过',
    description: '由于义警自发当义警过早，并不知道该检查点，检查耳朵会不通过',
    required: true
  }
}"
/>

---

> [**Page Index**] <https://ninah.wiki.gal.tf/llms.txt> | [**Full Content**] <https://ninah.wiki.gal.tf/llms-full.txt>