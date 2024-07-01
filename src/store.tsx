import { LatLngExpression, PointTuple } from "leaflet"

export type MapInfo = (typeof MAP_LIST)[number]
export const MAP_LIST = [
	{ id: "level_us_01_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_01_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_01_03", size: [1008, 2016], name: "UINAME" },
	{ id: "level_us_01_04_new", size: [1008, 1008], name: "UINAME" },

	{ id: "level_us_02_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_02_02_new", size: [1008, 1008], name: "UINAME" },
	{ id: "level_us_02_03_new", size: [2016, 1344], name: "UINAME" },
	{ id: "level_us_02_04_new", size: [1104, 1344], name: "UINAME" },

	{ id: "level_ru_02_01_crop", size: [2016, 1008], name: "UINAME" },
	{ id: "level_ru_02_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_02_03", size: [1008, 1008], name: "UINAME" },
	{ id: "level_ru_02_04", size: [1008, 1008], name: "UINAME" },

	{ id: "level_ru_03_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_03_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_04_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_04_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_03_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_03_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_ru_04_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_04_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_04_03", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_04_04", size: [2016, 2016], name: "UINAME" },

	{ id: "level_ru_05_01", size: [1008, 1008], name: "UINAME" },
	{ id: "level_ru_05_02", size: [1008, 1008], name: "UINAME" },

	{ id: "level_us_06_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_06_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_07_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_08_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_08_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_08_03", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_08_04", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_09_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_09_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_10_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_10_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_11_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_11_02", size: [2016, 2016], name: "UINAME" },

	{ id: "level_us_12_01", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_12_02", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_12_03", size: [2016, 2016], name: "UINAME" },
	{ id: "level_us_12_04", size: [2016, 2016], name: "UINAME" },
	{ id: "level_ru_13_01", size: [2016, 2016], name: "UINAME" },
] as const

export type DatabasePhoto = GamePhoto & {
	coords: PointTuple
}

export type GamePhoto = {
	title?: string
	photoId: string
	mapId: (typeof MAP_LIST)[number]["id"]
	submitter: string
}

// NB: coords are Y - X !!
export const ALL_PHOTOS: DatabasePhoto[] = [
	////
	{
		photoId: "20220420195432_1.jpg",
		mapId: "level_us_03_02",
		coords: [13, 338],
		//title: "just one trip",
		submitter: "NakedDave",
	},
	{
		photoId: "20220530191932_1.jpg",
		mapId: 'level_ru_04_03',
		coords: [-326, -131],
		//title: "stay frosty",
		submitter: "NakedDave",
	},
	{
		photoId: "20220626165324_1.jpg",
		mapId: 'level_us_07_01',
		coords: [-635, -764],
		title: "exposed",
		submitter: "NakedDave",
	},
	{
		photoId: "20220802200252_1.jpg",
		mapId: 'level_ru_02_03',
		coords: [77, 174],
		title: "can't park there mate",
		submitter: "NakedDave",
	},
	{
		photoId: "20220922190009_1.jpg",
		mapId: "level_us_06_02",
		coords: [238, 888],
		//title: "right 4, don't cut",
		submitter: "NakedDave",
	},
	{
		photoId: "20220925172824_1.jpg",
		mapId: "level_us_06_02",
		coords: [-599, -242],
		//title: "right 4, don't cut",
		submitter: "NakedDave",
	},
	{
		photoId: "20220928230316_1.jpg",
		mapId: 'level_ru_04_03',
		coords: [-129, -365],
		//title: "stay frosty",
		submitter: "NakedDave",
	},
]
