const CATEGORIES = {
	minigame: 'MINIGAME',
	adventure: 'ADVENTUREMAP',
	experience: 'EXPERIENCE',
	worldtemp: 'NORMAL',
	inspiration: 'INSPIRATION'
};

export const load = async ({ fetch }) => {
	const entries = await Promise.all(
		Object.entries(CATEGORIES).map(async ([key, category]) => {
			const res = await fetch(`https://api.realmshub.com/templates/${category}/0/200`);
			const { templates } = await res.json();
			return [key, templates];
		})
	);

	return Object.fromEntries(entries);
};
