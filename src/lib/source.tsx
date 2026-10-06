import path from 'path'

import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { docs } from 'fumadocs-mdx:collections/server'
import { createOpenAPI, openapiPlugin, openapiSource } from 'fumadocs-openapi/server'
import { GithubInfo } from 'fumadocs-ui/components/github-info'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import type { Author } from 'next/dist/lib/metadata/types/metadata-types'
import Image from 'next/image'
import Link from 'next/link'
import type { OpenAPIV3_1 } from 'openapi-types'
import { type ReactNode } from 'react'

export const docsConfig = {
	title: '深入伪人世界？！',
	baseUrl: 'https://ninah.wiki.gal.tf',
	authors: [
		{ name: 'ShIroRRen', url: 'https://shiror.ren' },
		{
			name: 'Rug',
			url: 'https://www.douyin.com/user/MS4wLjABAAAA27iQnjKSmFnpgvZq_khJAhUW3LbVRSSoK0FDn1YkHokZNUvCZHmr3Nl9QWUZriux'
		}
	] satisfies Author[],
	icon: {
		url: new URL('../assets/logo.webp', import.meta.url),
		size: 32
	} satisfies {
		url: URL
		size: number | { width: number; height: number }
	},
	footer: {
		links: [
			{
				title: '游戏攻略',
				items: [
					{
						label: '游戏机制',
						href: '/mechanics/'
					},
					{
						label: '人物图鉴',
						href: '/characters/'
					},
					{
						label: '游戏结局',
						href: '/endings/'
					}
				]
			},
			{
				title: '游戏资源',
				items: [
					{
						label: 'Steam 官网',
						href: 'https://s.team'
					},
					{
						label: '游戏主页',
						href: 'https://store.steampowered.com/app/3180070/_/'
					},
					{
						label: '开发商主页',
						href: 'https://store.steampowered.com/curator/39433050'
					}
				]
			},
			{
				title: '友链',
				items: [
					{
						label: '广告',
						href: 'https://ja7.gal.tf/ad'
					},
					{
						label: '回忆溢出工作组',
						href: 'https://oom-wg.dev'
					},
					{
						label: '200OK Working',
						href: 'https://200ok.work'
					}
				]
			}
		],
		copyright: (
			<span>
				根据{' '}
				<Link href='https://license.fileto.download/' target='_blank'>
					File to Downloader 许可证
				</Link>{' '}
				授权许可。©️ 2016-{new Date().getFullYear()}{' '}
				<Link href='https://shiror.ren/' target='_blank'>
					白彩恋
				</Link>
				，版权所有，保留一切权利。
			</span>
		)
	} satisfies {
		links: {
			title: string
			items: {
				label: string
				href: string
			}[]
		}[]
		copyright: ReactNode
	},
	git: {
		user: 'ShIroYing',
		repo: 'NINAH-Docs',
		branch: 'shiror.ren'
	} satisfies {
		user: string
		repo: string
		branch: string
		dir?: string
	} as {
		user: string
		repo: string
		branch: string
		dir?: string
	}
}

export const docsOptions = {
	nav: {
		title: (
			<div className='flex items-center gap-2'>
				<Image alt='Logo' src='/icon' width={32} height={32} className='rounded-md' priority unoptimized />
				<span className='font-semibold'>{docsConfig.title}</span>
			</div>
		)
	},
	links: [
		{
			type: 'custom',
			children: <GithubInfo owner={docsConfig.git.user} repo={docsConfig.git.repo} />
		}
	],
	githubUrl: `https://github.com/${docsConfig.git.user}/${docsConfig.git.repo}`,
	themeSwitch: { enabled: false }
} satisfies BaseLayoutProps as BaseLayoutProps

const defineDocs = (
	input: Record<
		string,
		{
			title: string
			desc: string
			values: Record<string, any>
		}
	>
) => {
	const paths = {} as Record<string, any>

	for (const [path, item] of Object.entries(input))
		paths[path] = {
			head: {
				summary: item.title,
				description: item.desc,
				parameters: Object.entries(item.values).map(([name, value]) => ({
					name,
					in: 'unknown',
					example: value
				})),
				responses: { '200': { description: 'OK' } }
			}
		} satisfies OpenAPIV3_1.PathsObject[string]

	return {
		openapi: '3.2.0' as const,
		info: { title: 'OpenAPI Document', version: '0.0.0' },
		paths
	} satisfies OpenAPIV3_1.Document
}
const defineInfo = (
	input: Record<
		string,
		{
			name: string
			aka?: string
			values: Record<string, any>
		}
	>
) => {
	const docsInput = {} as Record<
		string,
		{
			title: string
			desc: string
			values: Record<string, any>
		}
	>

	for (const [path, item] of Object.entries(input))
		docsInput[path] = {
			title: item.name,
			desc: `游戏《寻找伪人》角色之一${item.aka ? ` / ${item.aka}` : ''}`,
			values: { ...item.values, aka: item.aka, id: path }
		}

	return defineDocs(docsInput)
}

export const charsConfig = (cfg => createOpenAPI({ input: { characters: defineInfo(cfg) } }))({
	neighbor: {
		name: '邻居',
		values: {
			type: 'mechanism',
			info: '仅作为游戏向导在开局时进家介绍',
			plotDesc: '介绍游戏机制，并赠与啤酒，在后续得知其死讯'
		}
	},
	daughter: {
		name: '邻居女儿',
		aka: '外号: Donk',
		values: {
			type: 'human',
			plotVideo: '7558021114451053862',
			plotDesc: '可以得到一个电话号码'
		}
	},
	esenin: {
		name: '酒吧男',
		aka: '外号: 易建联、孙红雷/刘华强',
		values: {
			type: 'human',
			plotVideo: '7589205659707624750',
			plotDesc: '可以听他念诗然后看他哭'
		}
	},
	anxiety: {
		name: '收银女',
		aka: '外号: 高低肩 | 朵拉、蘑菇头 | 咸鱼梦想家、Tim',
		values: {
			type: 'visitor',
			plotVideo: '7555825382906170633',
			plotDesc: '可以将其枪决'
		}
	},
	holod: {
		name: '外套男',
		aka: '别称: 棉袄男、黑洞人',
		values: {
			type: 'visitor',
			plotVideo: '7551518238560046375',
			plotDesc: '可以使同一房间内的其他住客全部身亡，随后可以将其枪决或赶走'
		}
	},
	jena: {
		name: '寡妇',
		aka: '外号: 纯爱战士',
		values: {
			type: 'human',
			plotVideo: '7551881861979491603',
			plotDesc: '可以看其年轻时的夫妻合照'
		}
	},
	sunboy: {
		name: '太阳男',
		aka: '外号: 戴夫',
		values: {
			type: 'random',
			signs: {
				eye: '眼黄为人，眼红为伪',
				armpit: '有红疹为人，无红疹为伪',
				pic: '发黄为人，发黑为伪'
			},
			plotVideo: '7575448632665607460',
			plotDesc: '会喝酒喝吐'
		}
	},
	loser: {
		name: '骗子男',
		aka: '外号: 旭旭宝宝/大马猴',
		values: {
			type: 'random',
			signs: {
				hands: '无泥为人，有泥为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '有毛为人，无毛为伪',
				pic: '有斑点为人，无斑点为伪'
			},
			plotVideo: '7578767578902859042'
		}
	},
	doctor: {
		name: '医生',
		values: {
			type: 'random',
			signs: {
				ext: '重瞳不为伪！',
				hands: '无红疹为人，有红疹为伪',
				pic: '心有斑点为人，无斑点为伪'
			},
			plotVideo: '7558350931935481097'
		}
	},
	'gas-mask': {
		name: '应急中心工作人员',
		values: {
			type: 'mechanism',
			plotDesc: '可以被其强制带去上班'
		}
	},
	'big-mommy': {
		name: '辣妈',
		aka: '外号: 雨姐、女良子',
		values: {
			type: 'visitor',
			plotVideo: '7561348180470729984',
			plotDesc: '可以将其枪决'
		}
	},
	granny: {
		name: '老奶奶',
		values: {
			type: 'visitor'
		}
	},
	hunter: {
		name: '猎人',
		aka: '别称: 护林员',
		values: {
			type: 'random',
			signs: {
				teeth: '牙黄为人，牙白为伪',
				eye: '眼白为人，眼红为伪',
				pic: '举枪威胁 后同意为人，拒绝为伪',
				ear: '提起找什么为人，问看到了什么为伪'
			},
			plotVideo: '7554308499853806899'
		}
	},
	prophet: {
		name: '预言家',
		aka: '别称: 先知 / 外号: 光头/秃头/蛋头 | 辛吉飞',
		values: {
			type: 'mechanism',
			plotDesc: '可以听话摔死'
		}
	},
	courier: {
		name: '快递员',
		aka: '外号: 大学生',
		values: {
			type: 'mechanism',
			plotDesc: '可以收其送的快递'
		}
	},
	intuder: {
		name: '苍白伪人',
		values: {
			type: 'mechanism',
			info: '要是进来了就会被掐死',
			plotDesc: '可以被其掐死'
		}
	},
	wolfhound: {
		name: '黑帮成员',
		values: {
			type: 'random',
			signs: {
				teeth: '牙龈正常为人，牙龈出血为伪',
				armpit: '正常为人，溃烂为伪',
				pic: '双眼正常为人，双眼发光为伪'
			},
			plotDesc: '可以将其枪决'
		}
	},
	sassy: {
		name: '情人',
		aka: '别称: 性感女',
		values: {
			type: 'random',
			signs: {
				eye: '蓝瞳为人，彩瞳为伪',
				armpit: '有茬为人，无茬为伪',
				pic: '双眼正常为人，双眼发光为伪'
			},
			plotDesc: '会爆体而亡'
		}
	},
	alconosity: {
		name: '姐妹 - 姐姐',
		values: {
			type: 'random',
			signs: {
				ext: '姐妹中有一人身亡或离开，另一人会拒绝任何检查，最好是先检查两人再枪决哦！',
				hands: '有红疹为人，无红疹为伪',
				eye: '说眼睛不红为人，说妹妹眼睛平静为伪',
				armpit: '有茬为人，无茬为伪',
				pic: '有螺旋为人，无螺旋为伪'
			},
			plotVideo: '7556419583884807474',
			plotDesc: '在姐妹都存活的情况下可以得到一个电话号码'
		}
	},
	anger: {
		name: '愤怒男',
		aka: '外号: 孙笑川',
		values: {
			type: 'random',
			signs: {
				teeth: '牙黄为人，牙白为伪',
				hands: '指甲正常为人，指甲脱落为伪',
				armpit: '无红疹为人，有红疹为伪',
				ear: '举枪威胁 后骂人为人，骂枪为伪'
			},
			plotVideo: '7582900648946011438',
			plotDesc: '可以得到一个电话号码'
		}
	},
	'best-son': {
		name: '妈宝男',
		aka: '外号: 范志毅',
		values: {
			type: 'random',
			signs: {
				teeth: '牙黄为人，牙白为伪',
				hands: '受伤为人，无伤为伪',
				armpit: '沉默为人，说没处理过为伪',
				eye: '眼红为人，眼白为伪',
				pic: '正常为人，重影为伪'
			},
			plotDesc: '可以得到一个电话号码'
		}
	},
	ballerina: {
		name: '猫女士',
		aka: '别称: 芭蕾女',
		values: {
			type: 'visitor',
			info: '放入即可获得 猫',
			plotVideo: '7552267397957209398',
			plotDesc: '可以将其枪决（会躲掉好几发子弹后自愿受死）'
		}
	},
	biglebow: {
		name: '无亲少女',
		aka: '别称: 叛逆女孩',
		values: {
			type: 'random',
			signs: {
				hands: '无红疹为人，有红疹为伪',
				eye: '举枪威胁 后沉默为人，询问为伪',
				pic: '有斑点为人，无斑点为伪'
			},
			plotVideo: '7553591914688171303'
		}
	},
	blind: {
		name: '盲男',
		aka: '别称: 瞎子男',
		values: {
			type: 'human',
			plotVideo: '7552274567893388587',
			plotDesc: '会自缢'
		}
	},
	buddy: {
		name: '雄起男',
		aka: '外号: 泰森、刀哥 | 大嘴',
		values: {
			type: 'random',
			signs: {
				hands: '无伤为人，受伤为伪',
				eye: '眼白为人，眼红为伪'
			},
			plotVideo: '7555272684477713710'
		}
	},
	couple: {
		name: '夫妻',
		aka: '外号: 家暴男 | 刀哥',
		values: {
			type: 'random',
			signs: {
				ext: '实际上均为丈夫体征',
				hands: '受伤为人，无伤为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '有毛为人，无毛为伪',
				ear: '问妻子耳朵是否为特征为人，说没有隐瞒为伪'
			},
			plotVideo: '7553211114276818212'
		}
	},
	'cultist-1': {
		name: '邪教徒 - 一号',
		values: {
			type: 'human',
			info: '会被 邪教领袖 强行塞入',
			plotDesc: '可以随其自焚'
		}
	},
	'cultist-2': {
		name: '邪教徒 - 二号',
		values: {
			type: 'human',
			info: '会被 邪教领袖 强行塞入',
			plotDesc: '可以随其自焚'
		}
	},
	'cultist-3': {
		name: '邪教徒 - 三号',
		values: {
			type: 'human',
			info: '会被 邪教领袖 强行塞入',
			plotDesc: '可以随其自焚'
		}
	},
	priest: {
		name: '邪教领袖',
		values: {
			type: 'mechanism',
			plotDesc: '可以随其自焚'
		}
	},
	dude: {
		name: '瘾君子',
		aka: '外号: 吴京 | Rapper | 脏辫男',
		values: {
			type: 'random',
			signs: {
				hands: '无泥为人，有泥为伪',
				eye: '眼红为人，眼白为伪',
				armpit: '无真菌为人，长真菌为伪'
			},
			plotVideo: '7553967363117288714',
			plotDesc: '可以看其抽烟抽得烟雾缭绕'
		}
	},
	'edgar-poe': {
		name: '恋尸者',
		aka: '外号: 中分头、坤坤',
		values: {
			type: 'random',
			signs: {
				teeth: '牙黄为人，牙白为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '长真菌为人，无真菌为伪',
				pic: '正常为人，有触手为伪'
			},
			plotVideo: '7583610159209942323'
		}
	},
	sweating: {
		name: '前部长',
		aka: '外号: 良子',
		values: {
			type: 'random',
			signs: {
				hands: '有 无伤、受伤 两种状态，无法判断，但 举枪威胁 时若为人会求死，若为伪会自曝手有泥土',
				eye: '有 眼白、眼红 两种状态，无法判断',
				armpit: '正常为人，溃烂为伪'
			},
			plotVideo: '7559097073501605158'
		}
	},
	firefighter: {
		name: '消防员',
		aka: '外号: 干尸',
		values: {
			type: 'human',
			plotVideo: '7557595436698045722',
			plotDesc: '会病故'
		}
	},
	foreigner: {
		name: '缝嘴外国人',
		values: {
			type: 'human',
			plotVideo: '7565810588325022976',
			plotDesc: '可以得到一个电话号码'
		}
	},
	'former-fema': {
		name: '前应急中心员工',
		values: {
			type: 'human',
			plotVideo: '7556417999050149166',
			plotDesc: '可以逼其拿出应急中心身份证件'
		}
	},
	fortuneteller: {
		name: '占卜师',
		values: {
			type: 'random',
			signs: {
				teeth: '牙黄为人，牙白为伪（细微差别）',
				eye: '眼白为人，眼红为伪',
				pic: '自缢为人，正常为伪',
				ear: '听其说完 听过风声为人，听过嗡嗡声为伪'
			},
			plotVideo: '7590637777348234523',
			plotDesc: '可以得到一个电话号码，并可被其做法'
		}
	},
	fugitive: {
		name: '受伤男',
		values: {
			type: 'random',
			signs: {
				hands: '正常为人，受伤为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '正常为人，受伤为伪',
				pic: '正常为人，手臂受伤为伪',
				ear: '质疑通过耳朵判断为人，质疑特征造成恐慌为伪'
			},
			plotVideo: '7584271882413821235'
		}
	},
	undertaker: {
		name: '掘墓人',
		values: {
			type: 'random',
			signs: {
				eye: '提起不看太阳为人，提起等伪人出现为伪',
				pic: '正常为人，重影为伪'
			},
			plotVideo: '7569884521588444431'
		}
	},
	intruder: {
		name: '不眠男',
		aka: '外号: 嘉豪',
		values: {
			type: 'random',
			signs: {
				teeth: '牙白为人，牙黄为伪',
				hands: '指甲脱落为人，指甲正常为伪',
				eye: '眼白为人，眼红为伪',
				ear: '听其说完 问确定看到为人，提起睡眠与现实为伪'
			},
			plotVideo: '7575818809576066340',
			plotDesc: '可以看其缩手缩头'
		}
	},
	marauder: {
		name: '拾荒者',
		aka: '别称: 乞丐',
		values: {
			type: 'random',
			signs: {
				hands: '感叹很脏为人，表明自己会弄脏它们为伪',
				armpit: '长真菌为人，无真菌为伪',
				pic: '正常为人，发黑为伪'
			}
		}
	},
	mother: {
		name: '母子',
		values: {
			type: 'random',
			signs: {
				ext: '实际上均为母亲体征',
				pic: '宽波为人，窄波为伪'
			},
			plotVideo: '7582137991754255656',
			plotDesc: '可以看她孩子丢了，可以得到一个电话号码'
		}
	},
	nun: {
		name: '修女',
		aka: '外号: 范小勤',
		values: {
			type: 'random',
			signs: {
				eye: '提起疲惫痕迹为人，提起岁月痕迹为伪',
				pic: '正常为人，发黑为伪',
				ear: '正常为人，有蟑螂为伪'
			},
			plotVideo: '7559485473870204175',
			plotDesc: '可以将其赶走'
		}
	},
	provocateur: {
		name: '较真男',
		aka: '外号: 奥巴马',
		values: {
			type: 'random',
			signs: {
				hands: '表明指甲没剪为人，表明指甲有泥为伪',
				eye: '正常为人，看前询问是否找红眼为伪',
				armpit: '有毛为人，无毛为伪',
				pic: '举枪威胁 感叹照片厉害为人，撒谎质疑为伪'
			},
			plotVideo: '7551871819632987455',
			plotDesc: '可以将其赶走或枪决'
		}
	},
	raskolnikov: {
		name: '年轻小伙',
		aka: '别称: 头巾小伙 / 外号: 包租婆、鹰眼',
		values: {
			type: 'random',
			signs: {
				teeth: '牙白为人，牙黄为伪',
				hands: '无泥为人，有泥为伪',
				eye: '蓝瞳为人，绿瞳为伪',
				pic: '正常为人，发紫为伪'
			},
			plotVideo: '7580268763384122664'
		}
	},
	sirin: {
		name: '姐妹 - 妹妹',
		values: {
			type: 'random',
			signs: {
				ext: '姐妹中有一人身亡或离开，另一人会拒绝任何检查，最好是先检查两人再枪决哦！',
				teeth: '牙全为人，牙缺为伪',
				hands: '无红疹为人，有红疹为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '无毛为人，有毛为伪',
				pic: '正常为人，发黑为伪'
			},
			plotVideo: '7556419583884807474',
			plotDesc: '在姐妹都存活的情况下可以得到一个电话号码'
		}
	},
	'taxi-driver': {
		name: '出租车司机',
		values: {
			type: 'random',
			signs: {
				teeth: '牙白为人，牙黄为伪',
				hands: '指甲脏为人，干净为伪',
				eye: '眼红为人，眼白为伪',
				armpit: '有毛为人，无毛为伪'
			}
		}
	},
	teacher: {
		name: '幼儿园老师',
		values: {
			type: 'human',
			plotVideo: '7554704235921820979',
			plotDesc: '会夺枪自尽'
		}
	},
	'conspiracy-theorist': {
		name: '阴谋论者',
		aka: '别称: 博士',
		values: {
			type: 'random',
			signs: {
				teeth: '无红疹为人，有红疹为伪',
				eye: '眼白为人，眼红为伪（细微差别）',
				pic: '有斑点为人，无斑点为伪',
				ear: '正常为人，提起新闻广播为伪'
			},
			plotVideo: '7577275815113559296'
		}
	},
	vigilante: {
		name: '义警',
		aka: '外号: 疯子',
		values: {
			type: 'mechanism',
			plotDesc: '可以与其对枪从而后手反杀'
		}
	},
	alexander: {
		name: '轮椅男',
		values: {
			type: 'random',
			signs: {
				teeth: '牙全为人，牙缺为伪',
				hands: '缺一指为人，缺全指为伪',
				eye: '眼白为人，眼红为伪（细微差别）',
				armpit: '无红疹为人，有红疹为伪',
				pic: '正常为人，发黑为伪',
				ear: '感叹为人，询问为伪'
			},
			plotVideo: '7586940770314243355',
			plotDesc: '可以看其伸腿'
		}
	},
	'wife-fema': {
		name: '应急中心之妻',
		aka: '外号: 海关女 | 化妆女、小丑女 | 嚣张女',
		values: {
			type: 'random',
			signs: {
				hands: '有美甲为人，无美甲为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '正常为人，溃烂为伪'
			},
			plotVideo: '7564678161842146594',
			plotDesc: '可以得到一个电话号码'
		}
	},
	'mushroom-eater': {
		name: '蘑菇食者',
		aka: '别称: 蘑菇老头',
		values: {
			type: 'mechanism',
			plotDesc: '可以被要求回档'
		}
	},
	yakob: {
		name: '不朽男',
		aka: '别称: 不死男、不死之人',
		values: {
			type: 'visitor',
			info: '该人物为同一开发商旗下游戏《迷失之根》的联动角色',
			plotVideo: '7556013085719366922'
		}
	},
	'yellow-boy': {
		name: '雨衣小孩',
		values: {
			type: 'special',
			info: '该人物为另一游戏《静默恐惧：老灯塔十五夜》的联动角色'
		}
	},
	luka: {
		name: '乐观男',
		aka: '外号: 绿帽男、绿丝袜、揽佬',
		values: {
			type: 'random',
			signs: {
				teeth: '听其说完 正常为人，提起接受自己与死亡为伪',
				hands: '无红疹为人，有红疹为伪',
				eye: '正常为人，快速移动为伪',
				pic: '发绿为人，有斑点为伪',
				ear: '正常为人，看前提起声音迷失为伪'
			},
			plotVideo: '7558754287325596937'
		}
	},
	alt: {
		name: '刺青女',
		aka: '外号: 佩恩 | F4 组合键',
		values: {
			type: 'random',
			signs: {
				teeth: '牙龈正常为人，牙龈出血为伪',
				hands: '手指正常为人，手指出血为伪'
			},
			plotVideo: '7592317544824917274'
		}
	},
	bald: {
		name: '剧院男',
		aka: '外号: 秃头',
		values: {
			type: 'random',
			signs: {
				hands: '伤口正常为人，伤口有红疹为伪',
				eye: '正常为人，快速移动为伪',
				armpit: '无真菌为人，长真菌为伪',
				pic: '多重影为人，分身为伪'
			}
		}
	},
	experienced: {
		name: '前科犯',
		aka: '外号: 裸男 | 违规哥、封号哥',
		values: {
			type: 'random',
			signs: {
				teeth: '牙龈正常为人，牙龈出血为伪',
				hands: '无红疹为人，有红疹为伪',
				eye: '说无用为人，说更糟且无用为伪'
			},
			plotVideo: '7587503102316563722'
		}
	},
	'fairy-teller': {
		name: '童话爱好者',
		aka: '外号: 毕业大学生 | L | Rug',
		values: {
			type: 'random',
			signs: {
				hands: '无泥为人，有泥且受伤为伪',
				eye: '眼白为人，眼红为伪',
				armpit: '竖伸为人，斜伸为伪',
				ear: '有耳垢为人，无耳垢为伪'
			}
		}
	},
	'funny-guy': {
		name: '负债人',
		aka: '别称: 老赖 外号: 乌鲁鲁',
		values: {
			type: 'random',
			signs: {
				armpit: '溃烂为人，长真菌为伪',
				pic: '想看照片为人，不想看照片为伪'
			}
		}
	},
	jacket: {
		name: '逃学生',
		aka: '别称: 在读大学生 外号: 双下巴 | 夹克男',
		values: {
			type: 'random',
			signs: {
				teeth: '牙龈正常为人，牙龈出血为伪',
				hands: '受伤为人，有红疹为伪',
				pic: '无斑点为人，有斑点为伪'
			}
		}
	},
	leper: {
		name: '麻风病患者',
		values: {
			type: 'random',
			signs: {
				teeth: '牙暗为人，牙白为伪',
				eye: '快速移动为人，缓慢移动为伪',
				armpit: '长真菌为人，无真菌为伪',
				pic: '无斑点为人，有斑点为伪'
			}
		}
	},
	nervous: {
		name: '疯男',
		aka: '别称: 疯子、精神病患者 外号: M | 恐龙头',
		values: {
			type: 'random',
			signs: {
				teeth: '干净为人，牙脏为伪',
				hands: '只提刺痛为人，还提挖土为伪',
				eye: '突然快速移动为人，匀速快速移动为伪',
				armpit: '无毛为人，有毛为伪',
				pic: '散发为人，重影为伪'
			},
			plotVideo: '7591216345589599538'
		}
	},
	rocker: {
		name: '摇滚男',
		aka: '外号: 吉他张',
		values: {
			type: 'random',
			signs: {
				eye: '正常为人，提起回想经历为伪',
				armpit: '有毛为人，无毛为伪'
			}
		}
	},
	tough: {
		name: '受创女',
		aka: '外号: 短发女 | 恐龙头',
		values: {
			type: 'random',
			signs: {
				teeth: '牙龈正常为人，牙龈出血为伪',
				eye: '正常移动为人，缓慢移动为伪',
				armpit: '提起不想失望为人，提起不想杀人为伪',
				ear: '举枪威胁 骂人质疑为人，问看到什么为伪'
			}
		}
	},
	tourist: {
		name: '外国旅者',
		aka: '外号: 将军、太阳',
		values: {
			type: 'random',
			signs: {
				hands: '晒红为人，有红疹为伪',
				eye: '眼白为人，眼红为伪',
				pic: '散发黑为人，发紫为伪'
			}
		}
	},
	unstable: {
		name: '劲能佳成瘾者',
		aka: '别称: 劲能佳小伙',
		values: {
			type: 'random',
			signs: {
				ext: '眼绿不为伪！',
				teeth: '舌绿为人，牙绿为伪',
				hands: '无泥为人，有泥为伪',
				eye: '正常为人，有血丝为伪',
				armpit: '正常为人，发霉为伪'
			},
			plotVideo: '7600118461741681958',
			plotDesc: '会自行离开'
		}
	}
})

const charsSource = (src => (
	(src.files = src.files.map(file => {
		if (file.type === 'page')
			file.path = file.path = file.path.replace(/[\\/](get|post|put|delete|patch|options|head)\.mdx$/, '.mdx')
		file.data.icon = path.parse(file.path).name
		return file
	})),
	src
))(await openapiSource(charsConfig, { baseDir: 'characters' }))

export const source = loader(
	{
		docs: docs.toFumadocsSource(),
		characters: charsSource
	},
	{
		baseUrl: '/',
		plugins: [lucideIconsPlugin(), openapiPlugin()],
		icon(icon) {
			if (!icon) return
			try {
				const src = require(`@/assets/chars/${icon}/icon.webp`).default
				return <Image key={icon} src={src} alt={icon} width={32} height={32} priority />
			} catch {
				return icon
			}
		}
	}
)