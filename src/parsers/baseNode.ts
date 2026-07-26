export abstract class BaseNode {
	with(properties: Partial<this>): this {
		return Object.assign(
			Object.create(Object.getPrototypeOf(this)),
			this,
			properties,
		);
	}
}
