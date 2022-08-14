import { assert, expect, test } from 'vitest'
import usePicker, { handlePath } from '../lib/usePicker';
import { ref, reactive } from 'vue';

test('handlePath', () => {
	const obj: any = {
		a: 1,
		b: 2,
		c: []
	}

	handlePath('a', 11, obj)
	expect(obj.a).toBe(11)

	handlePath('b', 'b', obj)
	expect(obj.b).toBe('b')

	handlePath('c.0', 2, obj)
	expect(obj.c[0]).toBe(2)

	handlePath('c.1.b', 2, obj)
	expect((obj.c[1] as any).b).toBe(2)

	handlePath('d.1.b', 2, obj)
	expect((obj.d[1] as any).b).toBe(2)
})

test('usePicker ref', () => {
	const value1 = ref({
		a: 1,
		b: []
	});
	const { getter, setter } = usePicker(value1);
	setter({
		path: 'c',
		value: 2,
	});
	expect(JSON.stringify(value1.value)).eq('{"a":1,"b":[],"c":2}')
	expect(getter.value('a')).toBe(1)
	expect(getter.value('d', 11)).toBe(11)
})


test('usePicker reactive', () => {
	const value1 = reactive({
		a: 1,
		b: []
	});
	const { getter, setter } = usePicker(value1);
	setter({
		path: 'c',
		value: 2,
	});
	expect(JSON.stringify(value1)).eq('{"a":1,"b":[],"c":2}')
	expect(getter.value('a')).toBe(1)
	expect(getter.value('d', 11)).toBe(11)
})
