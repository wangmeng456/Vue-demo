/**
 * table合并行通用（不相邻的数据相互不受影响）
 * */
export function mergeTableRow(data, merge) {
    if (!merge || merge.length === 0) {
        return data
    }
    merge.forEach((m) => {
        const mList = {}
        data = data.map((v, index) => {
            const rowVal = v[m]
            if (mList[rowVal] && mList[rowVal].newIndex === index) {
                mList[rowVal]['num']++
                mList[rowVal]['newIndex']++
                data[mList[rowVal]['index']][m + '-span'].rowspan++
                v[m + '-span'] = {
                    rowspan: 0,
                    colspan: 0
                }
            } else {
                mList[rowVal] = { num: 1, index: index, newIndex: index + 1 }
                v[m + '-span'] = {
                    rowspan: 1,
                    colspan: 1
                }
            }
            return v
        })
    })
    return data
}