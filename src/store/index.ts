
type Callback<T> = (data: T) => void
export class Store<T> {
	private data: T | undefined

	private callbackList: Callback<T>[] = [];

	private children = new Set<Store<T>>();

	// update data and dispatch
	public set = (data: T): this => {
		this.data = data;
		this.callbackList.forEach(fn => fn(data));
		// update children data
		this.children.forEach(child => child.set(data));
		return this;
	}

	public get = () => this.data;

	public clone = (): Store<T> => {
		const child = new Store<T>();
		this.children.add(child);
		if (this.data) child.set(this.data);
		return child;
	}

	// listen data when data change
	public subscribe = (cb: Callback<T>): this => {
		this.callbackList.push(cb);
		return this
	}

	// rm all subscribe
	public unSubscribe = (): this => {
		this.callbackList = [];
		return this
	}
}