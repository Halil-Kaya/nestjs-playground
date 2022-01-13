import * as $$ from "lodash";
import { Types } from "mongoose";

namespace FPHelper {
    export const isSubset = (arr, rawTarget) => {
        let target = rawTarget
        if (!Array.isArray(rawTarget)) {
            target = [rawTarget]
        }
        return target.every(v => arr.includes(v));
    }

    export const isDefined = (value) => {
        return !$$.isUndefined(value) && !$$.isNull(value)
    }

    export const getRandomItem = (items) => {
        return items[Math.floor(Math.random() * items.length)];
    }

    export const getSize = (data: any): number => {
        return <number>((data instanceof Array) ? data.length : (!data ? 0 : 1));
    }

    export const hasStringValue = (data: string) => {
        return !$$.isEmpty(data) && $$.isString(data)
    }

    export const toHexString = (objectId: Types.ObjectId) => {
        return objectId.toHexString()
    }
}

export { FPHelper }
