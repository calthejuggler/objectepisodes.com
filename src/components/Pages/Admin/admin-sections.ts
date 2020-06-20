export const adminSections = [
	{
		title: 'users',
		superAdmin: true,
	},
	{
		title: 'photos',
		photo: true,
		photoRequired: true,
		superAdmin: false,
		editingNoun: 'photo',
	},
	{
		title: 'props',
		photo: true,
		photoRequired: false,
		superAdmin: false,
		editingNoun: 'prop',
	},
	{
		title: 'literature',
		photo: true,
		photoRequired: false,
		superAdmin: false,
		editingNoun: 'book',
	},
	{
		title: 'tricks',
		photo: true,
		photoRequired: false,
		superAdmin: false,
		editingNoun: 'trick',
	},
	{
		title: 'biographies',
		photo: true,
		photoRequired: false,
		superAdmin: false,
		editingNoun: 'bio',
	},
];
