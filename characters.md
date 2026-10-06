# [人物图鉴](https://ninah.wiki.gal.tf/characters)

> 游戏《寻找伪人》的人物图鉴

游戏人物主要分为几类:

* 住客（在门前选择是否放入或被特定角色强行塞入）
* 机制（不进门，但是通过在门前交流 **获得道具**/**带走人**/**塞入人**/**触发结局** 等）
* 彩蛋（与其他游戏的联动角色，不会进门）

<Callout type="idea">
  部分住客会在被拒绝进门时拿出道具再次请求，此时可以获得道具并放入或仍然拒绝

  <Callout>
    部分角色会固定拿道具，部分为随机概率，包括

    **人物**

    与

    **道具**
  </Callout>
</Callout>

<Callout type="idea">
  每个住客均有自己的

  **个人剧情**

  （部分是

  **结局**

  ），并且在夜间会发出一些声音？
</Callout>

***





<Cards>
  {Object.entries((await charsConfig.getSchemas()).characters.bundled.paths).map(([key, item]) =>
      (info => (
        <Card
          key={key}
          icon={getPageTreePeers(source.getPageTree(), '/characters').find(peer => peer.url === '/characters/' + key)?.icon}
          title={info.summary}
          description={info.parameters.find(item => item.name === 'aka')?.example}
          href={key.toLowerCase()}
        />
      ))(item[Object.keys(item)[0].toLowerCase()])
    )}
</Cards>

---

> [**Page Index**] <https://ninah.wiki.gal.tf/llms.txt> | [**Full Content**] <https://ninah.wiki.gal.tf/llms-full.txt>