# [前部长](https://ninah.wiki.gal.tf/characters/sweating)

> 游戏《寻找伪人》角色之一 / 外号: 良子

export const props = {"type":"random","signs":{"hands":"有 无伤、受伤 两种状态，无法判断，但 举枪威胁 时若为人会求死，若为伪会自曝手有泥土","eye":"有 眼白、眼红 两种状态，无法判断","armpit":"正常为人，溃烂为伪"},"plotVideo":"7559097073501605158","aka":"外号: 良子","id":"sweating"}

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