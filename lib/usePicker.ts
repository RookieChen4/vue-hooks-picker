import { UnwrapNestedRefs, computed, isReactive, Ref } from 'vue'
import { merge } from 'lodash-es';

export function handlePath(path: string, value: any, modifyObj: any) {
    let lastObj:any;
    path.split('.').reduce((obj, key, index, array) => { 
        if (index === array.length - 1) {
            if (/^\d+$/.test(key)) {
                const target:any = merge([], obj);
                target[key] = value;
                lastObj[array[index - 1]] = target;
                return;
            }
            obj[key] = value;
        } else if (obj[key] === undefined){
            obj[key] = {}
        }
        lastObj = obj;
        return obj[key];
    }, modifyObj);
}

export type Setter = {
    path: string;
    value: any;
}
const usePicker = <T>(picker:  UnwrapNestedRefs<T>) => {
    const isRef = !isReactive(picker);

    const getter = computed(() => (path: string, defaultValue?: any) => 
        path.split('.').reduce((obj, key) => {
            if (obj[key] === undefined){
                return defaultValue;
            }
            return obj[key];
        }, isRef ? (picker as Ref).value : picker)
    )

    const setter = (setValue: Setter) => {
        const {path, value} = setValue;
        handlePath(path, value, isRef ? (picker as Ref).value : picker )
    }

    return {
        getter,
        setter,
    }
}

export default usePicker;