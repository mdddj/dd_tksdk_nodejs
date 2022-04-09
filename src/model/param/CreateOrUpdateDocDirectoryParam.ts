

interface CreateOrUpdateDocDirectoryParam {
    //目录名
    name: string

    //父亲节点
    parentNodeId: number

    //如果是修改,需要设置这个参数,修改的ID
    updateId?: number
}