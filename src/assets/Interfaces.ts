interface primary {
	id: number,
	createdAt: string,
	updatedAt: string,
	assetId: number,
	asset: {
		id: number,
		url: string,
		createdAt: string,
		updatedAt: string
	}
}

export interface adopterInterface extends primary {
	name: string,
	description: string,
	age: number,
}

export interface frivilligInterface extends primary {
	title: string,
	content: string,
	extra: string,

}