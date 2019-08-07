import { Store } from './index';

const store: Store<string[]> = new Store();

it("store", () => {
	const father = store.subscribe((list) => {
		expect(list.length).toEqual(3);
		father.unSubscribe();
	});
	father.set(["1", "2", "3"]);
	const child = father.clone();
	child.subscribe((list) => {
		expect(list.length).toEqual(4);
		child.unSubscribe();
	});
	father.set(["1", "2", "3", "4"])
	father.set([]);
})
