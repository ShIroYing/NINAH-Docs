# [姐妹 - 姐姐](https://ninah.wiki.gal.tf/characters/alconosity)

> 游戏《寻找伪人》角色之一

export const props = {"type":"random","signs":{"ext":"姐妹中有一人身亡或离开，另一人会拒绝任何检查，最好是先检查两人再枪决哦！","hands":"有红疹为人，无红疹为伪","eye":"说眼睛不红为人，说妹妹眼睛平静为伪","armpit":"有茬为人，无茬为伪","pic":"有螺旋为人，无螺旋为伪"},"plotVideo":"7556419583884807474","plotDesc":"在姐妹都存活的情况下可以得到一个电话号码","id":"alconosity"}

<Callout
  type={props.type === 'human' ? 'success' : props.type === 'visitor' ? 'warn' : props.type === 'random' ? 'idea' : undefined}
  title={
    props.type === 'mechanism' ? (
      '该人物为机制角色，不会进家门哦~'
    ) : props.type === 'human' ? (
      <>
        该人物为住客角色，并且是<strong>固定的人类</strong>哦！
      </>
    ) : props.type === 'visitor' ? (
      <>
        该人物为住客角色，并且是<strong>固定的伪人</strong>哦！
      </>
    ) : props.type === 'random' ? (
      <>
        该人物为住客角色，是人类或伪人是<strong>随机</strong>哦！
      </>
    ) : (
      '该人物为彩蛋角色，不会进家门哦~'
    )
  }>
  <img src={require(`@/assets/chars/${props.id}/char.webp`).default.src} alt='立绘' width='33%' />
  {props.info && (
    <>
      <br />
      {props.info}
    </>
  )}
</Callout>

{props.signs && <h2>判断人伪</h2>}
{props.signs?.ext && <Callout type='idea'>{props.signs.ext}</Callout>}
{
props.signs &&

<div className='force-show'><TypeTable
  type={[
    ['teeth', '牙齿'],
    ['hands', '双手'],
    ['eye', '眼睛'],
    ['armpit', '腋下'],
    ['pic', '照片'],
    ['ear', '耳朵']
  ].reduce((acc, [key, label]) => {
    if (!props.signs[key]) return acc
    acc[label] = {
      type: props.signs[key],
      description: (() => {
        try {
          const humanSrc = require(`@/assets/chars/${props.id}/signs/${key}-god.webp`).default.src
          const visitorSrc = require(`@/assets/chars/${props.id}/signs/${key}-bad.webp`).default.src
          return (
            <Tabs groupId='human-type' items={['人类', '伪人']}>
              <Tab><img src={humanSrc} width='55%' /></Tab>
              <Tab><img src={visitorSrc} width='55%' /></Tab>
            </Tabs>
          )
        } catch {}
      })(),
      required: true
    }
    return acc
  }, {})}
/></div>
}

import { Video } from 'lucide-react'

{(props.plotVideo || props.plotDesc) && <h2>个人剧情</h2>}
{props.plotVideo &&

<Card icon={<Video />} title='人物个人剧情' href={`https://www.douyin.com/video/${props.plotVideo}`}>
  by 抖音@Rug
</Card>}
{props.plotDesc && <Callout>{props.plotDesc}</Callout>}
---

> [**Page Index**] <https://ninah.wiki.gal.tf/llms.txt> | [**Full Content**] <https://ninah.wiki.gal.tf/llms-full.txt>