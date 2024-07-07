import { PointTuple } from "leaflet"

export type MapInfo = (typeof MAP_LIST)[number]
export const MAP_LIST = [
	{ id: "level_us_01_01", size: [2016, 2016], name: "Black River" },
	{ id: "level_us_01_02", size: [2016, 2016], name: "Smithville Dam" },
	{ id: "level_us_01_03", size: [1008, 2016], name: "Island Lake" },
	{ id: "level_us_01_04_new", size: [1008, 1008], name: "Drummond Island" },

	{ id: "level_us_02_01", size: [2016, 2016], name: "North Port" },
	{ id: "level_us_02_02_new", size: [1008, 1008], name: "Mountain River" },
	{ id: "level_us_02_03_new", size: [2016, 1344], name: "White Valley" },
	{ id: "level_us_02_04_new", size: [1104, 1344], name: "Pedro Bay" },

	{ id: "level_ru_02_01_crop", size: [2016, 1008], name: "Quarry" },
	{ id: "level_ru_02_02", size: [2016, 2016], name: "Drowned Lands" },
	{ id: "level_ru_02_03", size: [1008, 1008], name: "Zimnegorsk" },
	{ id: "level_ru_02_04", size: [1008, 1008], name: "Rift" },

	{ id: "level_ru_03_01", size: [2016, 2016], name: "Lake Kovd" },
	{ id: "level_ru_03_02", size: [2016, 2016], name: "Imandra" },

	{ id: "level_us_04_01", size: [2016, 2016], name: "Flooded Foothills" },
	{ id: "level_us_04_02", size: [2016, 2016], name: "Big Salmon Peak" },

	{ id: "level_us_03_01", size: [2016, 2016], name: "Black Badger Lake" },
	{ id: "level_us_03_02", size: [2016, 2016], name: "Grainwoods River" },

	{ id: "level_ru_04_01", size: [2016, 2016], name: "Urksa River" },
	{ id: "level_ru_04_02", size: [2016, 2016], name: "Cosmodrome" },
	{ id: "level_ru_04_03", size: [2016, 2016], name: "Northern Aegis Installation" },
	{ id: "level_ru_04_04", size: [2016, 2016], name: "Chernokamensk" },

	{ id: "level_ru_05_01", size: [1008, 1008], name: "Factory Grounds" },
	{ id: "level_ru_05_02", size: [1008, 1008], name: "Antonovskiy Nature Reserve" },

	{ id: "level_us_06_01", size: [2016, 2016], name: "The Lowland" },
	{ id: "level_us_06_02", size: [2016, 2016], name: "Yellowrock National Forest" },
	{ id: "level_us_07_01", size: [2016, 2016], name: "Burning Mill" },
	{ id: "level_ru_08_01", size: [2016, 2016], name: "Crossroads" },
	{ id: "level_ru_08_02", size: [2016, 2016], name: "The Institute" },
	{ id: "level_ru_08_03", size: [2016, 2016], name: "Heartlands" },
	{ id: "level_ru_08_04", size: [2016, 2016], name: "HarvestCorp" },

	{ id: "level_us_09_01", size: [2016, 2016], name: "The Albany River" },
	{ id: "level_us_09_02", size: [2016, 2016], name: "Burned Forest" },

	{ id: "level_us_10_01", size: [2016, 2016], name: "Duncan Bay" },
	{ id: "level_us_10_02", size: [2016, 2016], name: "North Peak National Park"},

	{ id: "level_us_11_01", size: [2016, 2016], name: "Mountain Ridge" },
	{ id: "level_us_11_02", size: [2016, 2016], name: "By the Lake" },

	{ id: "level_us_12_01", size: [2016, 2016], name: "Pineline Bay" },
	{ id: "level_us_12_02", size: [2016, 2016], name: "Reactive Zone" },
	{ id: "level_us_12_03", size: [2016, 2016], name: "Flatland" },
	{ id: "level_us_12_04", size: [2016, 2016], name: "Oviro Hills"},
	{ id: "level_ru_13_01", size: [2016, 2016], name: "Zherbai Quarries" },
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
	{
		photoId: "20230918203639_1.jpeg",
		mapId: "level_ru_04_03",
		coords: [-532.7, 774.15],
		submitter: "IndexOut0fBounds",
		title: "View of Hell",
	},
	{
		photoId: "20231126101902_1.jpeg",
		mapId: "level_ru_04_01",
		coords: [-724.69, -767.59],
		submitter: "IndexOut0fBounds",
		title: "Harder To Reach Place",
	},
	{
		photoId: "20240127230811_1.jpg",
		mapId: "level_us_06_01",
		coords: [803.67, 504.45],
		submitter: "IndexOut0fBounds",
	},
	{
		photoId: "20240222224116_1.jpeg",
		mapId: "level_us_12_03",
		coords: [862.95, 656.82],
		submitter: "IndexOut0fBounds",
		title: "No Swimming",
	},
	{
		photoId: "Screenshot_20240702_000745_PS.jpg",
		mapId: "level_ru_05_01",
		coords: [-153.69, -401],
		submitter: "Dirado",
		title: "Mudding in the swamp",
	},
	{
		photoId: "Screenshot_20240702_192621_PS.jpg",
		mapId: "level_us_03_01",
		coords: [936.54, 433.77],
		submitter: "Dirado",
		title: "Watering hole",
	},
	{
		photoId: "shot050424_120925.png",
		mapId: "level_us_06_01",
		coords: [302.85, -803.99],
		submitter: "MrGoat",
		title: "Title",
	},
	{
		photoId: "SnowguesserSzH.png",
		mapId: "level_us_09_01",
		coords: [363.65, -345],
		submitter: "Wiesław69",
		title: "2 braincells",
	},
	{
		photoId: "01.png",
		mapId: "level_us_10_02",
		coords: [-902.38, 797.28],
		submitter: "Lone Sausage",
	},
	{
		photoId: "02.png",
		mapId: "level_ru_05_01",
		coords: [-151.74, -400.45],
		submitter: "Lone Sausage",
	},
	{
		photoId: "03.png",
		mapId: "level_us_10_01",
		coords: [-116.25, 622.22],
		submitter: "Lone Sausage",
	},
	{
		photoId: "04.png",
		mapId: "level_ru_08_04",
		coords: [368.91, 529.1],
		submitter: "Lone Sausage",
	},
	{
		photoId: "05.png",
		mapId: "level_us_07_01",
		coords: [-453.63, -244.46],
		submitter: "Lone Sausage",
	},
	{
		photoId: "06.png",
		mapId: "level_ru_05_02",
		coords: [383.68, 295.14],
		submitter: "Lone Sausage",
	},
	{
		photoId: "07.png",
		mapId: "level_ru_04_04",
		coords: [254.77, 465.36],
		submitter: "Lone Sausage",
	},
	{
		photoId: "08.png",
		mapId: "level_us_01_02",
		coords: [-100.02, 391.23],
		submitter: "Lone Sausage",
	},
	{
		photoId: "09.png",
		mapId: "level_ru_03_02",
		coords: [-848.46, -795.07],
		submitter: "Lone Sausage",
	},
	{
		photoId: "10.png",
		mapId: "level_us_06_02",
		coords: [925.86, -355.82],
		submitter: "Lone Sausage",
	},
	{
		photoId: "11.png",
		mapId: "level_ru_02_01_crop",
		coords: [912.05, 52.32],
		submitter: "Lone Sausage",
	},
	{
		photoId: "12.png",
		mapId: "level_us_04_02",
		coords: [806.22, 666.45],
		submitter: "Lone Sausage",
	},
	{
		photoId: "13.png",
		mapId: "level_us_02_03_new",
		coords: [47.02, 423.07],
		submitter: "Lone Sausage",
	},
	{
		photoId: "14.png",
		mapId: "level_us_09_02",
		coords: [-629.85, 96.24],
		submitter: "Lone Sausage",
	},
	{
		photoId: "15.png",
		mapId: "level_ru_05_01",
		coords: [396.71, -23.69],
		submitter: "Lone Sausage",
	},
	{
		photoId: "16.png",
		mapId: "level_us_11_01",
		coords: [-425.97, -308.01],
		submitter: "Lone Sausage",
	},
	{
		photoId: "17.png",
		mapId: "level_us_01_01",
		coords: [-747.86, 815.91],
		submitter: "Lone Sausage",
	},
	{
		photoId: "18.png",
		mapId: "level_us_01_04_new",
		coords: [-247.8, 417.57],
		submitter: "Lone Sausage",
	},
	{
		photoId: "19.png",
		mapId: "level_us_01_03",
		coords: [-94.8, -657.8],
		submitter: "Lone Sausage",
	},
	{
		photoId: "20.png",
		mapId: "level_us_01_03",
		coords: [406.6, 75.1],
		submitter: "Lone Sausage",
	},
	{
		photoId: "21.png",
		mapId: "level_us_02_04_new",
		coords: [192.63, 107.3],
		submitter: "Lone Sausage",
	},
	{
		photoId: "20220420195432_1.jpg",
		mapId: "level_us_03_02",
		coords: [-9.5, 339.6],
		//title: "just one trip",
		submitter: "NakedDave",
	},
	{
		photoId: "20220530191932_1.jpg",
		mapId: "level_ru_04_03",
		coords: [-326, -131],
		//title: "stay frosty",
		submitter: "NakedDave",
	},
	{
		photoId: "20220626165324_1.jpg",
		mapId: "level_us_07_01",
		coords: [-635, -764],
		title: "exposed",
		submitter: "NakedDave",
	},
	{
		photoId: "20220802200252_1.jpg",
		mapId: "level_ru_02_03",
		coords: [71.9, 175.6],
		title: "can't park there mate",
		submitter: "NakedDave",
	},
	{
		photoId: "20220922190009_1.jpg",
		mapId: "level_us_06_02",
		coords: [228, 884],
		//title: "right 4, don't cut",
		submitter: "NakedDave",
	},
	{
		photoId: "20220925172824_1.jpg",
		mapId: "level_us_06_02",
		coords: [-628.7, -232.4],
		//title: "right 4, don't cut",
		submitter: "NakedDave",
	},
	{
		photoId: "20220928230316_1.jpg",
		mapId: "level_ru_04_03",
		coords: [-129, -365],
		//title: "stay frosty",
		submitter: "NakedDave",
	},
]
